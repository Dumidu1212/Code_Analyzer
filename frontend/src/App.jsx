//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FeedBack from "./pages/FeedBack";
import FeedBackAdminDashBoard from "./pages/FeedBackAdminDashBoard";
import AdminDashBoard from "./pages/AdminDashBoard";
import DeleteUser from "./pages/DeleteUser";
import FeedbackForm from "./pages/FeedbackForm";
import DeleteFeedback from "./pages/DeleteFeedback";
import UpdateFeedback from "./pages/UpdateFeedback";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Cookies from 'js-cookie';
import axios from "axios";
import AnalysisDetailPage from './pages/AnalysisDetailPage';

//import FeedbackForm from './components/FeedbackForm';

function App() {

  
  
  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:5000/auth/userdata", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const UserRoute = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const getUserData = async () => {
        try {
          const userData = await fetchUserData();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      getUserData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return user && (user.role === "user" || user.role === "admin") ? (
      children
    ) : (
      <Navigate to="/signIn" />
    );
  };

  const AdminRoute = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const getUserData = async () => {
        try {
          const userData = await fetchUserData();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      getUserData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return user && user.role === "admin" ? children : <Navigate to="/home" />;
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path='/home' element={
       <UserRoute>
       <Home/>
       </UserRoute>
       }></Route>
       <Route path='/signIn' element={<SignIn/>}></Route>
       <Route path='/signUp' element={<SignUp/>}></Route>
       <Route path='/feedback' element={
        <UserRoute>
       <FeedBack/>
       </UserRoute>
       }></Route>
   
       <Route path='/feedback-admin' element={<FeedBackAdminDashBoard/>}></Route>
       <Route path='/admindashboard' element={<AdminDashBoard/>}></Route>
       <Route path="/deleteuser/:id" element={<DeleteUser />}></Route>
       <Route path="/feedbackForm" element={<FeedbackForm />}></Route>
       <Route path="/deleteFeedback/:id" element={<DeleteFeedback />}></Route>
       <Route path="/updateFeedback/:id" element={<UpdateFeedback />}></Route>
       <Route path="/userProfile" element={<UserProfile />}></Route>
       <Route path="/editprofile/:id" element={<EditProfile />}></Route>
       <Route path="/aboutUs" element={<AboutUs />}></Route>
       <Route path="/contactUs" element={<ContactUs />}></Route>
       <Route path="/analysis-detail" element={<AnalysisDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
