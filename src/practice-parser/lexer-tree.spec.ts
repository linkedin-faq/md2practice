import { marked } from 'marked';
import { LexerTree, wrapLexerTokens } from './lexer-tree';
import { getPracticeByIndex, mockMarkdown } from './__mocks__/mock-markdown';

describe('marked parser', () => {
  const lexer = marked.lexer(mockMarkdown('lexer-tree.md'));

  it('reduce function is working, add all codespan count.', () => {
    const data = wrapLexerTokens(getPracticeByIndex(lexer, 0));

    function sumCodespan(result: number, item: marked.Token) {
      return result + ((item.type === 'codespan') ? 1 : 0);
    }
    const total = LexerTree.reduce(sumCodespan, 0, data);
    expect(total).toBe(4);
  });
  it('map function is working', () => {
    const data = wrapLexerTokens(getPracticeByIndex(lexer, 0));
    function addChildCount(node: marked.Tokens.Generic) {
      const count = node.tokens?.length || 0;
      return {
        ...node,
        childCount: count,
      };
    }
    const tree = LexerTree.map(addChildCount, data);
    const childNode = (tree.tokens ? tree.tokens[0] : {}) as {childCount: number};
    expect(childNode.childCount).toBe(1);
  });
});
