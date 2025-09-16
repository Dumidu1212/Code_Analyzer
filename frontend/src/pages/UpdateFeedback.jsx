// src/pages/UpdateFeedback.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UpdateFeedback = () => {
  const { id } = useParams(); // Extract the feedback ID from the URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state to indicate fetching data
  const navigate = useNavigate();

  // Fetch the feedback details by ID when the component mounts
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get(`/api/feedback/getFeedbackById/${id}`);
        const feedbackData = response.data;
        setTitle(feedbackData.title);
        setDescription(feedbackData.description);
        setLoading(false); // Data is now loaded
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };
    fetchFeedback();
  }, [id]);

  // Handle the update feedback form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/feedback/updateFeedback/${id}`, { title, description });
      alert('Feedback updated successfully');
      navigate('/feedback'); // Redirect to the feedback page after successful update
    } catch (error) {
      console.error('Error updating feedback:', error);
      alert('Failed to update feedback');
    }
  };

  // Show a loading message while data is being fetched
  if (loading) {
    return <div>Loading feedback data...</div>;
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold">Update Feedback</h2>
        <form onSubmit={handleUpdate} className="mt-4">
          <div className="mb-4">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={title}
              className="border p-2 w-full"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
              rows="6"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
          >
            Update Feedback
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateFeedback;
