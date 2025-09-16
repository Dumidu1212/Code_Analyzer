import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signin', { email, password });
      if (response.data.status) {
        const user = response.data.user;
        // Check if the user is an admin or not
        if (user.role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/home');
        }
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch {
      setErrorMessage('Error signing in');
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-3xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSignin}>
            <h5 className="text-3xl font-bold text-blue-900 text-center">Sign in to your account</h5>
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
                Your password
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
            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Sign in
            </button>
            <div className="text-sm font-medium text-gray-500 text-center mt-4">
              Not registered?{' '}
              <a href="/signUp" className="text-blue-700 hover:underline">
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
