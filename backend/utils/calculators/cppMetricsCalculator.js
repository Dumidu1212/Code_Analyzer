// Main function to calculate C++ metrics
export const calculateCppMetrics = (ast) => {
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

// Helper function to get the node type using ruleIndex and parser.ruleNames for C++
const getNodeType = (node) => {
  const parser = node.parser;

  if (node.ruleIndex !== undefined && parser && parser.ruleNames) {
    return parser.ruleNames[node.ruleIndex];  // Map ruleIndex to rule name
  }

  if (node.symbol && node.symbol.type) {
    switch (node.symbol.type) {
      case 128: return 'identifier';
      case 87:  return 'variableInitializer';
      case 79:  return 'formalParameters';
      case 84:  return 'blockStatement';
      case 75:  return 'literal';
      case 102: return 'operator';
      case 27:  return 'primitiveType';
      case 132: return 'unqualifiedId';
      case 103: return 'shiftOperator';
      default:  return `symbol_type_${node.symbol.type}`;
    }
  }

  console.log('Unknown node type:', node);
  return 'undefined';
};

// Function to calculate Cyclomatic Complexity for C++
const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1; // Base complexity of 1 for the function itself

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);
    console.log('Visiting node type for Cyclomatic Complexity:', nodeType);

    const isControlFlowNode = (nodeType) => {
      return [
        'IfStatement', 'ForStatement', 'WhileStatement', 'DoStatement', 'SwitchStatement', 
        'CatchClause', 'ConditionalExpression', 'LogicalOrExpression', 'LogicalAndExpression',
        'FunctionCall'  // Add FunctionCall if recursion is part of control flow
      ].includes(nodeType);
    };

    if (isControlFlowNode(nodeType)) {
      console.log(`Found control flow node: ${nodeType}`);
      complexity++;  // Increase cyclomatic complexity for each control flow statement
    }

    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);
  return complexity;
};

// Function to calculate Cognitive Complexity for C++
const calculateCognitiveComplexity = (ast) => {
  let cognitiveComplexity = 0;

  const traverseAST = (node, depth = 0) => {
    const nodeType = getNodeType(node);
    console.log('Visiting node type for Cognitive Complexity:', nodeType);

    const isControlFlowNode = (nodeType) => {
      return [
        'IfStatement', 'ForStatement', 'WhileStatement', 'DoStatement', 'SwitchStatement', 
        'CatchClause', 'ConditionalExpression', 'LogicalOrExpression', 'LogicalAndExpression',
        'FunctionCall'  // Add FunctionCall if recursion is part of control flow
      ].includes(nodeType);
    };

    if (isControlFlowNode(nodeType)) {
      console.log(`Control Flow Node: ${nodeType}, Depth: ${depth}`);
      cognitiveComplexity += 1 + depth;  // Add 1 for each control structure and add depth for nesting
    }

    if (node.children) {
      node.children.forEach((child) => traverseAST(child, depth + (isControlFlowNode(nodeType) ? 1 : 0)));
    }
  };

  traverseAST(ast);
  return cognitiveComplexity;
};

// Function to calculate Halstead Volume for C++
const calculateHalsteadVolume = (ast) => {
  let operators = new Set();
  let operands = new Set();
  let operatorCount = 0;
  let operandCount = 0;

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);
    console.log('Visiting node type for Halstead Volume:', nodeType);

    const isOperatorNode = (nodeType) => {
      return ['operator', 'Plus', 'Minus', 'Multiply', 'Divide', 'Modulus', 'Assign', 'PlusPlus', 'MinusMinus', 'shiftOperator'].includes(nodeType);
    };

    const isOperandNode = (nodeType) => {
      return ['identifier', 'literal', 'IntegerLiteral', 'StringLiteral', 'BooleanLiteral', 'unqualifiedId'].includes(nodeType);
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

// Function to calculate Maintainability Index for C++
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
