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

// Helper function to get the node type for JavaScript
const getNodeType = (node) => {
  const parser = node.parser;

  // Check if the node has a ruleIndex and a parser with ruleNames to map it directly
  if (node.ruleIndex !== undefined && parser && parser.ruleNames) {
    return parser.ruleNames[node.ruleIndex];  // Map ruleIndex to rule name
  }

  // Handle symbol types based on JavaScript grammar
  if (node.symbol && node.symbol.type) {
    switch (node.symbol.type) {
      case 128:
        return 'identifier';
      case 84:
        return 'blockStatement';
      case 27:
        return 'primitiveType';
      case 87:
        return 'variableInitializer';
      case 79:
        return 'statement';
      case 75:
        return 'literal';
      case 102:
        return 'operator';
      case 90:
        return 'functionDeclaration';
      case 122:
        return 'identifier';
      case 123:
        return 'numericLiteral';
      case 108:
        return 'varModifier';
      case 88:
        return 'forStatement';
      case 94:
        return 'ifStatement';
      case 7:
        return 'arguments';
      case 115:
        return 'let_';
      case 9:
        return 'functionBody';
      case 35:
        return 'classOrInterfaceModifier';  
      case 80:
        return 'block';  
      case 14:
        return 'expressionStatement';  
      case 8:
        return 'singleExpression';  
      case 61:
        return 'arrowFunctionBody'; 
      case 19:
        return 'identifierName';  
      case 13:
        return 'numericLiteral';  
      case 12:
        return 'eos';  // End of statement
      case -1:
        return 'unknown';  // Handle invalid or negative symbol types
      case 11:
        return 'symbol_type_11'; 
      default:
        console.log(`Unknown symbol type: ${node.symbol.type}`);
        return `symbol_type_${node.symbol.type}`;
    }
  }

  console.log('Unknown node type or missing symbol:', node);
  return 'undefined';
};



// Function to calculate Cyclomatic Complexity
const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1;  // Start with a base complexity of 1

  const traverseAST = (node) => {
    const nodeType = getNodeType(node);
    console.log('Visiting node type for Cyclomatic Complexity:', nodeType);

    // Increment complexity for control flow structures
    const isControlFlowNode = (nodeType) => {
      return ['IfStatement', 'ForStatement', 'WhileStatement', 'TryStatement', 'CatchClause', 'functionDeclaration'].includes(nodeType);
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
    console.log('Visiting node type for Cognitive Complexity:', nodeType);

    // Increase cognitive complexity for nested control structures
    const isControlFlowNode = (nodeType) => {
      return ['IfStatement', 'ForStatement', 'WhileStatement', 'TryStatement', 'CatchClause', 'functionDeclaration', 'blockStatement'].includes(nodeType);
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
    console.log('Visiting node type for Halstead Volume:', nodeType);

    const isOperatorNode = (nodeType) => {
      return ['operator', 'Plus', 'Minus', 'Multiply', 'Divide', 'Modulus', 'Assign', 'PlusPlus', 'MinusMinus'].includes(nodeType);
    };

    const isOperandNode = (nodeType) => {
      return ['identifier', 'literal', 'numericLiteral', 'StringLiteral', 'BooleanLiteral'].includes(nodeType);
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

  console.log(`Vocabulary: ${vocabulary}, Length: ${length}`);
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
