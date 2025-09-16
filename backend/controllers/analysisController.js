import { parsePythonCode } from '../parsers/PythonParser.js';
import { parseJavaCode } from '../parsers/JavaParser.js';
import { parseJavaScriptCode } from '../parsers/JavaScriptParser.js';
import { parseCppCode } from '../parsers/CppParser.js';
import { calculateMetrics } from '../utils/calculator.js';
import AnalysisResult from '../models/AnalysisResult.js';

// Helper function to get node type
const getNodeType = (node) => {
  if (node.constructor && node.constructor.name) {
    return node.constructor.name;
  } else if (node.getText) {
    return node.getText();
  }
  return 'Unknown';
};


// Helper function to print the AST
const inspectAST = (node, depth = 0) => {
  const indent = '  '.repeat(depth);
  console.log(`${indent}${getNodeType(node)}`);

  if (node.children) {
    node.children.forEach((child) => inspectAST(child, depth + 1));
  } else if (node.getChildCount && node.getChildCount() > 0) {
    for (let i = 0; i < node.getChildCount(); i++) {
      inspectAST(node.getChild(i), depth + 1);
    }
  }
};

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

    // Inspect the AST before calculating metrics
    console.log('--- Inspecting AST Structure ---');
    inspectAST(ast);

    const metrics = calculateMetrics(ast, language);
    const analysisResult = new AnalysisResult({ language, metrics });
    await analysisResult.save();
    res.json(analysisResult);
  } catch (error) {
    console.error('Error analyzing code:', error);
    res.status(500).json({ error: 'Error analyzing code.' });
  }
};
