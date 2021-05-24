import { readFileSync } from "fs";
import { MdFileProcessor } from "../mdFileProcessor";

test("getContent", async () => {
  const data = readFileSync("./samples/css.md", "utf-8");

  const mdFileProcessor = new MdFileProcessor(data);
  expect(mdFileProcessor.getQuestionCount()).toBeGreaterThanOrEqual(82);
});

test("get challenge", async () => {
  const data = readFileSync("./samples/java-quiz.md", "utf-8");

  const mdFileProcessor = new MdFileProcessor(data);
  const challengeRaw = mdFileProcessor.getChallengeRawPartition()[0];
  expect(mdFileProcessor.extractQuestionIndex(challengeRaw)).toEqual(1);
  expect(mdFileProcessor.extractQuestion(challengeRaw)).toContain(
    "Q1. Given the string 'strawberries' saved in a variable called fruit, what would `fruit.substring(2, 5)` return?"
  );
  expect(
    mdFileProcessor.extractChoices(challengeRaw).length
  ).toBeGreaterThanOrEqual(4);
  expect(mdFileProcessor.extractAnswers(challengeRaw).length).toEqual(1);
  expect(mdFileProcessor.extractExplanation(challengeRaw)).toEqual(
    "**Reasoning:** The substring method is accepting two arguments. The first argument being the index to start(includes that char at 2) and the second the index of the string to end the substring(excludes the char at 5). Strings in Java are like arrays of chars. Therefore the method will return 'raw' as those are the chars in indexes 2,3, and 4. You can also take the ending index and subtract the beginning index from it, to determine how many chars will be included in the substring (5-2=3)."
  );

  const quiz = mdFileProcessor.getQuiz();
  expect(quiz.getChallenges().size).toBeGreaterThanOrEqual(70);
  // console.log(quiz.getChallenges());
});
