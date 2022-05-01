import axios from "axios";
import * as githubLinkedinSource from "../githubLinkedinSource";

test("fetch information from github linkedin using extract", async () => {
  const assessmentInfos = await axios
    .get(
      "https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/README.md"
    )
    .then((response) => {
      const content = response.data;
      const assessmentInfos =
        githubLinkedinSource.extractAssessmentInfos(content);

      return assessmentInfos;
    });
  expect(assessmentInfos.length).toBeGreaterThanOrEqual(64);
});

test("fetch information from github linkedin directly", async () => {
  const assessmentInfos = await githubLinkedinSource.getAssessmentInfos();
  // console.log(assessmentInfos);
  expect(assessmentInfos.length).toBeGreaterThanOrEqual(64);
});
