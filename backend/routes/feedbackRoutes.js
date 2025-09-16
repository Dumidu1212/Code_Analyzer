// routes/feedbackRoutes.js
import express from 'express';
import FeedBack from '../models/Feedback.js';

const router = express.Router();

// Route to save feedback
router.post('/saveFeedback', async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const newFeedback = new FeedBack({ title, description, userId });
    await newFeedback.save();
    res.json({ status: true, message: 'Feedback added successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

// Route to get all feedbacks
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await FeedBack.find({});
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ status: false, message: 'Error fetching feedbacks' });
  }
});

// Route to delete feedback
router.delete('/deleteFeedback/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await FeedBack.findById(id);
    if (!feedback) {
      return res.status(404).json({ status: false, message: 'Feedback not found' });
    }

    await FeedBack.findByIdAndDelete(id);
    res.json({ status: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

// Route to update feedback
router.put('/updateFeedback/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, userId } = req.body;

  try {
    await FeedBack.findByIdAndUpdate(id, { title, description, userId });
    res.json({ status: true, message: 'Feedback updated successfully' });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

// Route to get feedback by ID
router.get('/getFeedbackById/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await FeedBack.findById(id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
