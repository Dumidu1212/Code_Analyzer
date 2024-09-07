import { InputStream, CommonTokenStream } from 'antlr4';
import JavaScriptLexer from './grammars/JavaScriptLexer.js';
import JavaScriptParser from './grammars/JavaScriptParser.js';

export const parseJavaScriptCode = (code) => {
  const inputStream = new InputStream(code);
  const lexer = new JavaScriptLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new JavaScriptParser(tokenStream);
  parser.buildParseTrees = true;

  const tree = parser.program();  
  return tree;
};