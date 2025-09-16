import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import FeedBack from './Pages/FeedBack';
import Cookies from 'js-cookie';
import axios from 'axios';
import AdminDashBoard from './Pages/AdminDashBoard';
import DeleteUser from './Pages/DeleteUser';
import FeedbackForm from './Pages/FeedbackForm';
import DeleteFeedback from './Pages/DeleteFeedback';
import UpdateFeedback from './Pages/UpdateFeedback';
import FeedBackAdminDashBoard from './Pages/FeedBackAdminDashBoard';
import UserProfile from './Pages/UserProfile';
import EditProfile from './Pages/EditProfile';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import ReportPage from './Pages/ReportPage'; // Assuming you have a ReportPage component

// Helper function to fetch user data from the backend
const fetchUserData = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get('http://localhost:5000/auth/userdata', {
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

// Public route wrapper for routes accessible by everyone
const PublicRoute = ({ children }) => {
  return children;
};

// Protected route wrapper for signed-in users (both user and admin)
const UserRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user && (user.role === 'user' || user.role === 'admin') ? (
    children
  ) : (
    <Navigate to="/signIn" />
  );
};

// Admin route wrapper for routes accessible by admins only
const AdminRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user && user.role === 'admin' ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root ("/") to "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public Route - Home accessible to all */}
        <Route
          path="/home"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Protected Routes for authenticated users */}
        <Route
          path="/feedback"
          element={
            <UserRoute>
              <FeedBack />
            </UserRoute>
          }
        />
        <Route path="/feedbackForm" element={<UserRoute><FeedbackForm /></UserRoute>} />
        <Route path="/deleteFeedback/:id" element={<UserRoute><DeleteFeedback /></UserRoute>} />
        <Route path="/updateFeedback/:id" element={<UserRoute><UpdateFeedback /></UserRoute>} />

        {/* Admin Routes */}
        <Route
          path="/feedback-admin"
          element={
            <AdminRoute>
              <FeedBackAdminDashBoard />
            </AdminRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <AdminRoute>
              <AdminDashBoard />
            </AdminRoute>
          }
        />
        <Route path="/deleteuser/:id" element={<AdminRoute><DeleteUser /></AdminRoute>} />

        {/* Protected Route - User profile only accessible if signed in */}
        <Route
          path="/userProfile"
          element={
            <UserRoute>
              <UserProfile />
            </UserRoute>
          }
        />
        <Route path="/editprofile/:id" element={<UserRoute><EditProfile /></UserRoute>} />

        {/* Public Pages */}
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />

        {/* Report Page (Assumed) */}
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
