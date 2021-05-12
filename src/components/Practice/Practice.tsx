import { MdFileProcessor, Quiz } from "quiz-too";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import ChallengeComponent from "../Challenge/ChallengeComponent";
import Navbar from "../common/Navbar/Navbar";

const Practice = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation<{ content: string; inputType: string }>();
  const { encodedUrl } = useParams<{ encodedUrl: string }>();

  const [practice, setPractice] = useState<Quiz>();

  const convertContentToPractice = (content: string) => {
    try {
      const mdFileProcessor = new MdFileProcessor(content);
      const practice = mdFileProcessor.getQuiz();
      if (practice.getChallenges().length === 0) {
        throw Error("No Challenge Detected.");
      }
      setPractice(practice);
    } catch (err) {
      throw Error("Content is not in expected format.");
    }
  };

  useEffect(() => {
    if (location.state && location.state.inputType === "FILE") {
      console.log(location.state);
      convertContentToPractice(location.state.content);
    } else {
      if (!encodedUrl) {
        history.push("/");
      } else {
        const url = atob(encodedUrl);
        fetch(url)
          .then((response) => response.text())
          .then((content) => {
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
          ? practice.getChallenges().map((item, idx) => {
              return <ChallengeComponent key={idx} challenge={item} />;
            })
          : null}
        {/* {quiz? <ChallengeComponent challenge={quiz.getChallenges()[8]} />: null}
          {quiz? <ChallengeComponent challenge={quiz.getChallenges()[9]} />: null} */}
      </div>
    </div>
  );
};

export default Practice;
