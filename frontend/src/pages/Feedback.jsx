import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import notificationImg from '../assets/notification.png'; // Assuming the image is in the 'assets' folder

const FeedBack = () => {
  const [feedBacks, setFeedbacks] = useState([]);
  const [userId, setUserId] = useState();

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
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feedback/feedbacks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setFeedbacks(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleFeedBackForm = () => {
    window.location.href = '/feedbackForm';
  };

  return (
    <>
      <Header />
      <Navbar />

      {/* Feedback Section */}
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen flex justify-center items-center">
        <div className="container mx-auto px-6 py-16 flex justify-center items-center">
          <div className="my-10 w-full max-w-6xl bg-white border border-gray-200 rounded-3xl shadow-lg flex flex-col md:flex-row items-center">
            <div className="p-8 flex-1 text-center md:text-left">
              <h5 className="mt-5 mb-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Provide Your Feedback Here
              </h5>
              <p className="mt-2 mb-3 text-lg md:text-xl font-medium text-gray-700">
                We believe that continuous improvement is key to delivering a tool that truly meets
                the needs of our users. Your feedback plays a crucial role in shaping the future of
                our automated code analyzer.
              </p>
              <p className="mb-3 text-lg md:text-xl font-medium text-gray-700">
                Your voice matters to us! By providing feedback, you contribute directly to the
                evolution of this tool, helping us to build a more powerful and user-friendly
                solution. Please take a moment to share your thoughts.
              </p>
              <div className="space-x-4 mt-5">
                <button
                  type="button"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                  onClick={handleFeedBackForm}
                >
                  Provide Feedback
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
              <img
                className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                src={notificationImg}
                alt="Feedback Notification"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900">Your Feedbacks</h2>
          </div>

          {feedBacks.map(
            (feedBack) =>
              userId &&
              userId === feedBack.userId && (
                <div
                  key={feedBack._id}
                  className="mx-4 my-5 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl max-w-4xl mx-auto"
                >
                  <div className="p-6">
                    <h5 className="mb-2 text-2xl tracking-tight text-gray-900">
                      <span className="font-bold">Feedback For:</span> {feedBack.title}
                    </h5>
                    <p className="mb-3 text-gray-700">
                      <span className="font-bold">Message:</span> {feedBack.description}
                    </p>

                    {/* Buttons for Update and Delete */}
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        <Link to={`/updateFeedback/${feedBack._id}`}>Update</Link>
                      </button>

                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        <Link to={`/deleteFeedback/${feedBack._id}`}>Delete</Link>
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedBack;
