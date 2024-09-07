import { InputStream, CommonTokenStream } from 'antlr4';
import Python3Lexer from './grammars/Python3Lexer.js';
import Python3Parser from './grammars/Python3Parser.js';

export const parsePythonCode = (code) => {
  const inputStream = new InputStream(code);
  const lexer = new Python3Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Python3Parser(tokenStream);
  parser.buildParseTrees = true;

  const tree = parser.file_input();  
  return tree;
};