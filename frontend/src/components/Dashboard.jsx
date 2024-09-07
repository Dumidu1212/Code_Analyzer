import PropTypes from 'prop-types';
import MetricsGraph from './MetricsGraph';
import SecurityReport from './SecurityReport';
import CodeAnalysisResults from './CodeAnalysisResults';

const Dashboard = ({ analysisData, securityData }) => (
  <div className="dashboard">
    <h2>Code Analysis Dashboard</h2>
    <MetricsGraph metrics={analysisData?.metrics} />
    <SecurityReport vulnerabilities={securityData?.vulnerabilities} />
    <CodeAnalysisResults results={analysisData} />
  </div>
);

Dashboard.propTypes = {
  analysisData: PropTypes.shape({
    metrics: PropTypes.shape({
      cyclomaticComplexity: PropTypes.number,
      cognitiveComplexity: PropTypes.number,
      maintainabilityIndex: PropTypes.number,
    }),
  }),
  securityData: PropTypes.shape({
    vulnerabilities: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Dashboard;
