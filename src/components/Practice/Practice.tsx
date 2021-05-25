import React, { useState } from "react";
import {
  usePracticeState,
} from "../../contexts/practice-context";
import ChallengeComponent from "../Challenge/ChallengeComponent";
import Modal from "../common/Modal/Modal";
import Navbar from "../common/Navbar/Navbar";
import MoreInformation from "./MoreInformation";

import { ReactComponent as UpArrowIcon } from "./up-arrow.svg";

// interface Props {
//   practice: Quiz;
// }

const Practice = (): JSX.Element => {
  const statePractice = usePracticeState();
  const { practice } = statePractice;
  const [showModal, setShowModal] = useState(false)
  const challengeRefs = practice?.getChallenges().reduce((acc:{ [key: number]: React.RefObject<HTMLLIElement> }, value) => {
    acc[value.getIndex()] = React.createRef();
    return acc;
  }, {});

  const onClickItem = (id:number) => {
        setShowModal(!showModal)
        if(challengeRefs){
            window.scrollTo({
              top: challengeRefs[id].current?.offsetTop,
              behavior:"smooth",
          })
        }
    };

  return (
    <div className="dark:text-gray-100">
      <Navbar />
      <div className="flex-col justify-items-center pt-2 select-none">
        <ul>
          {practice && challengeRefs
          ? practice
              .getChallenges()
              .valueSeq()
              .map((challenge) => (
                <li 
                    key={challenge.getIndex()} ref={challengeRefs[challenge.getIndex()]}>
                  <ChallengeComponent
                    challenge={challenge}
                  />
                </li>
              ))
          : null}
        </ul>
        
      </div>
      <button
        // onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        onClick={()=> setShowModal(true)}
        className="bg-secondary-500 p-2 w-12 shadow rounded-full fixed bottom-5 right-5 focus:outline-none"
      >
        <UpArrowIcon className="fill-current text-white" />
      </button>
      <Modal show={showModal} onShowChanged={()=>setShowModal(!showModal)}>
        <MoreInformation sessionData={statePractice.session} onClickItem={onClickItem}/>
      </Modal>
    </div>
  );
};

export default React.memo(Practice);
