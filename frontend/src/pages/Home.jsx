import { useState } from 'react';
import MetricsGraph from '../components/MetricsGraph.jsx';
import SecurityReport from '../components/SecurityReport.jsx';
import CodeAnalysisResults from '../components/CodeAnalysisResults.jsx';
import api from '../utils/api';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Cookies from 'js-cookie';

const Home = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [securityResult, setSecurityResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Update the textarea onChange handler to clear error message when typing
  const handleCodeChange = (e) => {
    setCode(e.target.value);
    if (errorMessage) {
      setErrorMessage(''); // Clear the error message when user types
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setErrorMessage('⚠️ Please enter some code to analyze.');
      return;
    }
    try {
      const token = Cookies.get('token');
      const result = await api.post('/api/analysis', { code, language }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnalysisResult(result.data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('❌ Error occurred while analyzing the code. Please try again.');
    }
  };

  const handleScanSecurity = async () => {
    if (!code.trim()) {
      setErrorMessage('⚠️ Please enter some code to scan.');
      return;
    }
    try {
      const token = Cookies.get('token');
      const result = await api.post('/api/security', { code, language }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSecurityResult(result.data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('❌ Error occurred while scanning for security vulnerabilities.');
    }
  };

  const handleClearCode = () => {
    setCode(''); // Clear the code when the user clicks "Clear Code"
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 py-16">
          {/* Update the text color to black for the title and subtitle */}
          <h1 className="text-6xl font-semibold text-center text-black mb-8 tracking-tight leading-snug">
            Your Code, Our Insights
          </h1>
          <p className="text-center text-black text-xl mb-12 max-w-xl mx-auto">
            Discover seamless code quality and security insights, crafted for simplicity and precision.
          </p>

          <div className="flex flex-col items-center w-full">
            <textarea
              value={code}
              onChange={handleCodeChange} // Update the onChange event to handle clearing the error
              rows="10"
              className="border border-blue-300 rounded-xl p-6 w-full max-w-4xl mb-6 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all placeholder-blue-400 text-lg text-blue-900"
              placeholder="Paste your code here..."
            />
            <div className="flex items-center justify-center gap-6 mb-6">
              <label className="text-blue-900 text-lg font-semibold">
                Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-blue-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all text-lg"
              >
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
              </select>
            </div>

            <div className="flex gap-6">
              <button
                onClick={handleAnalyze}
                className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
              >
                Analyze Code
              </button>
              <button
                onClick={handleScanSecurity}
                className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
              >
                Scan Security
              </button>

              {code.trim() && (
                <button
                  onClick={handleClearCode}
                  className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
                >
                  Clear Code
                </button>
              )}
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-600 mt-6 text-center text-xl font-semibold">
              {errorMessage}
            </p>
          )}

          {analysisResult && (
            <div className="mt-12 bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto transition-all">
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">
                Analysis Results
              </h2>

              {/* The graph is placed at the top */}
              <div className="w-full mb-8">
                <MetricsGraph metrics={analysisResult.metrics} />
              </div>

              {/* Quality metrics are displayed below the graph */}
              <div className="w-full">
                <CodeAnalysisResults results={analysisResult} />
              </div>
            </div>
          )}

          {securityResult && (
            <div className="mt-12 bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto transition-all">
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">
                Security Report
              </h2>
              <SecurityReport vulnerabilities={securityResult.vulnerabilities} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
