import PropTypes from 'prop-types';

const SecurityReport = ({ vulnerabilities }) => (
  <div>
    <h3>Vulnerabilities Found</h3>
    <ul>
      {vulnerabilities.map((vuln, index) => (
        <li key={index}>{vuln}</li>
      ))}
    </ul>
  </div>
);

SecurityReport.propTypes = {
  vulnerabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SecurityReport;
