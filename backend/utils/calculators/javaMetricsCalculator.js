export const calculateJavaMetrics = (ast) => {
  if (!ast) {
    return {
      cyclomaticComplexity: 0,
      cognitiveComplexity: 0,
      maintainabilityIndex: 0,
      halsteadVolume: 0,
    };
  }

  traverseASTWithLocation(ast);

  return {
    cyclomaticComplexity: calculateCyclomaticComplexity(ast),
    cognitiveComplexity: calculateCognitiveComplexity(ast),
    maintainabilityIndex: calculateMaintainabilityIndex(ast),
    halsteadVolume: calculateHalsteadVolume(ast),
  };
};

// Traverse AST to ensure location info is available
const traverseASTWithLocation = (node) => {
  const nodeType = getNodeType(node);
  console.log(`Visiting node type: ${nodeType}`);

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


// Helper function to identify node types
const getNodeType = (node) => {
  const parser = node.parser;

  if (node.ruleIndex !== undefined && parser && parser.ruleNames) {
    return parser.ruleNames[node.ruleIndex]; 
  }

  // Handle symbol types based on Java grammar
  if (node.symbol && node.symbol.type) {
    switch (node.symbol.type) {
      case 128: return 'identifier';
      case 87:  return 'variableInitializer';
      case 79:  return 'formalParameters';
      case 84:  return 'blockStatement';
      case 75:  return 'literal';
      case 102: return 'operator';
      case 27:  return 'primitiveType';
      case 22:  return 'parExpression';
      case 15:  return 'statement';
      case 67:  return 'integerLiteral';
      case 81:  return 'blockStatement';
      case 78:  return 'formalParameters';
      case 36:  return 'statement';
      case 88:  return 'ifStatement';  
      case 89:  return 'elseStatement';  
      case 90:  return 'elseIfStatement';  
      default:
        console.log(`Unknown symbol type: ${node.symbol.type}`);
        return `symbol_type_${node.symbol.type}`;
    }
  }

  console.log('Unknown node type:', node);
  return 'undefined';
};



// Function to calculate Cyclomatic Complexity for Java
const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1;  // Start with a base complexity of 1

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);
    console.log('Visiting node type for Cyclomatic Complexity:', nodeType);

    const isControlFlowNode = (nodeType) => {
      return ['ifStatement', 'elseStatement', 'elseIfStatement', 'forStatement', 'whileStatement', 'switchStatement', 'catchClause'].includes(nodeType);
    };

    if (isControlFlowNode(nodeType)) {
      complexity++;  // Increase complexity for control flow nodes
    }

    if (node.children) {
      node.children.forEach(traverseAST);
    }
  };

  traverseAST(ast);
  return complexity;
};


// Function to calculate Cognitive Complexity for Java
const calculateCognitiveComplexity = (ast) => {
  let cognitiveComplexity = 0;

  const traverseAST = (node, depth = 0) => {
    const nodeType = getNodeType(node);
    console.log('Visiting node type for Cognitive Complexity:', nodeType);

    const isControlFlowNode = (nodeType) => {
      return ['ifStatement', 'elseStatement', 'elseIfStatement', 'forStatement', 'whileStatement', 'switchStatement', 'catchClause'].includes(nodeType);
    };

    if (isControlFlowNode(nodeType)) {
      cognitiveComplexity += 1 + depth;  // Add depth for nesting
    }

    if (node.children) {
      node.children.forEach((child) => traverseAST(child, depth + (isControlFlowNode(nodeType) ? 1 : 0)));
    }
  };

  traverseAST(ast);
  return cognitiveComplexity;
};


// Function to calculate Halstead Volume for Java
const calculateHalsteadVolume = (ast) => {
  let operators = new Set();
  let operands = new Set();
  let operatorCount = 0;
  let operandCount = 0;

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);
    console.log('Visiting node type for Halstead Volume:', nodeType);

    const isOperatorNode = (nodeType) => {
      return ['operator', 'Plus', 'Minus', 'Multiply', 'Divide', 'Modulus', 'Assign', 'PlusPlus', 'MinusMinus',
        'symbol_type_103', 'symbol_type_86', 'symbol_type_21', 'symbol_type_78'].includes(nodeType);
    };

    const isOperandNode = (nodeType) => {
      return ['identifier', 'literal', 'IntegerLiteral', 'StringLiteral', 'BooleanLiteral',
        'symbol_type_128', 'symbol_type_67', 'symbol_type_123', 'symbol_type_82', 'symbol_type_83'].includes(nodeType);
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

// Function to calculate Maintainability Index for Java
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
