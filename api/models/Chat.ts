import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  cleanerId: { type: String, required: true },
  clientName: String,
  cleanerName: String,
  lastMessageId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  senderId: { type: String, required: true },
  senderName: String,
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export const Chat = mongoose.model('Chat', ChatSchema);
export const Message = mongoose.model('Message', MessageSchema);
