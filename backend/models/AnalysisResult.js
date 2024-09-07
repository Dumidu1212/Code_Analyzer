import mongoose from 'mongoose';

const AnalysisResultSchema = new mongoose.Schema({
  language: { type: String, required: true },
  metrics: {
    cyclomaticComplexity: Number,
    cognitiveComplexity: Number,
    maintainabilityIndex: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('AnalysisResult', AnalysisResultSchema);
