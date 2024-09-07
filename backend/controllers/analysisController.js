import { parsePythonCode } from '../parsers/PythonParser.js';
import { parseJavaCode } from '../parsers/JavaParser.js';
import { parseJavaScriptCode } from '../parsers/JavaScriptParser.js';
import { parseCppCode } from '../parsers/CppParser.js';
import { calculateMetrics } from '../utils/calculator.js';
import AnalysisResult from '../models/AnalysisResult.js';


export const analyzeCode = async (req, res) => {
  const { code, language } = req.body;

  if (!code || code.trim().length === 0) {
    return res.status(400).json({ error: 'No code provided for analysis.' });
  }

  let ast;
  try {
    switch (language) {
      case 'Python':
        ast = parsePythonCode(code);
        break;
      case 'Java':
        ast = parseJavaCode(code);
        break;
      case 'JavaScript':
        ast = parseJavaScriptCode(code);
        break;
      case 'C++':
        ast = parseCppCode(code);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported language' });
    }

    if (!ast) {
      return res.status(400).json({ error: 'Failed to parse code. Invalid or unsupported code.' });
    }

    const metrics = calculateMetrics(ast, language);

    const analysisResult = new AnalysisResult({ language, metrics });
    await analysisResult.save();
    res.json(analysisResult);
  } catch (error) {
    console.error('Error analyzing code:', error);  // Log the error to the server console
    res.status(500).json({ error: 'Error analyzing code.' });
  }
};
