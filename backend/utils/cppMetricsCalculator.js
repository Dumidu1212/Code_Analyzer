// src/utils/cppMetricsCalculator.js

import antlr4 from 'antlr4';

export const calculateCppMetrics = (ast) => {
  if (!ast) {
    return {
      cyclomaticComplexity: 0,
      cognitiveComplexity: 0,
      halsteadVolume: 0,
      maintainabilityIndex: 0,
    };
  }

  // Calculate metrics
  const cyclomaticComplexity = calculateCyclomaticComplexity(ast);
  const cognitiveComplexity = calculateCognitiveComplexity(ast);
  const halsteadVolume = calculateHalsteadVolume(ast);
  const linesOfCode = calculateLinesOfCode(ast);
  const maintainabilityIndex = calculateMaintainabilityIndex(
    cyclomaticComplexity,
    halsteadVolume,
    linesOfCode
  );

  return {
    cyclomaticComplexity,
    cognitiveComplexity,
    halsteadVolume,
    maintainabilityIndex,
  };
};

// Helper function to get the node type
const getNodeType = (node) => {
  if (node.constructor && node.constructor.name) {
    return node.constructor.name;
  }
  return 'Unknown';
};


// Calculate Cyclomatic Complexity
const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1; // Base complexity

  const traverse = (node) => {
    const nodeType = getNodeType(node).toLowerCase();

    if (nodeType === 'functiondefinitioncontext') {
      // Reset complexity for each function
      complexity = 1;
    } else if (['if', 'switch', 'for', 'while', 'do'].includes(nodeType)) {
      complexity++;
    } else if (nodeType === 'catchclausecontext') {
      complexity++;
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(ast);
  return complexity;
};





// Calculate Cognitive Complexity
const calculateCognitiveComplexity = (ast) => {
  let complexity = 0;

  const traverse = (node, nestingLevel = 0, inDecisionStructure = false) => {
    const nodeType = getNodeType(node).toLowerCase();
    let isDecisionNode = false;
  
    if (nodeType === 'selectionstatementcontext') {
      const firstChildText = node.getChild(0).getText();
      if (firstChildText === 'if' || firstChildText === 'switch') {
        console.log(`Found ${firstChildText} at nesting level ${nestingLevel}`);
        complexity += 1;
        if (nestingLevel > 0) {
          complexity += 1;
          console.log(`Incremented for nesting: current complexity ${complexity}`);
        }
        nestingLevel++;
        isDecisionNode = true;
      }
    } else if (nodeType === 'iterationstatementcontext') {
      const firstChildText = node.getChild(0).getText();
      console.log(`Found ${firstChildText} at nesting level ${nestingLevel}`);
      complexity += 1;
      if (nestingLevel > 0) {
        complexity += 1;
        console.log(`Incremented for nesting: current complexity ${complexity}`);
      }
      nestingLevel++;
      isDecisionNode = true;
    } else if (nodeType === 'catchclausecontext') {
      console.log(`Found catch at nesting level ${nestingLevel}`);
      complexity += 1;
      if (nestingLevel > 0) {
        complexity += 1;
        console.log(`Incremented for nesting: current complexity ${complexity}`);
      }
      nestingLevel++;
      isDecisionNode = true;
    }
  
    // Recursively traverse children
    if (node.children) {
      node.children.forEach((child) =>
        traverse(
          child,
          nestingLevel,
          inDecisionStructure || isDecisionNode
        )
      );
    }
  };
  

  traverse(ast);
  return complexity;
};



// Calculate Halstead Volume
const calculateHalsteadVolume = (ast) => {
  const operators = new Set();
  const operands = new Set();
  let operatorCount = 0;
  let operandCount = 0;

  const traverse = (node) => {
    const nodeType = getNodeType(node).toLowerCase();

    if (nodeType.endsWith('expressioncontext')) {
      // Operators
      const operatorText = node.getText();
      operators.add(operatorText);
      operatorCount++;
    } else if (nodeType === 'idexpressioncontext' || nodeType === 'literalcontext') {
      // Operands
      const operandText = node.getText();
      operands.add(operandText);
      operandCount++;
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(ast);

  const n1 = operators.size;
  const n2 = operands.size;
  const N1 = operatorCount;
  const N2 = operandCount;
  const vocabulary = n1 + n2;
  const length = N1 + N2;

  if (vocabulary === 0 || length === 0) {
    return 0;
  }

  const volume = length * Math.log2(vocabulary);
  return volume;
};


// Calculate Lines of Code
const calculateLinesOfCode = (ast) => {
  let loc = 0;

  if (ast.start && ast.stop) {
    loc = ast.stop.line - ast.start.line + 1;
  }

  return loc;
};


// Calculate Maintainability Index
const calculateMaintainabilityIndex = (cyclomaticComplexity, halsteadVolume, linesOfCode) => {
  if (linesOfCode === 0 || halsteadVolume === 0) {
    return 0;
  }

  let maintainabilityIndex =
    171 -
    5.2 * Math.log(linesOfCode) -
    0.23 * cyclomaticComplexity -
    16.2 * Math.log(halsteadVolume);

  // Normalize to 0-100
  maintainabilityIndex = Math.max(0, Math.min(100, maintainabilityIndex));
  return maintainabilityIndex;
};

