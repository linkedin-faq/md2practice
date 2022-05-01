import { renderHook, act, RenderResult } from '@testing-library/react-hooks';
import { OptionStatus, PracticeStatus } from '../practice/practice';
import { PracticesData } from './practices';
import { usePractices } from './practices.hook';
import { mockedPractices } from './__mocks__/practices.mock';

describe('Practices hook', () => {
  const initPractices = mockedPractices(3);
  const getCurrentValue = (
    result: RenderResult<ReturnType<typeof usePractices>>,
  ) => result.current[0];
  const getHandleSubmit = (
    result: RenderResult<ReturnType<typeof usePractices>>,
  ) => result.current[1].handleSubmit;
  const getHandleSelectionChange = (
    result: RenderResult<ReturnType<typeof usePractices>>,
  ) => result.current[1].handleSelectionChange;

  it('should be able to set the practices state', () => {
    const { result } = renderHook(() => usePractices(initPractices));
    const newMockedPractice = mockedPractices(4);
    act(() => {
      result.current[1].setPractices(newMockedPractice);
    });
    expect(Object.keys(getCurrentValue(result))).toHaveLength(4);
  });

  it('should be able to change the selection state', () => {
    const { result } = renderHook(() => usePractices(initPractices));
    const practiceId = 0;
    const practice = getCurrentValue(result)[practiceId];
    const selection = [...practice.selection];
    selection[0].status = OptionStatus.SELECTED;
    act(() => {
      getHandleSelectionChange(result)(practiceId, selection);
    });
    expect(getCurrentValue(result)[practiceId].selection).toMatchObject(selection);
  });

  describe('should be able to submit result to change practices state, for radio option', () => {
    it('correct selection', () => {
      const practices: PracticesData = {
        ...initPractices,
        0: {
          ...initPractices[0],
          answers: [0],
        },
      };
      const { result } = renderHook(() => usePractices(practices));
      act(() => {
        const selected = practices[0].selection;
        selected[0].status = OptionStatus.SELECTED;
        getHandleSubmit(result)(0, selected);
      });
      expect(getCurrentValue(result)[0].status).toEqual(PracticeStatus.CORRECT);
    });

    it('wrong selection', () => {
      const practices: PracticesData = {
        ...initPractices,
        0: {
          ...initPractices[0],
          answers: [0],
        },
      };
      const { result } = renderHook(() => usePractices(practices));
      act(() => {
        const selected = practices[0].selection;
        selected[1].status = OptionStatus.SELECTED;
        getHandleSubmit(result)(0, selected);
      });
      expect(getCurrentValue(result)[0].status).toEqual(PracticeStatus.WRONG);
    });
  });

  describe('should be able to submit result to change practices state, for checkbox option', () => {
    it('correct selection', () => {
      const practices: PracticesData = {
        ...initPractices,
        0: {
          ...initPractices[0],
          answers: [0, 1],
        },
      };
      const { result } = renderHook(() => usePractices(practices));
      act(() => {
        const selected = practices[0].selection;
        selected[0].status = OptionStatus.SELECTED;
        selected[1].status = OptionStatus.SELECTED;
        getHandleSubmit(result)(0, selected);
      });
      expect(getCurrentValue(result)[0].status).toEqual(PracticeStatus.CORRECT);
    });

    it('wrong selection', () => {
      const practices: PracticesData = {
        ...initPractices,
        0: {
          ...initPractices[0],
          answers: [0, 1],
        },
      };
      const { result } = renderHook(() => usePractices(practices));
      act(() => {
        const selected = practices[0].selection;
        selected[2].status = OptionStatus.SELECTED;
        selected[3].status = OptionStatus.SELECTED;
        getHandleSubmit(result)(0, selected);
      });
      expect(getCurrentValue(result)[0].status).toEqual(PracticeStatus.WRONG);
    });
  });
});
