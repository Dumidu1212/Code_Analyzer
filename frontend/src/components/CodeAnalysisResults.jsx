import PropTypes from 'prop-types';

const CodeAnalysisResults = ({ results }) => (
  <div className="analysis-results">
    <h2>Analysis Results</h2>
    <pre>{JSON.stringify(results, null, 2)}</pre>
  </div>
);

CodeAnalysisResults.propTypes = {
  results: PropTypes.object.isRequired,
};

export default CodeAnalysisResults;
