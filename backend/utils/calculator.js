// calculator.js

import { calculatePythonMetrics } from './pythonMetricsCalculator.js';
import { calculateJavaMetrics } from './javaMetricsCalculator.js';
import { calculateJavaScriptMetrics } from './javaScriptMetricsCalculator.js';
import { calculateCppMetrics } from './cppMetricsCalculator.js';

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
