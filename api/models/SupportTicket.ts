import mongoose from 'mongoose';

const SupportTicketSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: String,
  userEmail: String,
  subject: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, default: 'Medium' },
  description: { type: String, required: true },
  attachments: [String],
  status: { type: String, default: 'Open' },
  adminNotes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const SupportTicket = mongoose.model('SupportTicket', SupportTicketSchema);
