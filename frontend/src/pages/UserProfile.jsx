import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2 for confirmation dialogs
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa'; // Add icons
import api from '../utils/api'; // Assuming you have an API utility

const UserProfile = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profileimg, setProfileimg] = useState('');
  const [status, setStatus] = useState('');
  const [occupation, setOccupation] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/userdata', {
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.userId);
          setUsername(userData.userName);
          setEmail(userData.email);
          setMobileNumber(userData.mobileNumber);
          setProfileimg(userData.profileimg);
          setStatus(userData.status);
          setOccupation(userData.occupation);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteProfile = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/auth/deleteprofile/${userId}`);
          if (response.data.status) {
            Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
            navigate('/signIn'); // Redirect to sign-in page after deletion
          } else {
            Swal.fire('Error!', 'Error deleting account. Please try again.', 'error');
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          Swal.fire('Error!', 'There was an issue deleting your account.', 'error');
        }
      }
    });
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col items-center">
            <div className="my-10 w-full max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">My Profile</h2>

                {profileimg ? (
                  <img
                    className="w-48 h-48 rounded-full object-cover shadow-lg mb-4 transition-transform transform hover:scale-110"
                    src={profileimg}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-4xl font-bold">
                      {userName && userName.substring(0, 1).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Active Status Display */}
                <div className={`flex items-center justify-center mb-6 p-4 rounded-full shadow ${status === 'Active' ? 'bg-green-50' : 'bg-red-50'}`}>
                  {status === 'Active' ? (
                    <FaRegCheckCircle className="text-green-600 text-2xl mr-2" />
                  ) : (
                    <FaRegTimesCircle className="text-red-600 text-2xl mr-2" />
                  )}
                  <span className={`text-lg font-semibold ${status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {status === 'Active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Details Section */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
                    <FaUser className="text-blue-600 text-3xl mr-4" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Name</p>
                      <p className="text-md text-gray-600">{userName}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
                    <FaEnvelope className="text-blue-600 text-3xl mr-4" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Email</p>
                      <p className="text-md text-gray-600">{email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
                    <FaPhone className="text-blue-600 text-3xl mr-4" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Mobile</p>
                      <p className="text-md text-gray-600">{mobileNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
                    <FaBriefcase className="text-blue-600 text-3xl mr-4" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Occupation</p>
                      <p className="text-md text-gray-600">{occupation}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row mt-10 gap-6 w-full justify-center">
                  {status === 'Active' ? (
                    <>
                      <Link
                        to={`/editprofile/${userId}`}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                      >
                        Edit Profile
                      </Link>
                      <button
                        onClick={handleDeleteProfile}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                      >
                        Delete Account
                      </button>
                    </>
                  ) : (
                    <span className="text-md text-red-600 font-semibold">
                      Your account has been deleted.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
