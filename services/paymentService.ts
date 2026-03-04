// Payment Gateway Service — Paystack (supported African markets) + Flutterwave (rest of world)

import { getCountryCurrency, getLocalPaymentAmount } from '../constants/countries';

// Full list of countries where Paystack operates
const PAYSTACK_COUNTRIES = new Set([
    'Nigeria', 'Ghana', 'South Africa', 'Kenya', 'Egypt', 'Rwanda',
    'Ivory Coast', 'Senegal', 'Cameroon', 'Tanzania', 'Uganda', 'Zambia', 'Mozambique',
]);

export interface PaymentInitiationResponse {
    authorization_url: string;
    access_code?: string;
    reference: string;
}

class PaymentService {

    // ── Helpers ──────────────────────────────────────────────────────────────

    private getToken(): string | null {
        return localStorage.getItem('skillskonnect_token') || sessionStorage.getItem('skillskonnect_token');
    }

    private getApiUrl(): string {
        try {
            const env = (import.meta as any).env;
            if (env) return env.VITE_API_URL || 'http://localhost:5000/api';
        } catch (e) { /* ignore */ }
        return 'http://localhost:5000/api';
    }

    /** Returns 'paystack' for Paystack-supported countries, otherwise 'flutterwave' */
    getPaymentGateway(country: string): 'paystack' | 'flutterwave' {
        return PAYSTACK_COUNTRIES.has(country) ? 'paystack' : 'flutterwave';
    }

    generateReference(prefix = 'CC'): string {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }

    // ── Paystack ─────────────────────────────────────────────────────────────

    async initiatePaystackPayment(data: {
        email: string;
        amount: number;       // local currency amount; backend converts to smallest unit
        currency: string;     // ISO-4217 e.g. 'NGN', 'GHS', 'KES'
        reference: string;
        callback_url?: string;
        metadata?: any;
    }): Promise<PaymentInitiationResponse> {
        const token = this.getToken();
        if (!token) throw new Error('Authentication required');

        const API_URL = this.getApiUrl();
        const response = await fetch(`${API_URL}/payment/initialize`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                amount: data.amount,
                currency: data.currency,
                plan: data.metadata?.plan,
                billingCycle: data.metadata?.billingCycle,
                callback_url: data.callback_url,
            }),
        });

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            throw new Error('Server error. Please ensure the backend is running.');
        }
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Payment initialization failed' }));
            throw new Error(err.message || 'Payment initialization failed');
        }

        const result = await response.json();
        return {
            authorization_url: result.authorization_url,
            access_code: result.access_code,
            reference: result.reference,
        };
    }

    /** Verify a Paystack payment via the backend */
    async verifyPaystackPayment(reference: string): Promise<boolean> {
        const token = this.getToken();
        if (!token) throw new Error('Authentication required');

        const API_URL = this.getApiUrl();
        const response = await fetch(`${API_URL}/payment/verify/${reference}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const result = await response.json();
        return result.success === true;
    }

    // ── Flutterwave (routed through backend to keep secret key safe) ─────────

    async initiateFlutterwavePayment(data: {
        email: string;
        amount: number;       // local currency amount
        currency: string;     // ISO-4217
        reference: string;
        redirect_url: string;
        customer: { email: string; name: string };
        metadata?: any;
    }): Promise<string> {
        const token = this.getToken();
        if (!token) throw new Error('Authentication required');

        const API_URL = this.getApiUrl();
        const response = await fetch(`${API_URL}/payment/initialize-flutterwave`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                amount: data.amount,
                currency: data.currency,
                reference: data.reference,
                redirect_url: data.redirect_url,
                customer: data.customer,
                plan: data.metadata?.plan,
                billingCycle: data.metadata?.billingCycle,
                customizations: {
                    title: 'SkillsKonnect Subscription',
                    description: `${data.metadata?.plan || 'Subscription'} — ${data.metadata?.billingCycle || 'monthly'} billing`,
                },
            }),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Payment initialization failed' }));
            throw new Error(err.message || 'Flutterwave initialization failed');
        }
        const result = await response.json();
        return result.payment_link;
    }

    /** Verify a Flutterwave payment via the backend using the transaction ID */
    async verifyFlutterwavePayment(transactionId: string, txRef?: string): Promise<boolean> {
        const token = this.getToken();
        if (!token) throw new Error('Authentication required');

        const API_URL = this.getApiUrl();
        const query = txRef ? `?tx_ref=${encodeURIComponent(txRef)}` : '';
        const response = await fetch(`${API_URL}/payment/verify-flutterwave/${transactionId}${query}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const result = await response.json();
        return result.success === true;
    }

    // ── Subscription Payment Entry Point ────────────────────────────────────

    /**
     * Initiates a subscription payment:
     * - Routes to Paystack (African markets) or Flutterwave (rest of world)
     * - Converts USD-based plan prices to user's local currency for charging
     */
    async processSubscriptionPayment(
        user: { email: string; fullName?: string; country?: string },
        plan: { name: string; priceMonthly: number; priceYearly: number; currency?: string },
        billingCycle: 'monthly' | 'yearly'
    ): Promise<{ paymentUrl: string; reference: string; gateway: 'paystack' | 'flutterwave' }> {
        const planAmountRaw = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
        const planCurrency = plan.currency || 'NGN'; // Nigeria plans carry no currency field (implied NGN)
        const country = user.country || 'Nigeria';
        const countryCurrency = getCountryCurrency(country);

        const localAmount = getLocalPaymentAmount(planAmountRaw, planCurrency, country);
        const currencyCode = countryCurrency.code;
        const reference = this.generateReference('SUB');
        const gateway = this.getPaymentGateway(country);

        if (gateway === 'paystack') {
            const result = await this.initiatePaystackPayment({
                email: user.email,
                amount: localAmount,
                currency: currencyCode,
                reference,
                callback_url: `${window.location.origin}/payment/verify`,
                metadata: { plan: plan.name, billingCycle, userEmail: user.email },
            });
            return { paymentUrl: result.authorization_url, reference, gateway: 'paystack' };
        } else {
            const paymentUrl = await this.initiateFlutterwavePayment({
                email: user.email,
                amount: localAmount,
                currency: currencyCode,
                reference,
                redirect_url: `${window.location.origin}/payment/verify`,
                customer: { email: user.email, name: user.fullName || 'Customer' },
                metadata: { plan: plan.name, billingCycle, userEmail: user.email },
            });
            return { paymentUrl, reference, gateway: 'flutterwave' };
        }
    }
}

export const paymentService = new PaymentService();
