import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import Header from '../components/Header';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const UserProfile = () => {

    const [userId, setUserId] = useState("");
    const [userName, setUsername] = useState();
    const [email, setEmail] = useState();
    const [mobileNumber, setMobilenumber] = useState();
    const [profileImg, setProfileimg] = useState();
    const [status, setStatus] = useState("");
    const [occupation, setOccupation] = useState();
 
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:5000/auth/userdata", {
            credentials: "include",
          });
          if (response.ok) {
            const userData = await response.json();
            console.log(userData);
            setUserId(userData.userId);
            setUsername(userData.userName);
            setEmail(userData.email);
            setMobilenumber(userData.mobileNumber);
            setProfileimg(userData.profileImg);
            setStatus(userData.status);
            setOccupation(userData.occupation);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
    

  return (
    <>
    <Header />
    <Navbar />
    <div className="bg-gray-200 flex flex-col items-center" >
      <div className=" my-10 w-full max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="mt-5 mb-4 flex items-center justify-center">
          <h4 className="text-2xl font-bold" >My Profile</h4>
        </div>
        <div className="flex flex-col items-center pb-10">
          {profileImg ? (
            <div className="flex items-center justify-center">
              <img
                className="w-52 h-52 rounded-full object-cover"
                src={profileImg}
                alt="Profile Image"
              />
            </div>
          ) : (
            <div className="w-52 h-52 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              <span className="flex-grow text-center text-xl">
                {userName && userName.substring(0, 1).toUpperCase()}
              </span>
            </div>
          )}

          <div className="mx-10 mt-10">
            <h5 className="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Name : {userName}
            </h5>
            <h5 className="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Email : {email}
            </h5>
            <h5 className="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Mobile Number : {mobileNumber}
            </h5>
            <h5 className="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Status : {status}
            </h5>
            <h5 className="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Occupation : {occupation}
            </h5>
          </div>

          {status !== "Active" ? (
            <span className="flex-grow text-center text-md ">
              Your account has been de-activated
            </span>
          ) : (
            <div className="flex mt-4 md:mt-6">
              <Link
                to={`/editprofile/${userId}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Profile
              </Link>
              <a
                href={`/deleteprofile/${userId}`}
                className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-gray-200 hover:bg-red-900 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-red-700 dark:hover:bg-gray-700"
              >
                De-activate Account
              </a>
            </div>
          )}
        </div>
      </div>

     
    </div>

<Footer/>
  </>
  )
}

export default UserProfile