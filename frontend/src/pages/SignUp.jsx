import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUp = () => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', {
        userName,
        email,
        password,
        mobileNumber,
        occupation,
      });
      if (response.data.status) {
        navigate('/signIn');
      } else {
        setErrorMessage('Error signing up');
      }
    } catch {
      setErrorMessage('Error signing up');
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
          <form className="space-y-6" onSubmit={handleSignup}>
            <h5 className="text-3xl font-bold text-blue-900 text-center">Create Your Account</h5>
            <div>
              <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 focus:outline-none focus:ring-4 focus:ring-blue-300"
                placeholder="John Doe"
                required
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 focus:outline-none focus:ring-4 focus:ring-blue-300"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 focus:outline-none focus:ring-4 focus:ring-blue-300"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                placeholder="0770000000"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 focus:outline-none focus:ring-4 focus:ring-blue-300"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900">
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                placeholder="Developer"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 focus:outline-none focus:ring-4 focus:ring-blue-300"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Sign up
            </button>
            <div className="text-sm font-medium text-gray-500 text-center mt-4">
              Already have an account?{' '}
              <a href="/signIn" className="text-blue-700 hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
