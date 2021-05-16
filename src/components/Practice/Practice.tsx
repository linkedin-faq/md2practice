import { MdFileProcessor, Quiz } from "quiz-too";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
// import ChallengeComponent from "../Challenge/ChallengeComponent";
import ChallengeComponentV2 from "../Challenge/ChallengeComponentV2";
import Navbar from "../common/Navbar/Navbar";

import { ReactComponent as UpArrowIcon } from "./up-arrow.svg";

const Practice = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation<{ content: string; inputType: string }>();
  const { encodedUrl } = useParams<{ encodedUrl: string }>();

  const [practice, setPractice] = useState<Quiz>();

  const convertContentToPractice = (content: string) => {
    try {
      const mdFileProcessor = new MdFileProcessor(content);
      const practice = mdFileProcessor.getQuiz();
      if (practice.getChallenges().size === 0) {
        throw Error("No Challenge Detected.");
      }
      setPractice(practice);
    } catch (err) {
      throw Error("Content is not in expected format.");
    }
  };

  useEffect(() => {
    if (location.state && location.state.inputType === "FILE") {
      convertContentToPractice(location.state.content);
    } else {
      if (!encodedUrl) {
        history.push("/");
      } else {
        const url = atob(encodedUrl);
        fetch(url)
          .then((response) => response.text())
          .then((content) => {
            const imagePath = url.split("/").slice(0, -1).join("/");
            console.log(url, imagePath);
            content = content
              .replace(/^!.*\((?!http)/gm, `![imagepath](${imagePath}/`)
              .replace("?raw=true", "");
            convertContentToPractice(content);
          })
          .catch(() => {
            alert("fail to load practice.");
            history.push("/");
          });
      }
    }
  }, [encodedUrl, history, location]);

  return (
    <div className="dark:text-gray-100">
      <Navbar />
      <div className="flex-col justify-items-center pt-2 select-none">
        {practice
          ? Array.from(practice.getChallenges()).map(([idx, challenge]) => {
              return <ChallengeComponentV2 key={idx} challenge={challenge} />;
            })
          : null}
      </div>
      <button onClick={()=>window.scrollTo({top:0,left:0,behavior:"smooth"})} className="bg-secondary-500 p-2 w-12 shadow rounded-full fixed bottom-5 right-5 focus:outline-none">
        <UpArrowIcon className="fill-current text-white" />
      </button>
    </div>
  );
};

export default Practice;
