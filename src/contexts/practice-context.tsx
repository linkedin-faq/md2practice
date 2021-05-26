import * as React from "react";
import { Quiz, ChallengeStatus } from "../quiz-too";
import { OrderedMap } from "immutable";

type Response = {
  status: ChallengeStatus;
  selected: number[];
};

type Action = {
  type: "submitAnswer";
  challengeIdx: number;
  selected: number[];
};
type Dispatch = (action: Action) => void;

type State = { practice: Quiz | null; session: OrderedMap<number, Response> };

type PracticeProviderProps = { children: React.ReactNode; practice: Quiz }; //assessment:{ assessmentInfo: AssessmentInfo, questionSets: QuestionSet[] }}

const PracticeStateContext = React.createContext<State | undefined>(undefined);

const PracticeDispatchContext =
  React.createContext<Dispatch | undefined>(undefined);

// const initialState = {
//   practice: null,
//   session: Map<number, Response>(),
// };

function areArraysEqualSets(a1: any[], a2: any[]) {
  const superSet: any = {};
  for (const i of a1) {
    const e = i + typeof i;
    superSet[e] = 1;
  }

  for (const i of a2) {
    const e = i + typeof i;
    if (!superSet[e]) {
      return false;
    }
    superSet[e] = 2;
  }

  for (let e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }

  return true;
}

const practiceReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "submitAnswer": {
      let newSession = null;
      const session = state.session;
      const challengeIdx = action.challengeIdx;
      const practice = state.practice;
      const challenge = practice?.getChallenges().get(challengeIdx);
      if (challenge !== undefined) {
        if (areArraysEqualSets(challenge.getAnswers(), action.selected)) {
          newSession = session.set(challengeIdx, {
            status: ChallengeStatus.CORRECT,
            selected: action.selected,
          });
        } else {
          newSession = session.set(challengeIdx, {
            status: ChallengeStatus.WRONG,
            selected: action.selected,
          });
        }
      } else {
        throw new Error("Practice object is null or undefined");
      }
      return { ...state, session: newSession };
    }

    default: {
      throw new Error(`Unhandled action type`); // : ${action.type}`)
    }
  }
};

const PracticeProvider = ({ children, practice }: PracticeProviderProps) => {
  let initialSession = OrderedMap<number, Response>();
  practice.getChallenges().forEach(
    (item, idx) =>
      (initialSession = initialSession.set(idx, {
        status: ChallengeStatus.IDLE,
        selected: [],
      }))
  );
  const [state, dispatch] = React.useReducer(practiceReducer, {
    practice: practice,
    session: initialSession,
  });

  return (
    <PracticeStateContext.Provider value={state}>
      <PracticeDispatchContext.Provider value={dispatch}>
        {children}
      </PracticeDispatchContext.Provider>
    </PracticeStateContext.Provider>
  );
};

const usePracticeState = () => {
  const context = React.useContext(PracticeStateContext);

  if (context === undefined) {
    throw new Error("usePracticeState must be used within a PracticeProvider");
  }

  return context;
};

const usePracticeDispatch = () => {
  const context = React.useContext(PracticeDispatchContext);

  if (context === undefined) {
    throw new Error(
      "usePracticeDispatch must be used within a PracticeProvider"
    );
  }

  return context;
};

export { PracticeProvider, usePracticeState, usePracticeDispatch };
export type { Response };
