import mongoose from 'mongoose';

const SecurityResultSchema = new mongoose.Schema({
  language: { type: String, required: true },
  vulnerabilities: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('SecurityResult', SecurityResultSchema);
