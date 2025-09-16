// src/pages/EditProfile.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EditProfile = () => {
  const [id, setId] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profileimg, setProfileimg] = useState('');
  const [occupation, setOccupation] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/userdata');
        const userData = response.data;
        setId(userData.userId);
        setUsername(userData.userName);
        setEmail(userData.email);
        setMobileNumber(userData.mobileNumber);
        setOccupation(userData.occupation);
        setProfileimg(userData.profileimg);
      } catch {
        console.error('Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      const uploadTask = fileRef.put(selectedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setProfileimg(downloadURL);
            setUploadProgress(0); // Reset progress after successful upload
          });
        }
      );
    } else {
      console.log('No file selected');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/updateprofile/${id}`, {
        userName,
        email,
        mobileNumber,
        profileimg,
        occupation,
      });
      if (response.data.status) {
        navigate('/userProfile');
      }
    } catch {
      console.error('Error updating profile');
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-4xl font-semibold text-gray-900 text-center mb-8">Edit Profile</h2>
          <form className="space-y-6" onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="userName" className="text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 transition focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 transition focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="mobileNumber" className="text-gray-700 font-medium mb-2">
                  Your Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  value={mobileNumber}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 transition focus:ring-2 focus:ring-blue-300"
                  required
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="occupation" className="text-gray-700 font-medium mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  value={occupation}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 transition focus:ring-2 focus:ring-blue-300"
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2" htmlFor="user_avatar">
                Upload Profile Picture
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                id="user_avatar"
                type="file"
                onChange={handleUpload}
              />
              {/* Only show upload progress if an upload is in progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2 text-sm text-gray-600">
                  Upload Progress: {uploadProgress}%
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
