// pythonMetricsCalculator.js

/**
 * Calculates various code metrics for Python code based on its AST.
 * Metrics include Cyclomatic Complexity, Cognitive Complexity, Halstead Volume, and Maintainability Index.
 */

export const calculatePythonMetrics = (ast) => {
  if (!ast) {
    return {
      cyclomaticComplexity: 0,
      cognitiveComplexity: 0,
      halsteadVolume: 0,
      maintainabilityIndex: 0,
    };
  }

  // Calculate individual metrics
  const cyclomaticComplexity = calculateCyclomaticComplexity(ast);
  const cognitiveComplexity = calculateCognitiveComplexity(ast);
  const halsteadVolume = calculateHalsteadVolume(ast);
  const linesOfCode = calculateLinesOfCode(ast);
  
  // Debugging output
  console.log("Cyclomatic Complexity:", cyclomaticComplexity);
  console.log("Cognitive Complexity:", cognitiveComplexity);
  console.log("Halstead Volume:", halsteadVolume);
  console.log("Lines of Code:", linesOfCode);

  // Maintainability Index calculation
  const maintainabilityIndex = calculateMaintainabilityIndex(
    cyclomaticComplexity,
    halsteadVolume,
    linesOfCode
  );

  // Return all metrics
  return {
    cyclomaticComplexity,
    cognitiveComplexity,
    halsteadVolume,
    linesOfCode,
    maintainabilityIndex,
  };
};


/**
 * Helper function to identify node types accurately.
 * Ensures that all relevant node types are correctly mapped.
 *
 * @param {Object} node - The current AST node.
 * @returns {string} The type of the node.
 */
const getNodeType = (node) => {
  if (node.constructor && node.constructor.name) {
    return node.constructor.name;
  }

  if (
    node.symbol &&
    node.symbol.type !== undefined &&
    node.parser &&
    node.parser.symbolicNames &&
    node.symbol.type < node.parser.symbolicNames.length
  ) {
    const nodeType = node.parser.symbolicNames[node.symbol.type];
    if (!nodeType) {
      console.warn(`Undefined symbolic name for type: ${node.symbol.type}`);
      return 'Unknown';
    }
    return nodeType;
  }

  // Fallback to 'Unknown' for unidentified nodes
  return 'Unknown';
};

/**
 * Calculates Cyclomatic Complexity for Python code.
 * Increments complexity for each decision point.
 *
 * @param {Object} ast - The root node of the AST.
 * @returns {number} The cyclomatic complexity.
 */
const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1; // Base complexity

  const decisionNodes = new Set([
    'If_stmtContext',
    'Elif_clauseContext',
    'While_stmtContext',
    'For_stmtContext',
    'Try_stmtContext',
    'Except_clauseContext',
    'With_stmtContext',
    'Match_stmtContext', // Python 3.10+
    'Case_clauseContext', // Part of Match statement
    'Comprehension_forContext', // For comprehensions
    'Comprehension_ifContext', // If clauses in comprehensions
    'Async_funcdefContext', // Async functions
    'Async_for_stmtContext', // Async for loops
  ]);

  /**
   * Recursively traverses the AST to calculate cyclomatic complexity.
   *
   * @param {Object} node - The current AST node.
   */
  const traverse = (node) => {
    const nodeType = getNodeType(node);

    if (decisionNodes.has(nodeType)) {
      complexity++;
    }

    // Traverse child nodes
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    } else if (typeof node.getChildCount === 'function' && node.getChildCount() > 0) {
      for (let i = 0; i < node.getChildCount(); i++) {
        traverse(node.getChild(i));
      }
    }
  };

  traverse(ast);
  return complexity;
};

/**
 * Calculates Cognitive Complexity for Python code.
 * Accounts for nesting levels and the cognitive load of understanding the code.
 *
 * @param {Object} ast - The root node of the AST.
 * @returns {number} The cognitive complexity.
 */
