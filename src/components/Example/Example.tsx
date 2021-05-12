import { MdFileProcessor, Quiz } from "quiz-too";
import { useEffect, useState } from "react";
import ChallengeComponent from "../Challenge/ChallengeComponent";

const Example = (): JSX.Element => {
  const [quiz, setQuiz] = useState<Quiz>();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/css/css-quiz.md")
      .then((response) => response.text())
      .then((content) => {
        const mdFileProcessor = new MdFileProcessor(content);
        const quiz = mdFileProcessor.getQuiz();
        console.log(quiz);
        setQuiz(quiz);
      });
  }, []);

  return (
    <div className="flex-col justify-items-center pt-10 font-mono select-none bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      {quiz
        ? quiz.getChallenges().map((item, idx) => {
            return <ChallengeComponent key={idx} challenge={item} />;
          })
        : null}
      {/* {quiz? <ChallengeComponent challenge={quiz.getChallenges()[8]} />: null}
      {quiz? <ChallengeComponent challenge={quiz.getChallenges()[9]} />: null} */}
    </div>
  );
};

export default Example;
