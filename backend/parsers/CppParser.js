import { InputStream, CommonTokenStream } from 'antlr4';
import CPP14Lexer from './grammars/CPP14Lexer.js';
import CPP14Parser from './grammars/CPP14Parser.js';

export const parseCppCode = (code) => {
  const inputStream = new InputStream(code);
  const lexer = new CPP14Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CPP14Parser(tokenStream);
  parser.buildParseTrees = true;

  const tree = parser.translationUnit();  
  return tree;
};