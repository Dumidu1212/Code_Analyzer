import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import api from '../utils/api';

const ReportPage = () => {
  const [analysisData, setAnalysisData] = useState({});
  const [securityData, setSecurityData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const analysisResponse = await api.get('/api/analysis/latest');
      const securityResponse = await api.get('/api/security/latest');
      setAnalysisData(analysisResponse);
      setSecurityData(securityResponse);
    };
    fetchData();
  }, []);

  return (
    <div className="report-page">
      <h1>Analysis Report</h1>
      <Dashboard analysisData={analysisData} securityData={securityData} />
    </div>
  );
};

export default ReportPage;
