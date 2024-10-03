import React ,{ useEffect, useState } from 'react'
import mainLogo from "../assets/Logo1.png"
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {

    const [user, setUser] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
  
    useEffect(() => {
      const fetchUserData = async (token) => {
        try {
          const response = await fetch("http://localhost:5000/auth/userdata", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,  // Bearer token is correctly attached
            },
            credentials: 'include',  // Ensure credentials are included in the request
          });
      
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.log("Error: ", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
  
   const token = localStorage.getItem('token');
      fetchUserData(token);
    }, []);
  
    const handlelogin = () => {
      window.location.href = "/signIn";
    };
    const handlesignup = () => {
      window.location.href = "/signUp";
    };
  
    const toggleDropdown = () => {
      setShowDropdown((prev) => !prev);
    };
  
    const handleLogout = () => {
      axios.defaults.withCredentials = true;
      axios
        .get("http://localhost:5000/auth/logout")
        .then((res) => {
          if (res.data.status) {
            window.location.href = "/signIn";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };


  return (
    <header className="bg-white text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <img src={mainLogo} alt="Logo" className="h-20 w-auto" />
        </div>
        {user ? (
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={toggleDropdown}
            >
              <div>
                <p className="font-semibold text-black text-xl">
                  {user.userName}
                </p>
              </div>

              {user.profileImg ? (
                <div className="mr-4 mx-6">
                  <img
                    src={user.profileImg}
                    alt="Profile"
                    className="h-16 w-16 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 mx-5 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  <span className="flex-grow text-center text-xl">
                    {user.userName &&
                      user.userName.substring(0, 1).toUpperCase()}
                  </span>
                </div>
              )}
            </button>

            {showDropdown && (
              user.role=='admin' ? (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/userProfile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/admindashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>

              ):(
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
              )
             
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handlelogin}
              className="text-blue-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={handlesignup}
              className="text-blue-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header