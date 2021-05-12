import { Challenge } from "quiz-too";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import MarkdownCustom from "./MarkdownCustom";
import { Transition } from "@tailwindui/react";

interface challengeProps {
  challenge: Challenge;
}

enum ChallengeStatus {
  IDLE,
  CORRECT,
  WRONG,
}

const ChallengeComponent = (props: challengeProps): JSX.Element => {
  const { challenge } = props;
  const [status, setStatus] = useState(ChallengeStatus.IDLE);
  const [selected, setSelected] = useState<number[]>();
  const explain = challenge.getExplanation();

  useEffect(() => {
    if (selected !== undefined && challenge.getAnswers().includes(selected[0])) {
      setStatus(ChallengeStatus.CORRECT);
    } else if (selected !== undefined) {
      setStatus(ChallengeStatus.WRONG);
    } else if (selected === undefined) {
      setStatus(ChallengeStatus.IDLE);
    }
  }, [selected, challenge]);

  return (
    <div className="block p-2 text-xs mx-10 my-4 md:text-base border rounded-lg shadow dark:bg-gray-800">
      <Question question={challenge.getQuestion()} index={challenge.getIndex()} />
      <SingleChoice challenge={challenge} status={status} onSelectedChange={(value) => setSelected(value)} />
      {explain ? <ExplainCard explain={explain} expand={status !== ChallengeStatus.IDLE ? true : false} /> : null}
      {/* <button className="mt-2 p-2" onClick={()=>setSelected(undefined)}>REFRESH</button> */}
    </div>
  );
};

const ExplainCard = (props: { explain: string; expand: boolean }) => {
  const { explain, expand } = props;

  const getClassname = () => {
    if (expand) {
      return "block";
    } else {
      return "overflow-hidden hidden";
    }
  };

  return (
    <Transition
      show={expand}
      enter="transition ease-out duration-500 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className={`border-t-2 p-4 mt-4 select-text ${getClassname()}`}>
        <p className="break-words text-gray-700 dark:text-gray-50 text-opacity-80">{explain}</p>
      </div>
    </Transition>
  );
};

interface singleChoiceProps {
  challenge: Challenge;
  status: ChallengeStatus;
  onSelectedChange: (selected: number[]) => void;
}

const SingleChoice = (props: singleChoiceProps) => {
  const { challenge, status } = props;
  const [selected, setSelected] = useState<number>(-9);
  const choices = challenge.getChoices();

  // useEffect(()=>{
  //     if(selected === undefined){
  //         status = ChallengeStatus.IDLE;
  //     }
  // },[selected])

  const getFieldClassname = (idx: number): string => {
    if (status !== ChallengeStatus.IDLE && challenge.getAnswers().includes(idx)) {
      return "bg-gradient-to-r from-green-500 pointer-events-none";
    } else if (status === ChallengeStatus.WRONG && idx === selected) {
      return "bg-gradient-to-r from-red-500 pointer-events-none";
    } else if (status !== ChallengeStatus.IDLE) {
      return "pointer-events-none";
    } else {
      return "";
    }
  };

  const getButtonClassname = () => {
    if (status === ChallengeStatus.CORRECT) {
      return "bg-green-400 pointer-events-none";
    } else if (status === ChallengeStatus.WRONG) {
      return "bg-red-400 pointer-events-none";
    } else {
      return "bg-primary-400";
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          selected: "",
        }}
        onSubmit={(values) => {
          props.onSelectedChange([parseInt(values.selected)]);
          setSelected(parseInt(values.selected));
        }}
      >
        {({ values, setValues }) => (
          <Form>
            <div className="flex-col my-5" role="group" aria-labelledby="single-choices-group">
              {choices.map((choice, idx) => {
                const idxString = String(idx);

                return (
                  <div className={`flex items-center p-2 rounded-l-lg ${getFieldClassname(idx)}`} key={idx}>
                    <Field
                      type="radio"
                      name="selected"
                      checked={idxString === values.selected ? true : false}
                      value={idxString}
                    />

                    <span
                      className="w-11/12 mx-2 overflow-x-auto text-gray-800 dark:text-gray-100"
                      onClick={() => {
                        if (status === ChallengeStatus.IDLE) {
                          setValues({ selected: String(idx) });
                        }
                      }}
                    >
                      <MarkdownCustom content={choice} />
                    </span>
                    {/* <Field component={RadioContent} valueName="selected" value={String(idx)} content={choice} selected={values.selected}/> */}
                  </div>
                );
              })}
            </div>
            <button
              // className={`block p-2 font-bold uppercase transition duration-200 ease-in-out ${getButtonClassname()} text-gray-100 rounded-lg m-1 transform hover:-translate-y-1 hover:scale-110 hover:bg-primary-600 focus:outline-none`}
              className={`block p-2 font-bold uppercase transition duration-200 ease-in-out ${getButtonClassname()} text-gray-100 rounded-lg m-1 transform xl:hover:-translate-y-1 xl:hover:scale-110 xl:hover:bg-primary-600 focus:outline-none`}
              type="submit"
            >
              Check
            </button>
          </Form>
        )}
      </Formik>
      {/* <button onClick={()=>setSelected(undefined)}>REFRESH</button> */}
    </React.Fragment>
  );
};

// interface radioContentProps {
//     valueName:string,
//     value:string,
//     content:string
//     selected:string
// }

// const RadioContent = (props:radioContentProps) => {

//     const {valueName, value, content, selected} = props;

//     const [field, , helpers] = useField({ name: valueName, type: "radio", value: value });

//     const { setValue } = helpers;

//     return (
//         <React.Fragment>
//             <input {...field} checked={value === selected} type="radio"></input>
//             <span className="ml-3 w-full" onClick={()=>{setValue(value)}}><MarkdownCustom content={content}/></span>
//         </React.Fragment>
//     );
// };

const Question = (props: { question: string; index: number }) => {
  const displayQuestion = "Q" + props.index + ". " + props.question;

  return (
    <div className="border-primary-400 border-b-2 p-2 pb-4 overflow-x-auto">
      <MarkdownCustom content={displayQuestion} />
    </div>
  );
};

export default ChallengeComponent;
