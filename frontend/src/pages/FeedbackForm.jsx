import React, { useState ,useEffect } from 'react'
import Header from '../components/Header';
import Navbar from '../components/NavBar';
import {useNavigate} from "react-router-dom"
import Footer from '../components/Footer';

const FeedbackForm = () => {

    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const [userId, setUserId] = useState();
    const navigate = useNavigate();
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
    

const handleFeedback =async (e)=>{

    e.preventDefault();
   
    try {
        const response = await fetch('http://localhost:5000/API/saveFeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                title,
                description,
                userId :userId
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.status){
          alert("Feedback Added Successfully !")
          navigate('/feedback');
        }else{
          alert("Error with save")
        }
  
    } catch (error) {
        console.error('There was a problem with the save operation:', error);
    }
}



  return (
  <>
  <Header/>
  <Navbar/>
   <div
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div className="w-full  max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleFeedback}>
            <h5 className="text-xl text-center font-bold font-medium text-gray-900 dark:text-white">
           Feedback Form
            </h5>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Feed Back Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setTitle(e.target.value)}
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
          required
          rows="5" // You can adjust the number of rows as needed
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
           
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            
           >
             Submit your feedback
            </button>
       
           
          </form>
        </div>
      </div>
      <Footer/>
  </>
  )
}

export default FeedbackForm