import React, { useState, useEffect } from 'react';
import notificationImg from '../assets/notification.png';
import Navbar from '../components/NavBar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const FeedBack = () => {
  const [feedBacks, setFeedbacks] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/userdata', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserId(userData.userId);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/API/feedbacks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setFeedbacks(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleFeedBackForm = () => {
    window.location.href = "/feedbackForm";
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className='flex items-center justify-center h-screen ' >
        <div className="w-full mx-20 my-10 max-w-8xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row">
          <div className="p-5 flex-1">
            <a href="#">
              <h5 className="mt-10 mb-5 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Provide Your Feedback Here?
              </h5>
            </a>
            <p className="mt-5 mb-3 font-medium text-sm  text-gray-400 dark:text-gray-400">
            We believe that continuous improvement is key to delivering a tool that truly meets the needs of our users. Your feedback plays a crucial role in shaping the future of our automated code analyzer. Whether you’ve found a bug, have suggestions for new features, or simply want to share your experience with the tool, we encourage you to share your thoughts. Your insights will help us refine and enhance the functionality and usability of our application.
          </p>
          <p className="mb-3 font-medium text-sm text-gray-400 dark:text-gray-400">
          Your voice matters to us! By providing feedback, you contribute directly to the evolution of this tool, helping us to build a more powerful and user-friendly solution. We’re committed to listening to your ideas and addressing any issues you may encounter. Please take a moment to let us know how we’re doing and what we can do better
          </p>
            <div className="space-x-4 mt-10">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={handleFeedBackForm}
              >
                Provide feedback
              </button>

              {/*  <button
                type="button"
                className="text-blue-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Sign up
              </button> */}
            </div>
          </div>
          <div className="flex-1">
            <a href="#">
              <img className="mt-10  mx-5 rounded-r-lg w-auto h-auto object-cover" src={notificationImg} alt="Reservation Notification" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10">
  <div className="flex items-center justify-center">
    <h2 className="text-3xl font-bold">Your Feedbacks</h2>
  </div>

  {feedBacks.map((feedBack) => (
    userId && userId === feedBack.userId ? (
      <div key={feedBack.id} className="mx-20 my-10 max-w-7xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-3 text-2xl  tracking-tight text-gray-900 dark:text-white">
         <span className='font-bold'>  Feedback For : </span> {feedBack.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className='font-bold'> Message :</span>   {feedBack.description}
          </p>

          {/* Buttons for Update and Delete */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
             <Link to={`/updateFeedback/${feedBack._id}`}>
              Update
              </Link>
            </button>

            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
                <Link to={`/deleteFeedback/${feedBack._id}`}>
              Delete
              </Link>
            </button>
          </div>
        </div>
      </div>
    ) : null
  ))}
</div>
<Footer/>

    </>
  );
};

export default FeedBack;
