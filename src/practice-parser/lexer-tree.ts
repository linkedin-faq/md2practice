import { marked } from 'marked';
import { curry } from 'ramda';

// Reference: https://jrsinclair.com/articles/2019/functional-js-traversing-trees-with-recursive-reduce/

type Generic = marked.Tokens.Generic

function hasChildren(node: Generic) {
  return (typeof node === 'object')
      && (typeof node.tokens !== 'undefined')
      && (node.tokens.length > 0);
}

export function wrapLexerTokens(tokens: marked.TokensList) {
  return {
    type: 'root',
    tokens: [...tokens],
  } as marked.Tokens.Generic;
}

export const LexerTree = {
  reduce: curry((reducerFn: Function, init: unknown, node: Generic): unknown => {
    const acc = reducerFn(init, node);
    if (!hasChildren(node)) {
      return acc;
    }
    return node.tokens?.reduce(LexerTree.reduce(reducerFn), acc);
  }),
  map: curry((mapFn: Function, node: Generic): Generic => {
    const newNode = mapFn(node);
    if (!hasChildren(node)) {
      return newNode;
    }
    newNode.tokens = node.tokens?.map((item) => LexerTree.map(mapFn)(item));
    return newNode;
  }),
};
