import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/userdata', {
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.userId);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFeedback = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/feedback/saveFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (responseData.status) {
        alert('Feedback Added Successfully!');
        navigate('/feedback');
      } else {
        alert('Error with saving feedback');
      }
    } catch (error) {
      console.error('There was a problem with the save operation:', error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-4xl font-semibold text-gray-900 text-center mb-8">Feedback Form</h2>
          <form className="space-y-6" onSubmit={handleFeedback}>
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                Feedback Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 transition focus:ring-2 focus:ring-blue-300"
                placeholder="Enter feedback title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter your feedback here..."
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 transition focus:ring-2 focus:ring-blue-300"
                required
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackForm;
