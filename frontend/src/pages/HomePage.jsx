import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../utils/api";
import MetricsGraph from "../components/MetricsGraph";
import SecurityReport from "../components/SecurityReport";
import MonacoEditor from "@monaco-editor/react";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [securityResult, setSecurityResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnalyze = async () => {
    try {
      const result = await api.post("/api/analysis", { code, language });
      console.log(result);
      setAnalysisResult(result);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error analyzing code");
    }
  };

  const handleScanSecurity = async () => {
    try {
      const result = await api.post("/api/security", { code, language });
      console.log(result);
      setSecurityResult(result);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error scanning security");
    }
  };

  const handleViewMore = () => {
    navigate('/analysis-detail', { state: { analysisResult } }); // Navigate to details page with results
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Code Analysis and Security Scanner</h1>

      <MonacoEditor
        height="400px"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          selectOnLineNumbers: true,
          minimap: { enabled: true },
          theme: "vs-dark",
          automaticLayout: true,
        }}
      />

      <div className="flex flex-col mt-4 space-y-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="C++">C++</option>
        </select>

        <div className="flex space-x-4">
          <button
            onClick={handleAnalyze}
            className="w-full text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-3 mb-2"
          >
            Analyze Code
          </button>
          <button
            onClick={handleScanSecurity}
            className="w-full text-white bg-green-600 border border-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-6 py-3 mb-2"
          >
            Scan Security
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {analysisResult && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Analysis Results</h2>
          <MetricsGraph metrics={analysisResult.metrics} />
          <button
            onClick={handleViewMore} // On click, navigate to the details page
            className="mt-4 w-full text-white bg-purple-600 border border-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg px-6 py-3 mb-2"
          >
            View More
          </button>
        </div>
      )}

      {securityResult && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Security Report</h2>
          <SecurityReport vulnerabilities={securityResult.vulnerabilities} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