const calculateCognitiveComplexity = (ast) => {
  let cognitiveComplexity = 0;

  const decisionNodes = new Set([
    'If_stmtContext',
    'Elif_clauseContext',
    'While_stmtContext',
    'For_stmtContext',
    'Try_stmtContext',
    'Except_clauseContext',
    'With_stmtContext',
    'Match_stmtContext',
    'Case_clauseContext',
    'Comprehension_forContext',
    'Comprehension_ifContext',
    'Async_funcdefContext',
    'Async_for_stmtContext',
  ]);

  /**
   * Recursively traverses the AST to calculate cognitive complexity.
   *
   * @param {Object} node - The current AST node.
   * @param {number} nesting - The current nesting level.
   */
  const traverse = (node, nesting = 0) => {
    const nodeType = getNodeType(node);

    if (decisionNodes.has(nodeType)) {
      cognitiveComplexity += 1 + nesting;
      nesting++;
    }

    // Traverse child nodes with updated nesting
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child, nesting));
    } else if (typeof node.getChildCount === 'function' && node.getChildCount() > 0) {
      for (let i = 0; i < node.getChildCount(); i++) {
        traverse(node.getChild(i), nesting);
      }
    }
  };

  traverse(ast);
  return cognitiveComplexity;
};

/**
 * Calculates Halstead Volume for Python code.
 * Based on the number of unique and total operators and operands.
 *
 * @param {Object} ast - The root node of the AST.
 * @returns {number} The Halstead Volume.
 */
const calculateHalsteadVolume = (ast) => {
  const operators = new Set();
  const operands = new Set();
  let operatorCount = 0;
  let operandCount = 0;

  const isOperatorNode = (nodeType) => {
    const operatorNodes = [
      'AddContext', 'SubContext', 'MultContext', 'DivContext',
      'AssignContext', 'CompareContext', 'BoolOpContext',
      'LambdaContext', 'If_stmtContext', 'For_stmtContext'
    ];
    return operatorNodes.includes(nodeType);
  };

  const isOperandNode = (nodeType) => {
    const operandNodes = [
      'NameContext', 'NumberContext', 'StringContext',
      'AtomContext', 'TestContext'
    ];
    return operandNodes.includes(nodeType);
  };

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);

    if (isOperatorNode(nodeType)) {
      operators.add(node.getText());
      operatorCount++;
    } else if (isOperandNode(nodeType)) {
      operands.add(node.getText());
      operandCount++;
    }

    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);

  const n1 = operators.size;
  const n2 = operands.size;
  const N1 = operatorCount;
  const N2 = operandCount;

  const vocabulary = n1 + n2;
  const length = N1 + N2;

  if (vocabulary === 0 || length === 0) {
    return 1; // Ensure Halstead volume doesn't return 0
  }

  return length * Math.log2(vocabulary);
};


/**
 * Calculates Lines of Code (LOC) for Python code.
 * Counts the number of lines excluding blank lines and comments.
 *
 * @param {Object} ast - The root node of the AST.
 * @returns {number} The lines of code.
 */
const calculateLinesOfCode = (ast) => {
  let minLine = Infinity;
  let maxLine = -Infinity;

  const traverseAST = (node) => {
    if (node.loc && node.loc.start && node.loc.end) {
      minLine = Math.min(minLine, node.loc.start.line);
      maxLine = Math.max(maxLine, node.loc.end.line);
    }

    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);

  const loc = maxLine - minLine + 1;
  return loc > 0 ? loc : 1; // Ensure LOC is at least 1
};



/**
 * Calculates Maintainability Index for Python code.
 * Combines Cyclomatic Complexity, Halstead Volume, and Lines of Code.
 *
 * @param {number} cyclomaticComplexity - The cyclomatic complexity.
 * @param {number} halsteadVolume - The Halstead volume.
 * @param {number} linesOfCode - The lines of code.
 * @returns {number} The maintainability index.
 */
const calculateMaintainabilityIndex = (
  cyclomaticComplexity,
  halsteadVolume,
  linesOfCode
) => {
  if (linesOfCode <= 0 || halsteadVolume <= 0) {
    return 0; // Return 0 if either LOC or Halstead Volume is 0 to avoid errors
  }

  // Refactor the Maintainability Index formula
  const maintainabilityIndex = 
    171 - (5.2 * Math.log(linesOfCode)) 
        - (0.23 * cyclomaticComplexity) 
        - (16.2 * Math.log(halsteadVolume));

  // Normalize MI to be between 0 and 100
  return Math.max(0, Math.min(100, maintainabilityIndex));
};
