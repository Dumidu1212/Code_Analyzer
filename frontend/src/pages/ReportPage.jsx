import { useState } from 'react';
import MetricsGraph from '../components/MetricsGraph';
import SecurityReport from '../components/SecurityReport';
import CodeAnalysisResults from '../components/CodeAnalysisResults';
import api from '../utils/api';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReportPage = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [securityResult, setSecurityResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = async () => {
    try {
      const result = await api.post('/api/analysis', { code, language });
      setAnalysisResult(result.data);
      setErrorMessage('');
    } catch {
      setErrorMessage('Error analyzing code');
    }
  };

  const handleScanSecurity = async () => {
    try {
      const result = await api.post('/api/security', { code, language });
      setSecurityResult(result.data);
      setErrorMessage('');
    } catch {
      setErrorMessage('Error scanning security');
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Code Analysis and Security Scanner</h1>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="10"
          className="border p-2 w-full mt-4"
          placeholder="Enter code here..."
        />
        <div className="flex items-center mt-4">
          <label className="mr-2">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-2"
          >
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAnalyze}
            className="bg-blue-500 text-white p-2 mr-4 rounded"
          >
            Analyze Code
          </button>
          <button
            onClick={handleScanSecurity}
            className="bg-red-500 text-white p-2 rounded"
          >
            Scan Security
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        {analysisResult && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Analysis Results</h2>
            <MetricsGraph metrics={analysisResult.metrics} />
            <CodeAnalysisResults results={analysisResult} />
          </div>
        )}
        {securityResult && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Security Report</h2>
            <SecurityReport vulnerabilities={securityResult.vulnerabilities} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReportPage;
