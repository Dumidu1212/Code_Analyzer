// src/pages/FeedbackAdminDashboard.jsx

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import NavbarAdmin from '../components/NavbarAdmin';
import Footer from '../components/Footer';

const FeedBackAdminDashBoard = () => {
  const [feedBacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState({}); // Store user data in an object keyed by userId

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feedback/feedbacks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setFeedbacks(jsonData);

        // Fetch users for each feedback
        const userIds = [...new Set(jsonData.map(fb => fb.userId))]; // Get unique user IDs
        const userResponses = await Promise.all(
          userIds.map(id => fetch(`http://localhost:5000/auth/getuserbyid/${id}`))
        );
        const userJsonData = await Promise.all(userResponses.map(res => res.json()));
        const userMap = userJsonData.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(userMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <Header />
      <NavbarAdmin />
      <div className="mt-10">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-bold">All Feedbacks</h2>
        </div>
        {feedBacks.map((feedBack) => (
          users[feedBack.userId] && (
            <div key={feedBack.id} className="mx-20 my-10 max-w-7xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5 flex flex-row">
              {users.profileimg ? (
                <div className="mr-4 mx-6 flex-1">
                  <img
                    src={users.profileimg}
                    alt="Profile"
                    className="h-16 w-16 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  <span className="flex-grow text-center text-xl">
                    {users[feedBack.userId]?.userName &&
                     users[feedBack.userId]?.userName.substring(0, 1).toUpperCase()}
                  </span>
                </div>
              )}
              <div className='flex-1 mx-5'>
                <h5 className="mb-3 text-xl tracking-tight text-gray-900 dark:text-white">
                <span className='font-bold'>   Feedback For : </span>  {feedBack.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className='font-bold'>    Message :</span>  {feedBack.description}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <span className='font-bold'>    Feedback Uploaded By:</span> {users[feedBack.userId]?._id}
                </p>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default FeedBackAdminDashBoard;
