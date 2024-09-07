import { InputStream, CommonTokenStream } from 'antlr4';
import JavaLexer from './grammars/JavaLexer.js';
import JavaParser from './grammars/JavaParser.js';

export const parseJavaCode = (code) => {
  const inputStream = new InputStream(code);
  const lexer = new JavaLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new JavaParser(tokenStream);
  parser.buildParseTrees = true;

  const tree = parser.compilationUnit(); 
  return tree;
};