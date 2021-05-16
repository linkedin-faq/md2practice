import { Challenge, ChallengeStatus, ChallengeType } from "quiz-too";
import React, { useState } from "react";
import MarkdownCustom from "./MarkdownCustom";

const ChallengeComponentV2 = (props: { challenge: Challenge }): JSX.Element => {
  const { challenge } = props;
  const challengeType = challenge.getChallengeType();
  const initialSelectedMap = new Map();
  challenge.getChoices().map((_, idx) => initialSelectedMap.set(idx, false));
  const [selected, setSelected] =
    useState<Map<number, boolean>>(initialSelectedMap);
  const [challengeStatus, setChallengeStatus] = useState<ChallengeStatus>(
    challenge.getChallengeStatus()
  );

  const handleOnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueSelected = parseInt(event.target.value);
    if (challengeStatus === ChallengeStatus.IDLE) {
      switch (challengeType) {
        case ChallengeType.SINGLE:
          const newSelectedMap = new Map(initialSelectedMap).set(
            valueSelected,
            true
          );
          setSelected(newSelectedMap);
          break;
        case ChallengeType.MULTIPLE:
          setSelected((prev) =>
            new Map(prev).set(valueSelected, !prev.get(valueSelected))
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
        selected.forEach((bool, idx) => {
          if (bool) {
            valueSelected.push(idx);
          }
        });
        challenge.setSelectedChoices(valueSelected);
        setChallengeStatus(challenge.getChallengeStatus());
        break;
      case ChallengeType.MULTIPLE:
        selected.forEach((bool, idx) => {
          if (bool) {
            valueSelected.push(idx);
          }
        });
        challenge.setSelectedChoices(valueSelected);
        setChallengeStatus(challenge.getChallengeStatus());
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
              <div
                className={`flex p-2 rounded-l-full ${getFieldClassname(idx)}`}
                key={idx}
              >
                <label className="flex w-full items-center overflow-x-auto">
                  <input
                    type={
                      challengeType === ChallengeType.SINGLE
                        ? "radio"
                        : "checkbox"
                    }
                    name="choices"
                    value={idx}
                    checked={handleOnChecked(idx)}
                    onChange={handleOnValueChanged}
                  />
                  <span className="w-full mx-2">
                    <MarkdownCustom content={choice} />
                  </span>
                </label>
              </div>
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

export default ChallengeComponentV2;
