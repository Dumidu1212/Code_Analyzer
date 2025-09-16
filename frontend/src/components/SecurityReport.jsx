// src/components/SecurityReport.jsx
import PropTypes from 'prop-types';

const SecurityReport = ({ vulnerabilities }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Vulnerabilities Found</h3>
    <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner">
      {vulnerabilities.map((vuln, index) => (
        <li key={index} className="text-sm text-gray-600">
          {vuln}
        </li>
      ))}
    </ul>
  </div>
);

SecurityReport.propTypes = {
  vulnerabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SecurityReport;
