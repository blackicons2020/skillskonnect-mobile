import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  cleanerId: { type: String, required: true },
  clientName: String,
  cleanerName: String,
  serviceType: String,
  date: String,
  time: String,
  duration: Number,
  frequency: String,
  location: String,
  specialRequests: String,
  totalPrice: Number,
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Pending' },
  paymentMethod: String,
  reviewSubmitted: { type: Boolean, default: false },
  escrowPaymentDetails: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Booking = mongoose.model('Booking', BookingSchema);
