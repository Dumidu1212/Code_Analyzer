export const calculatePythonMetrics = (ast) => {
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

  return {
    cyclomaticComplexity: calculateCyclomaticComplexity(ast),
    cognitiveComplexity: calculateCognitiveComplexity(ast),
    maintainabilityIndex: calculateMaintainabilityIndex(ast),
    halsteadVolume: calculateHalsteadVolume(ast),
  };
};

// Ensure loc (location) is available on all nodes
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

// Helper function to get the node type using ruleIndex and parser.ruleNames for Python
const getNodeType = (node) => {
  const parser = node.parser;

  if (node.ruleIndex !== undefined && parser && parser.ruleNames) {
    return parser.ruleNames[node.ruleIndex];  // Map ruleIndex to rule name
  }

  if (node.symbol && node.symbol.type) {
    switch (node.symbol.type) {
      case 45:
        return 'name';
      case 63:
        return 'testlist_star_expr';
      case 77:
        return 'symbol_type_77';
      case 78:
        return 'symbol_type_78';
      case 54:
        return 'trailer';
      case 57:
        return 'arglist';
      case 59:
        return 'argument';
      case 4:
        return 'literal';
      case 44:
        return 'stmt';
      case 22:
        return 'for_stmt';
      case 25:
        return 'if_stmt';
      case 60:
        return 'block';
      case 88:
        return 'augassign';
      case -1:
        return 'undefined';
      default:
        return `symbol_type_${node.symbol.type}`;
    }
  }

  console.log('Unknown node type:', node);
  return 'undefined';
};

// Function to calculate Cyclomatic Complexity
const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1;  // Start with a base complexity of 1

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);

    const isControlFlowNode = (nodeType) => {
      return ['if_stmt', 'for_stmt', 'while_stmt', 'try_stmt', 'except_clause'].includes(nodeType);
    };

    if (isControlFlowNode(nodeType)) {
      complexity++;
    }

    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);
  return complexity;
};

// Function to calculate Cognitive Complexity
const calculateCognitiveComplexity = (ast) => {
  let cognitiveComplexity = 0;

  const traverseAST = (node, depth = 0) => {
    const nodeType = getNodeType(node);

    const isControlFlowNode = (nodeType) => {
      return ['if_stmt', 'for_stmt', 'while_stmt', 'try_stmt', 'except_clause'].includes(nodeType);
    };

    if (isControlFlowNode(nodeType)) {
      cognitiveComplexity += 1 + depth;
    }

    if (node.children) {
      node.children.forEach((child) => traverseAST(child, depth + (isControlFlowNode(nodeType) ? 1 : 0)));
    }
  };

  traverseAST(ast);
  return cognitiveComplexity;
};

// Function to calculate Halstead Volume
const calculateHalsteadVolume = (ast) => {
  let operators = new Set();
  let operands = new Set();
  let operatorCount = 0;
  let operandCount = 0;

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);

    const isOperatorNode = (nodeType) => {
      return ['binary_expr', 'unary_expr', 'assign_stmt', 'augassign', 'operator'].includes(nodeType);
    };

    const isOperandNode = (nodeType) => {
      return ['name', 'literal'].includes(nodeType);
    };

    if (isOperatorNode(nodeType)) {
      operators.add(node.operator || nodeType);
      operatorCount++;
    } else if (isOperandNode(nodeType)) {
      operands.add(node.name || node.value || nodeType);
      operandCount++;
    }

    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);

  const vocabulary = operators.size + operands.size;
  const length = operatorCount + operandCount;

  if (vocabulary === 0 || length === 0) {
    return 0;
  }

  return length * Math.log2(vocabulary);
};

// Function to calculate Maintainability Index
const calculateMaintainabilityIndex = (ast) => {
  const cyclomaticComplexity = calculateCyclomaticComplexity(ast);
  const linesOfCode = ast.loc ? (ast.loc.end.line - ast.loc.start.line + 1) : 0;

  if (linesOfCode <= 0) {
    return 0;
  }

  const halsteadVolume = calculateHalsteadVolume(ast);
  if (halsteadVolume <= 0) {
    return 0;
  }

  const maintainabilityIndex = 171 - 5.2 * Math.log(linesOfCode) - 0.23 * cyclomaticComplexity - 16.2 * Math.log(halsteadVolume);
  return Math.max(0, Math.min(100, maintainabilityIndex));
};
