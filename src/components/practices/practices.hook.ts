import { useCallback, useEffect, useReducer } from 'react';
import { useLocalStorageState } from '../common/local-storage.hook';
import { OptionStatus, PracticeStatus, SelectionOption } from '../practice/practice';
import { PracticesData } from './practices';

const arrSame = (arrA: any[], arrB: any[]) => {
  const intersection = arrA.filter((x) => arrB.includes(x));
  if (intersection.length !== arrA.length) {
    return false;
  }
  return true;
};

interface SubmitPracticeAction {
  type: 'submitPractice',
  payload: {
    id: number,
    selection: SelectionOption[]
  }
}

interface onSelectionChangeAction {
  type: 'onSelectionChange',
  payload: {
    id: number,
    selection: SelectionOption[]
  }
}

interface InitializationAction {
  type: 'setPractices',
  payload: PracticesData
}

const practiceReducer = (
  state: PracticesData,
  action: SubmitPracticeAction | InitializationAction | onSelectionChangeAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case 'submitPractice': {
      const practices = state;
      const { id, selection } = payload;
      const practice = practices[id];
      const { answers } = practice;

      const newSelection = selection.map((item, idx) => {
        if (answers.includes(idx)) {
          return { ...item, status: OptionStatus.CORRECT };
        } if (item.status === OptionStatus.SELECTED && !answers.includes(idx)) {
          return { ...item, status: OptionStatus.WRONG };
        }
        return item;
      });

      const selectedIndices = selection.reduce(
        (result: number[], curr, index) => (
          curr.status === OptionStatus.SELECTED ? result.concat(index) : result),
        [],
      );

      const practiceStatus = arrSame(selectedIndices, answers)
        ? PracticeStatus.CORRECT : PracticeStatus.WRONG;

      const newPractices = {
        ...practices,
        [id]: {
          ...practices[id],
          selection: newSelection,
          status: practiceStatus,
        },
      };
      return newPractices;
    }
    case 'onSelectionChange': {
      const { id, selection } = payload;
      const practices = state;
      const newPractices = {
        ...practices,
        [id]: {
          ...practices[id],
          selection,
        },
      };
      return newPractices;
    }
    case 'setPractices': {
      return payload;
    }
    /* istanbul ignore next */
    default:
      return state;
  }
};

export const usePractices = (
  initPractices: PracticesData,
) => {
  const [practices, dispatch] = useReducer(
    practiceReducer,
    initPractices,
  );

  // useCallback to memoize the function (during props drill) so that the list of practice component
  // will not rerender every practices state changed.
  const handleSubmit = useCallback((
    id: number,
    selection: SelectionOption[],
  ) => {
    dispatch({ type: 'submitPractice', payload: { id, selection } });
  }, []);

  const handleSelectionChange = useCallback((
    id: number,
    selection: SelectionOption[],
  ) => {
    dispatch({ type: 'onSelectionChange', payload: { id, selection } });
  }, []);

  const setPractices = (
    data: PracticesData,
  ) => {
    dispatch({ type: 'setPractices', payload: data });
  };

  return [practices, { handleSubmit, handleSelectionChange, setPractices }] as const;
};

/* istanbul ignore next */
export const usePracticesWithLocalStorage = (id: string, initPractices: PracticesData) => {
  const [storage, setStorage] = useLocalStorageState<PracticesData>(id, initPractices);
  const [practices, { handleSubmit, handleSelectionChange, setPractices }] = usePractices(storage);

  useEffect(() => {
    setStorage(practices);
  }, [practices]);

  const resetStorage = () => {
    setStorage({});
    setPractices({});
  };

  return [practices, {
    handleSubmit, handleSelectionChange, setPractices, resetStorage,
  }] as const;
};

export const isEmptyPractices = (data: PracticesData) => Object.keys(data).length === 0;
