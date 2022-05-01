import React, { ChangeEventHandler, useState } from "react";
import { useHistory } from "react-router";
import LinkedInAssessment from "./LinkedInAssessment";
import Navbar from "../common/Navbar/Navbar";
import QuestionnaireLogo from "./questionnaire.svg";
import FileUploader from "./FileUploader";

const Homepage = (): JSX.Element => {
  const history = useHistory();
  const [urlSubmit, setUrlSubmit] = useState<string>("");

  const handleMdUrlSubmit = () => {
    if (urlSubmit) {
      history.push({
        pathname: `/practice/${btoa(urlSubmit)}`,
        state: {
          content: "",
          inputType: "URL",
        },
      });
    } else {
      alert("Key in URL");
    }
  };

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setUrlSubmit(`File Selected: ${file.name}`);
      file.text().then((content) => {
        history.push({
          pathname: "/practice",
          state: {
            content: content,
            inputType: "FILE",
          },
        });
      });
    }
  };

  return (
    <div>
      <Navbar />
      {/* <div className="flex justify-between md:px-10">
        <button className="m-2 p-2 text-lg uppercase font-bold focus:outline-none">
          <span className="text-primary-500">MD2</span>Practice
        </button>
        <div className="m-2 p-2 text-md">
          <button></button> Dark Theme
        </div>
      </div> */}

      <section className="mt-10">
        <div className="flex justify-around px-10">
          <div className="flex flex-col w-1/2 justify-center justify-items-center text-center">
            <span className="text-md md:text-4xl lg:text-6xl font-bold">
              Simple Practice Test Engine
            </span>
            <span className="text-xs md:text-2xl lg:text-4xl fond-semibold text-gray-400">
              Convert MD File to Q&amp;A for Practice
            </span>
          </div>
          <div className="flex justify-center justify-items-center text-center">
            <img
              className="w-full h-full"
              src={QuestionnaireLogo}
              alt="questionnaire-logo"
            />
          </div>
        </div>
      </section>

      <section className="md:w-2/3 md:m-auto">
        <div className="flex flex-col mx-10 my-20 justify-center justify-items-center">
          <div className="flex">
            <div className="w-full h-10 pl-3 pr-2 bg-gray-50 dark:bg-gray-800 border-2 rounded-full flex justify-between items-center relative">
              <input
                onChange={(e) => setUrlSubmit(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleMdUrlSubmit();
                  }
                }}
                value={urlSubmit}
                type="search"
                name="md-url"
                autoComplete="off"
                id="md-url-submit"
                placeholder="URL or MD File Upload"
                className="bg-gray-50 dark:bg-gray-800 w-full outline-none focus:outline-none active:outline-none"
              />
              <button
                onClick={handleMdUrlSubmit}
                type="submit"
                aria-label="url-button"
                className="ml-1 outline-none focus:outline-none active:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <FileUploader handleFileUpload={handleFileUpload} />
          </div>

          <div className="text-lg uppercase text-center my-2 pb-2 border-b-2 border-primary-700">
            OR
          </div>
          {/* <div className="border border-b-2 shadow-md border-primary-700"></div> */}
          <div className="mt-4 font-bold flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <a className="text-xs sm:hidden font-bold" target="_blank" rel="noreferrer" href="https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes">
              LinkedIn Assessment
            </a>
            <a className="hidden text-sm sm:block font-bold hover:underline" target="_blank" rel="noreferrer" href="https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes">
              LinkedIn Assessment Practice [Click Me For Source]
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <LinkedInAssessment className="mt-4" />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
