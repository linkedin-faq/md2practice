import { Chance } from 'chance';
import {
  OptionStatus, PracticeParams, PracticeStatus, SelectionOption,
} from '../practice';

const chance = new Chance();

export const mockedQuestion = () => chance.string();

export const mockedSelection = (
  totalOptions: number = 4,
): SelectionOption[] => Array.from({ length: totalOptions }, () => ({
  rawOption: chance.string(),
  status: OptionStatus.IDLE,
}));

export const mockedPractice = (
  selection: SelectionOption[],
  isMultiple: boolean = false,
): PracticeParams => {
  const range = { min: 0, max: selection.length - 1 };
  return {
    rawQuestion: mockedQuestion(),
    selection,
    answers: isMultiple
      ? chance.unique(chance.natural, 2, range)
      : chance.unique(chance.natural, 1, range),
    status: PracticeStatus.IDLE,
  };
};
