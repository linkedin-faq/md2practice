import { readFileSync } from 'fs';
import { marked } from 'marked';
import { resolve } from 'path';

export const mockMarkdown = (filename: string) => readFileSync(resolve(__dirname, filename), 'utf-8');

export const getPracticeByIndex = (lexer: marked.TokensList, index: number) => {
  let chunk: marked.Token[] = [];
  const practices = lexer.reduce((result:marked.Token[][], token, idx) => {
    if (chunk.length > 0 && token.type === 'heading' && token.depth === 4) {
      result.push(chunk);
      chunk = [];
    }
    chunk.push(token);

    if (idx + 1 === lexer.length) {
      result.push(chunk);
    }
    return result;
  }, []);
  return practices[index] as marked.TokensList;
};
