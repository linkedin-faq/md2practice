import { withId } from '../../../practice-parser/lexer';
import { mockedPractice, mockedSelection } from '../../practice/__mocks__/data.mock';

export const mockedPractices = (length: number) => {
  const practices = Array.from({ length }, () => mockedPractice(mockedSelection(4)));
  return withId(practices);
};
