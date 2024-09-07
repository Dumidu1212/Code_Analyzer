import { useState } from 'react';
import api from '../utils/api';

const FeedbackForm = () => {
  const [user, setUser] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/feedback', { user, feedback });
      alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback');
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>User:
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
        <label>Feedback:
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
