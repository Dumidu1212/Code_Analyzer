export const calculateJavaScriptMetrics = (ast) => {
  if (!ast) {
    return {
      cyclomaticComplexity: 0,
      cognitiveComplexity: 0,
      maintainabilityIndex: 0,
      halsteadVolume: 0,
    };
  }

  // Ensure loc information is added if missing
  traverseASTWithLocation(ast);

  // Compute individual metrics
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

// Traverse AST and add location info if missing
const traverseASTWithLocation = (node) => {
  if (!node.loc && node.start && node.stop) {
    node.loc = {
      start: { line: node.start.line, column: node.start.column },
      end: { line: node.stop.line, column: node.stop.column },
    };
  }

  if (node.children) {
    node.children.forEach(traverseASTWithLocation);
  }
};

// Helper function to identify node type
const getNodeType = (node) => {
  if (node.constructor && node.constructor.name) {
    return node.constructor.name;
  }

  if (
    node.symbol &&
    node.symbol.type !== undefined &&
    node.parser &&
    node.parser.symbolicNames
  ) {
    return node.parser.symbolicNames[node.symbol.type];
  }

  return 'Unknown';
};

// Calculate Cyclomatic Complexity for JavaScript
const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1; // Start with base complexity

  const isDecisionNode = (nodeType) => {
    return [
      'IfStatementContext',
      'ForStatementContext',
      'WhileStatementContext',
      'SwitchStatementContext',
      'CaseClauseContext',
      'CatchClauseContext',
      'FunctionDeclarationContext',
      'ArrowFunctionContext',
      'DoWhileStatementContext',
    ].includes(nodeType);
  };

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);
    if (isDecisionNode(nodeType)) {
      complexity++;
    }

    // Traverse children nodes
    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);
  return complexity;
};

// Calculate Cognitive Complexity for JavaScript
const calculateCognitiveComplexity = (ast) => {
  let cognitiveComplexity = 0;

  const isDecisionNode = (nodeType) => {
    return [
      'IfStatementContext',
      'ForStatementContext',
      'WhileStatementContext',
      'SwitchStatementContext',
      'CaseClauseContext',
      'CatchClauseContext',
      'FunctionDeclarationContext',
      'ArrowFunctionContext',
      'DoWhileStatementContext',
    ].includes(nodeType);
  };

  const traverseAST = (node, depth = 0) => {
    const nodeType = getNodeType(node);
    if (isDecisionNode(nodeType)) {
      cognitiveComplexity += 1 + depth; // Increment for control flow and nesting
      depth++;
    }

    // Traverse children nodes
    if (node.children) {
      node.children.forEach((child) => traverseAST(child, depth));
    }
  };

  traverseAST(ast);
  return cognitiveComplexity;
};

// Calculate Halstead Volume for JavaScript
const calculateHalsteadVolume = (ast) => {
  const operators = new Set();
  const operands = new Set();
  let operatorCount = 0;
  let operandCount = 0;

  const isOperatorNode = (nodeType) => {
    return [
      'BinaryExpressionContext',
      'UnaryExpressionContext',
      'AssignmentExpressionContext',
      'UpdateExpressionContext',
      'LogicalExpressionContext',
    ].includes(nodeType);
  };

  const isOperandNode = (nodeType) => {
    return [
      'IdentifierContext',
      'LiteralContext',
      'NumericLiteralContext',
      'StringLiteralContext',
      'BooleanLiteralContext',
    ].includes(nodeType);
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
    return 0;
  }

  return length * Math.log2(vocabulary);
};

// Calculate Lines of Code for JavaScript
const calculateLinesOfCode = (ast) => {
  let minLine = Infinity;
  let maxLine = -Infinity;

  const traverseAST = (node) => {
    if (node.loc) {
      minLine = Math.min(minLine, node.loc.start.line);
      maxLine = Math.max(maxLine, node.loc.end.line);
    }

    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);

  const loc = maxLine - minLine + 1;
  return loc > 0 ? loc : 0;
};

// Calculate Maintainability Index for JavaScript
const calculateMaintainabilityIndex = (cyclomaticComplexity, halsteadVolume, linesOfCode) => {
  if (linesOfCode <= 0 || halsteadVolume <= 0) {
    return 0;
  }

  const mi = 171 - 5.2 * Math.log(linesOfCode) - 0.23 * cyclomaticComplexity - 16.2 * Math.log(halsteadVolume);
  return Math.max(0, Math.min(100, mi));
};
