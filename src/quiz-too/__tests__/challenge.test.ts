import { readFileSync } from "fs";
import { Challenge, ChallengeStatus, ChallengeType } from "../challenge";
import { MdFileProcessor } from "../mdFileProcessor";

const data = readFileSync("./samples/java-quiz.md", "utf-8");

test("test challenge component single type", async () => {
  const mdFileProcessor = new MdFileProcessor(data);
  const quiz = mdFileProcessor.getQuiz();
  const challenge = quiz.getChallenges().get(1);
  challenge?.setSelectedChoices([1]);
  const status = challenge?.getChallengeStatus();
  expect(status).toEqual(ChallengeStatus.CORRECT);

  const challengeType = challenge?.getChallengeType();
  expect(challengeType).toEqual(ChallengeType.SINGLE);
});

test("test challenge component multiple type", async () => {
  const mdFileProcessor = new MdFileProcessor(data);
  const quiz = mdFileProcessor.getQuiz();
  const challenge = quiz.getChallenges().get(2);
  challenge?.setSelectedChoices([2, 1]);
  const status = challenge?.getChallengeStatus();
  expect(status).toEqual(ChallengeStatus.CORRECT);

  const challengeType = challenge?.getChallengeType();
  expect(challengeType).toEqual(ChallengeType.MULTIPLE);
});

test("test update challenge component", async () => {
  const mdFileProcessor = new MdFileProcessor(data);
  const quiz = mdFileProcessor.getQuiz();
  const newChallenge = new Challenge(
    3,
    "question 3",
    ["a", "b"],
    [1],
    undefined
  );
  quiz.setChallenge(newChallenge);
  const challenge = quiz.getChallenges().get(3);
  expect(challenge?.getQuestion()).toEqual("question 3");
  // console.log(challenge?.getQuestion());
  // challenge?.setSelectedChoices([2, 1]);
  // const challenge2 = quiz.getChallenges().get(2);
  // console.log(challenge2?.getSelectedChoices());
});
