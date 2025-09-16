import PropTypes from 'prop-types';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const CodeAnalysisResults = ({ results }) => {
  const renderMetric = (label, value, description, status = 'neutral') => {
    const getColorClass = () => {
      if (status === 'good') return 'bg-green-100 text-green-800';
      if (status === 'moderate') return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    };

    return (
      <div className="mb-6 p-8 bg-white shadow-lg rounded-lg border border-gray-300 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{label}</h3>
          <span className={`py-2 px-5 rounded-full text-2xl font-bold ${getColorClass()}`}>
            {status === 'good' ? (
              <FaCheckCircle className="inline-block mr-2" />
            ) : (
              <FaExclamationCircle className="inline-block mr-2" />
            )}
            {value}
          </span>
        </div>
        <p className="text-gray-600 mt-4 text-lg">
          <FaInfoCircle className="inline-block text-blue-500 mr-2" />
          {description}
        </p>
      </div>
    );
  };

  const determineStatus = (metric, value) => {
    switch (metric) {
      case 'Cyclomatic Complexity':
        if (value <= 5) return 'good';
        if (value <= 10) return 'moderate';
        return 'bad';
      case 'Maintainability Index':
        if (value >= 80) return 'good';
        if (value >= 50) return 'moderate';
        return 'bad';
      case 'Cognitive Complexity':
        if (value < 10) return 'good';
        if (value <= 20) return 'moderate';
        return 'bad';
      default:
        return 'neutral';
    }
  };

  const getCyclomaticComplexityExplanation = (value) => {
    let explanation = 'Cyclomatic complexity measures the number of independent paths through your code. ';
    explanation += 'Good levels are values <= 5, moderate levels are values between 6 and 10, and bad levels are values > 10. ';
    if (value <= 5) {
      return explanation + 'This is excellent! The code is simple and easy to maintain with fewer logical paths.';
    } else if (value <= 10) {
      return explanation + 'This is moderate, but you might consider simplifying the code for better readability and maintainability.';
    } else {
      return explanation + 'This is high complexity, which can lead to bugs and make the code harder to maintain. Refactoring is recommended.';
    }
  };

  const getMaintainabilityIndexExplanation = (value) => {
    let explanation = 'Maintainability Index predicts how easy it will be to maintain the code in the future. ';
    explanation += 'Good levels are values >= 80, moderate levels are values between 50 and 79, and bad levels are values < 50. ';
    if (value >= 80) {
      return explanation + 'The code is highly maintainable and future modifications should be relatively easy.';
    } else if (value >= 50) {
      return explanation + 'The code is maintainable but could be improved. Reducing complexity will improve this score.';
    } else {
      return explanation + 'This indicates that the code is difficult to maintain. Refactoring is strongly recommended to improve modularity and readability.';
    }
  };

  return (
    <div className="analysis-results mt-10 px-4 md:px-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Code Quality Metrics</h2>
      {results?.metrics?.cyclomaticComplexity !== null && results.metrics.cyclomaticComplexity !== undefined && renderMetric(
        'Cyclomatic Complexity',
        results.metrics.cyclomaticComplexity,
        getCyclomaticComplexityExplanation(results.metrics.cyclomaticComplexity),
        determineStatus('Cyclomatic Complexity', results.metrics.cyclomaticComplexity)
      )}
      {results?.metrics?.cognitiveComplexity !== null && results.metrics.cognitiveComplexity !== undefined && renderMetric(
        'Cognitive Complexity',
        results.metrics.cognitiveComplexity,
        'Cognitive complexity reflects how difficult it is for a human to understand the code. Lower values are better as they indicate code that is easier to understand and maintain. A good range is values below 10.',
        determineStatus('Cognitive Complexity', results.metrics.cognitiveComplexity)
      )}
      {results?.metrics?.maintainabilityIndex !== null && results.metrics.maintainabilityIndex !== undefined && renderMetric(
        'Maintainability Index',
        results.metrics.maintainabilityIndex.toFixed(2),
        getMaintainabilityIndexExplanation(results.metrics.maintainabilityIndex),
        determineStatus('Maintainability Index', results.metrics.maintainabilityIndex)
      )}
      {results?.metrics?.halstead && (
        <div className="mb-6 p-8 bg-white shadow-lg rounded-lg border border-gray-300 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <h3 className="text-lg font-bold text-gray-800">Halstead Metrics</h3>
          <p className="text-gray-600 mt-4 text-lg">
            Halstead metrics measure the complexity of your code by analyzing the number of operators and operands, the effort required to understand the code, and the code volume. Lower values typically indicate simpler code.
          </p>
          <ul className="list-disc ml-6 mt-4">
            <li className="text-gray-700"><strong>Operators:</strong> {results.metrics.halstead.operators}</li>
            <li className="text-gray-700"><strong>Operands:</strong> {results.metrics.halstead.operands}</li>
            <li className="text-gray-700"><strong>Effort:</strong> {results.metrics.halstead.effort}</li>
            <li className="text-gray-700"><strong>Volume:</strong> {results.metrics.halstead.volume}</li>
          </ul>
        </div>
      )}
      {results?.vulnerabilities?.length > 0 && (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-8 border border-red-300 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Security Vulnerabilities Found</h2>
          <ul className="list-disc ml-6">
            {results.vulnerabilities.map((vuln, index) => (
              <li key={index} className="text-red-600">
                {vuln}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

CodeAnalysisResults.propTypes = {
  results: PropTypes.object.isRequired,
};

export default CodeAnalysisResults;
