import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import firebase from "firebase/compat/app";
import 'firebase/compat/storage'
import Navbar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';


const EditProfile = () => {
  const [id, setId] = useState();
  const [userName, setUsername] = useState();

  const [email, setEmail] = useState();

  const [mobileNumber, setMobilenumber] = useState();
  const [profileImg, setProfileimg] = useState();
  const [occupation, setOccupation] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/userdata", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setId(userData.userId);
          setUsername(userData.userName);
          setEmail(userData.email);
          setMobilenumber(userData.mobileNumber);
          setOccupation(userData.occupation);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

 const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    
    if(selectedFile){
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      const uploadTask = fileRef.put(selectedFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Track upload progress
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          // Upload complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            setProfileimg(downloadURL);
          });
        }
      );
    }
    else{
      console.log('no file selected');
    }
  };    

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/auth/updateprofile/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
         userName,
          email,
          mobileNumber,
          profileImg,
          occupation
        }),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
   
      if (responseData.status) {
        navigate('/userProfile')
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  return (
    <>
    <Header/>
    <Navbar/>
    <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundColor: "  ",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-lg  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

      <form className="max-w-md mx-auto" onSubmit={handleUpdate}>
      <h5 className="text-xl font-medium text-gray-900 dark:text-white mb-5">
            Update Profile
            </h5>
        <div className="mb-5">
          <label
            htmlFor="userName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="mobileNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => {
              setMobilenumber(e.target.value);
            }}
          />
        </div>

        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="user_avatar"
        >
          Upload Profile Picture
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
          onChange={handleUpload}
        />
        <div
          className="mt-4 text-sm text-gray-500 dark:text-gray-300"
          id="user_avatar_help"
        >
          A profile picture shoul be SVG , PNG ,JPG or JPEG
        
          <p>Upload Progress: {uploadProgress}%</p>
        </div>


        <div className="mt-5 mb-5">
          <label
            htmlFor="occupation"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Occupation
          </label>
          <input
            type="occupation"
            id="occupation"
            
            value={occupation}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default EditProfile;
