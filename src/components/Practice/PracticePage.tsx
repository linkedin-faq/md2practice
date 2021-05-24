import { MdFileProcessor, Quiz } from "../../quiz-too";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Practice from "./Practice";
import { PracticeProvider } from "../../contexts/practice-context";

const PracticePage = () => {
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
    <>
      {practice ? (
        <PracticeProvider practice={practice}>
          <Practice />
        </PracticeProvider>
      ) : null}
    </>
  );
};

export default PracticePage;
