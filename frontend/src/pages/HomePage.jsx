import { useState } from 'react';
import api from '../utils/api';
import MetricsGraph from '../components/MetricsGraph';
import SecurityReport from '../components/SecurityReport';  

const HomePage = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [securityResult, setSecurityResult] = useState(null); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = async () => {
    try {
      const result = await api.post('/api/analysis', { code, language });
      setAnalysisResult(result);  // Store the result
      setErrorMessage('');        // Clear any previous error messages
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Error analyzing code');
    }
  };
  

  const handleScanSecurity = async () => {
    try {
      const result = await api.post('/api/security', { code, language });
      setSecurityResult(result);  // Save the result from the security scan
      setErrorMessage('');  // Clear any previous error messages
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Error scanning security');
    }
  };

  return (
    <div>
      <h1>Code Analysis and Security Scanner</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="JavaScript">JavaScript</option>
        <option value="C++">C++</option>
      </select>
      <button onClick={handleAnalyze}>Analyze Code</button>
      <button onClick={handleScanSecurity}>Scan Security</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {analysisResult && (
        <div>
          <h2>Analysis Results</h2>
          <MetricsGraph metrics={analysisResult.metrics} />
        </div>
      )}

      {securityResult && (  // Render the SecurityReport component if security results are available
        <div>
          <h2>Security Report</h2>
          <SecurityReport vulnerabilities={securityResult.vulnerabilities} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
