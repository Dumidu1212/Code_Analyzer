import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  const { user, feedback } = req.body;
  try {
    const newFeedback = new Feedback({ user, feedback });
    await newFeedback.save();
    res.json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Error submitting feedback' });
  }
};
