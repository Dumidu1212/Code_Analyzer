// parsePythonCode.js

import antlr4 from 'antlr4';
import Python3Lexer from './grammars/Python3Lexer.js';
import Python3Parser from './grammars/Python3Parser.js';

/**
 * Parses Python code into an Abstract Syntax Tree (AST) using ANTLR.
 *
 * @param {string} code - The Python code to parse.
 * @returns {Object} The root node of the AST.
 */
export const parsePythonCode = (code) => {
  const inputStream = new antlr4.InputStream(code);
  const lexer = new Python3Lexer(inputStream);
  const tokenStream = new antlr4.CommonTokenStream(lexer);
  const parser = new Python3Parser(tokenStream);
  parser.buildParseTrees = true;
  const tree = parser.file_input();

  // Attach parser and symbolicNames to nodes for accurate type identification
  attachParserInfo(tree, parser);

  return tree;
};

/**
 * Recursively attaches parser and symbolicNames to each node in the AST.
 *
 * @param {Object} node - The current AST node.
 * @param {Object} parser - The ANTLR parser instance.
 */
const attachParserInfo = (node, parser) => {
  node.parser = parser;
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => attachParserInfo(child, parser));
  }
};
