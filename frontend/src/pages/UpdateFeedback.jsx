import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/NavBar';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

const UpdateFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`http://localhost:5000/API/getFeedbackById/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setFeedback(jsonData);
        setTitle(jsonData.title || ''); // Initialize title
        setDescription(jsonData.description || ''); // Initialize description
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/API/updateFeedback/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          title: title || feedback.title,
          description: description || feedback.description,
          userId: feedback.userId
        }),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
   
      if (responseData.status) {
        Swal.fire({
          title: 'Updated successfully!',
          text: 'Feedback has been updated.',
          icon: 'success'
        });
        navigate('/feedback');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleFeedback}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Update Feedback</h5>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Feedback Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter feedback title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter your feedback here..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={description}
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UpdateFeedback;
