import { calculatePythonMetrics } from './calculators/pythonMetricsCalculator.js';
import { calculateJavaMetrics } from './calculators/javaMetricsCalculator.js';
import { calculateJavaScriptMetrics } from './calculators/javascriptMetricsCalculator.js';
import { calculateCppMetrics } from './calculators/cppMetricsCalculator.js';

export const calculateMetrics = (ast, language) => {
  switch (language) {
    case 'Python':
      return calculatePythonMetrics(ast);
    case 'Java':
      return calculateJavaMetrics(ast);
    case 'JavaScript':
      return calculateJavaScriptMetrics(ast);
    case 'C++':
      return calculateCppMetrics(ast);
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
