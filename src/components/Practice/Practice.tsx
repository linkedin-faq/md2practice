import React from "react";
import {
  usePracticeState,
} from "../../contexts/practice-context";
import ChallengeComponent from "../Challenge/ChallengeComponent";
import Navbar from "../common/Navbar/Navbar";

import { ReactComponent as UpArrowIcon } from "./up-arrow.svg";

// interface Props {
//   practice: Quiz;
// }

const Practice = (): JSX.Element => {
  const statePractice = usePracticeState();
  const { practice } = statePractice;

  return (
    <div className="dark:text-gray-100">
      <Navbar />
      <div className="flex-col justify-items-center pt-2 select-none">
        {practice
          ? practice
              .getChallenges()
              .valueSeq()
              .map((challenge) => (
                <ChallengeComponent
                  challenge={challenge}
                  key={challenge.getIndex()}
                />
              ))
          : null}
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        className="bg-secondary-500 p-2 w-12 shadow rounded-full fixed bottom-5 right-5 focus:outline-none"
      >
        <UpArrowIcon className="fill-current text-white" />
      </button>
    </div>
  );
};

export default React.memo(Practice);
