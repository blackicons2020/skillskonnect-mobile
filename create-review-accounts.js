/**
 * One-time script to create Google Play Store review accounts in production.
 * Run: node create-review-accounts.js
 * Safe to re-run — skips accounts that already exist.
 */

const API = 'https://skillskonnect.onrender.com/api';

const accounts = [
    {
        label: 'Client reviewer',
        body: {
            email: 'reviewer.client@skillskonnect.com',
            password: 'Reviewer@2026!',
            role: 'client',
            userType: 'client',
            fullName: 'App Reviewer Client',
            phoneNumber: '08000000001',
            gender: 'Male',
            state: 'Lagos',
            city: 'Lagos',
            address: '1 Test Street, Lagos',
        },
    },
    {
        label: 'Professional reviewer',
        body: {
            email: 'reviewer.pro@skillskonnect.com',
            password: 'Reviewer@2026!',
            role: 'cleaner',
            userType: 'worker',
            fullName: 'App Reviewer Professional',
            phoneNumber: '08000000002',
            gender: 'Female',
            state: 'Lagos',
            city: 'Lagos',
            address: '2 Test Street, Lagos',
            services: ['House Cleaning', 'Office Cleaning'],
            experience: '3',
            bio: 'Test professional account for app store review purposes.',
            chargeHourly: 5000,
        },
    },
];

async function createAccount(account) {
    try {
        const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account.body),
        });
        const data = await res.json();
        if (res.ok) {
            console.log(`✅ ${account.label} created — id: ${data.user?.id}`);
        } else if (data.message?.toLowerCase().includes('already exists')) {
            console.log(`⚠️  ${account.label} already exists — skipping`);
        } else {
            console.error(`❌ ${account.label} failed:`, data.message);
        }
    } catch (err) {
        console.error(`❌ ${account.label} network error:`, err.message);
    }
}

(async () => {
    console.log('Creating Play Store review accounts...\n');
    for (const acc of accounts) {
        await createAccount(acc);
    }
    console.log('\nDone.');
})();
