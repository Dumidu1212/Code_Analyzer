// models/Feedback.js
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', FeedbackSchema);
