import { Challenge, ChallengeStatus, ChallengeType } from "../../quiz-too";
import React, { useState } from "react";
import MarkdownCustom from "./MarkdownCustom";
import {
  usePracticeDispatch,
  usePracticeState,
} from "../../contexts/practice-context";
import { Map } from "immutable";

interface Props {
  challenge: Challenge;
}

const ChallengeComponent = (props: Props): JSX.Element => {
  const { challenge } = props;
  const challengeIdx = challenge.getIndex();
  const challengeType = challenge.getChallengeType();
  const statePractice = usePracticeState();
  const dispatchPractice = usePracticeDispatch();

  let initial = Map<number, boolean>();
  challenge.getChoices().forEach((item, idx) => initial.set(idx, false));
  const [selected, setSelected] = useState(Map<number, boolean>(initial));

  const challengeStatus = statePractice.session.get(challengeIdx)?.status;

  const handleOnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueSelected = parseInt(event.target.value);
    if (challengeStatus === ChallengeStatus.IDLE) {
      switch (challengeType) {
        case ChallengeType.SINGLE:
          setSelected(selected.set(valueSelected, true));
          break;
        case ChallengeType.MULTIPLE:
          setSelected((prev) =>
            prev.set(valueSelected, !prev.get(valueSelected))
          );
          break;
      }
    }
  };

  const handleOnChecked = (idx: number): boolean => {
    switch (challengeType) {
      case ChallengeType.SINGLE:
        return selected.get(idx) || false;
      case ChallengeType.MULTIPLE:
        return selected.get(idx) || false;
    }
  };

  const handleChallengeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valueSelected: number[] = [];
    switch (challengeType) {
      case ChallengeType.SINGLE:
        valueSelected = selected
          .filter((item) => item)
          .keySeq()
          .toArray();
        dispatchPractice({
          type: "submitAnswer",
          challengeIdx: challengeIdx,
          selected: valueSelected,
        });
        break;
      case ChallengeType.MULTIPLE:
        valueSelected = selected
          .filter((item) => item)
          .keySeq()
          .toArray();
        dispatchPractice({
          type: "submitAnswer",
          challengeIdx: challengeIdx,
          selected: valueSelected,
        });
        break;
    }
  };

  const getFieldClassname = (idx: number): string => {
    if (challengeStatus === ChallengeStatus.IDLE) {
      return "";
    }
    if (challenge.getAnswers().includes(idx)) {
      return "bg-gradient-to-r from-green-500 pointer-events-none";
    }
    if (challengeStatus === ChallengeStatus.WRONG && selected.get(idx)) {
      return "bg-gradient-to-r from-red-500 pointer-events-none";
    } else {
      return "pointer-events-none";
    }
  };

  const getButtonClassname = () => {
    if (challengeStatus === ChallengeStatus.IDLE) {
      return "bg-primary-400";
    }
    if (challengeStatus === ChallengeStatus.CORRECT) {
      return "bg-green-400 pointer-events-none";
    }
    if (challengeStatus === ChallengeStatus.WRONG) {
      return "bg-red-400 pointer-events-none";
    }
  };

  return (
    <div className="block p-2 text-xs mx-10 my-4 md:text-base border rounded-lg shadow dark:bg-gray-800">
      <div className="border-primary-400 border-b-2 p-2 pb-4 overflow-x-auto">
        <MarkdownCustom
          content={`Q${challenge.getIndex()}. ${challenge.getQuestion()}`}
        />
      </div>
      <form onSubmit={handleChallengeSubmit}>
        <div className="flex-col my-5" role="group">
          {challenge.getChoices().map((choice, idx) => {
            return (
              <ChoiceComponent
                key={idx}
                className={`flex p-2 rounded-l-full ${getFieldClassname(idx)}`}
                choice={choice}
                inputType={
                  challengeType === ChallengeType.SINGLE ? "radio" : "checkbox"
                }
                inputChecked={handleOnChecked(idx)}
                inputValue={idx}
                handleOnValueChanged={handleOnValueChanged}
              />
            );
          })}
        </div>
        <button
          className={`block p-2 font-bold uppercase transition duration-200 ease-in-out ${getButtonClassname()} text-gray-100 rounded-lg m-1 transform xl:hover:-translate-y-1 xl:hover:scale-110 xl:hover:bg-primary-600 focus:outline-none`}
          type="submit"
        >
          CHECK
        </button>
      </form>
    </div>
  );
};

interface choiceProps {
  inputType: string;
  inputValue: string | number;
  inputChecked: boolean;
  className: string;
  choice: string;
  handleOnValueChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChoiceComponent = React.memo((props: choiceProps) => {
  return (
    <div className={props.className}>
      <label className="flex w-full items-center overflow-x-auto">
        <input
          type={props.inputType}
          name="choices"
          value={props.inputValue}
          checked={props.inputChecked}
          onChange={props.handleOnValueChanged}
        />
        <span className="w-full mx-2">
          <MarkdownCustom content={props.choice} />
        </span>
      </label>
    </div>
  );
});

export default React.memo(ChallengeComponent);
