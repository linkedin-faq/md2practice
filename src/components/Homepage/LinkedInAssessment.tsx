import React, { useEffect, useState } from "react";
import { githubLinkedinSource } from "quiz-too";
import { Link } from "react-router-dom";

interface AssessmentInfo {
  title: string;
  url: string;
  questionCount: number;
}

const LinkedInAssessment = (props: { className?: string }): JSX.Element => {
  const [assessmentInfos, setAssessmentInfo] = useState<AssessmentInfo[]>();
  const [filterBy, setFilterBy] = useState<string>();

  useEffect(() => {
    githubLinkedinSource.getAssessmentInfos().then((item) => {
      setAssessmentInfo(item);
    });
  }, []);

  const handleSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(e.target.value);
  };

  const getDisplayAssessment = () => {
    return assessmentInfos?.filter((item) =>
      item.title.toLowerCase().includes(filterBy || "")
    );
  };

  return (
    <div className={`flex flex-col justify-center ${props.className}`}>
      <div
        id="searchbar-for-linkedin"
        className="w-full h-10 pl-3 pr-2 bg-gray-50 dark:bg-gray-800 border-2 rounded-full flex justify-between items-center relative"
      >
        <input
          type="search"
          name="filter-assessment"
          id="filter-assessment"
          autoComplete="off"
          placeholder="Filter LinkedIn Assessment"
          className="bg-gray-50 dark:bg-gray-800 w-full outline-none focus:outline-none active:outline-none"
          onChange={(e) => handleSearchBarChange(e)}
        />
      </div>

      <div id="linkedin-assessment-lists" className="mt-4">
        {getDisplayAssessment()?.map((item, idx) => {
          return <AssessmentCard key={idx} assessmentInfo={item} />;
        })}
      </div>
    </div>
  );
};

const AssessmentCard = (props: {
  assessmentInfo: AssessmentInfo;
}): JSX.Element => {
  const title = props.assessmentInfo.title.replace(/\[|\]/g, "");
  const url = props.assessmentInfo.url;

  // const handleClickCard = () => {
  //   console.log(url);
  //   hashHistory
  // }

  return (
    <Link to={`/practice/${btoa(url)}`}>
      <div className="p-2 m-1 bg-secondary-500 dark:bg-gray-800 font-bold text-gray-100 rounded-sm shadow text-sm flex justify-between">
        <span>{title}</span>
        {/* <span className="text-gray-300">{questionCount}</span> */}
      </div>
    </Link>
  );
};
export default LinkedInAssessment;
