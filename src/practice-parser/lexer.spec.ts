import { marked } from 'marked';
import { parsePractice, parsePractices, withId } from './lexer';
import { getPracticeByIndex, mockMarkdown } from './__mocks__/mock-markdown';

describe('marked parser', () => {
  const mockedLexer = marked.lexer(mockMarkdown('lexer-mock.md'));
  it('should be able to parse question section by using first selection list as stopping point', () => {
    const mockPracticeLexer = getPracticeByIndex(mockedLexer, 0);
    const { rawQuestion } = parsePractice(mockPracticeLexer);
    expect(rawQuestion).toMatchInlineSnapshot(`
      "#### Q0. Question with different content?

      ![image1](https://wwww.imageurl.com)
      ![image2](https://wwww.imageurl.com)
      ![image3](https://wwww.imageurl.com)
      \`with-codespan 1\`
      \`with-codespan 2\`
      \`with-codespan 3\`
      \`\`\`javascript
      const data = null
      \`\`\`
      \`\`\`javascript
      const data = null
      \`\`\`

      "
      `);
  });

  it('should be able to get normal selection and its answers', () => {
    const mockPracticeLexer = getPracticeByIndex(mockedLexer, 1);
    const { selection, answers } = parsePractice(mockPracticeLexer);
    expect(selection).toHaveLength(4);
    expect(answers).toEqual([2]);
  });

  it('should be able to get code selection and its answers', () => {
    const mockPracticeLexer = getPracticeByIndex(mockedLexer, 2);
    const { selection, answers } = parsePractice(mockPracticeLexer);
    expect(selection).toHaveLength(4);
    expect(answers).toEqual([0]);
  });

  it('should be able to throw error if no selection is found', () => {
    const mockPracticeLexer = getPracticeByIndex(mockedLexer, 3);
    expect(() => parsePractice(mockPracticeLexer)).toThrowError(new Error('No selection found.'));
  });

  it('should be able to parse multiple practice from an array', () => {
    const mockedPractices = parsePractices(mockedLexer);
    expect(mockedPractices).toHaveLength(3);
  });

  it('should be able to return with index as the practice id', () => {
    const mockedPractices = parsePractices(mockedLexer);
    const mockedPracticesWithId = withId(mockedPractices);
    expect(Object.keys(mockedPracticesWithId)).toEqual(['0', '1', '2']);
  });
});
