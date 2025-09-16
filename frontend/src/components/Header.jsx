import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/logo.png';
import axios from 'axios';
import Cookies from 'js-cookie';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:5000/auth/userdata', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:5000/auth/logout', { withCredentials: true })
      .then(() => {
        window.location.href = '/signIn';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="bg-white text-black shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/home">
          <img src={mainLogo} alt="Logo" className="h-20 w-auto" />
        </Link>
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
              {user.profileimg ? (
                <div className="mr-4 mx-6">
                  <img
                    src={user.profileimg}
                    alt="Profile"
                    className="h-16 w-16 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 mx-5 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
                  <span className="flex-grow text-center text-xl">
                    {user.userName && user.userName.substring(0, 1).toUpperCase()}
                  </span>
                </div>
              )}
            </button>
            {showDropdown && (
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
                  >
                    Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admindashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              to="/signIn"
              className="text-blue-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign in
            </Link>
            <Link
              to="/signUp"
              className="text-blue-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
