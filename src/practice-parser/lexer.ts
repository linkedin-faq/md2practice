import { marked } from 'marked';
import {
  OptionStatus, PracticeParams, PracticeStatus, SelectionOption,
} from '../components/practice/practice';
import { PracticesData } from '../components/practices/practices';

const parseQuestion = (lexerData: marked.TokensList) => {
  const startIdx = lexerData.findIndex((item) => item.type === 'heading' && item.depth === 4);
  const endIdx = lexerData.findIndex((item) => item.type === 'list');
  return lexerData.slice(startIdx, endIdx).map((item) => item.raw).join('');
};

const isAnswer = (item: marked.Tokens.ListItem) => {
  if (item.checked) {
    return true;
  }
  if (item.raw.slice(0, 5).includes('- [x]')) {
    return true;
  }
  return false;
};

const parseSelectionAndAnswers = (lexerData: marked.TokensList) => {
  const selection: SelectionOption[] = [];
  const answers: number[] = [];
  const list = lexerData.find((item) => item.type === 'list') as marked.Tokens.List;
  if (list) {
    list.items.forEach((item, idx) => {
      if (isAnswer(item)) {
        answers.push(idx);
      }
      const cleanRaw = item.raw.replace('- [ ]', '').replace('- [x]', '');
      selection.push({ rawOption: cleanRaw, status: OptionStatus.IDLE });
    });
  } else {
    throw new Error('No selection found.');
  }
  return { selection, answers };
};

export const parsePractice = (lexerData: marked.TokensList): PracticeParams => {
  const question = parseQuestion(lexerData);
  const { selection, answers } = parseSelectionAndAnswers(lexerData);
  const result = {
    rawQuestion: question,
    selection,
    answers,
    status: PracticeStatus.IDLE,
  };
  return result;
};

export const parsePractices = (lexer: marked.TokensList): PracticeParams[] => {
  let chunk: marked.Token[] = [];
  const lexerPractices = lexer.reduce((result:marked.Token[][], token, idx) => {
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

  const practices = lexerPractices.reduce((result, curr) => {
    try {
      const practice = parsePractice(curr as marked.TokensList);
      if (practice.answers.length < 1) {
        throw new Error('No answer found.');
      }
      return [...result, practice];
    } catch (e) {
      return result;
    }
  }, [] as PracticeParams[]);
  return practices;
};

export const withId = (
  data: PracticeParams[],
): PracticesData => data.reduce((result, curr, idx) => ({
  ...result,
  [idx]: curr,
}), {});
