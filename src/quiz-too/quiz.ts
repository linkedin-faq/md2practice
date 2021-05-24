import { Challenge } from "./challenge";
import { OrderedMap } from "immutable";

type Challenges = OrderedMap<number, Challenge>;

export class Quiz {
  private challenges: Challenges;

  constructor(challenges: Challenges) {
    this.challenges = this.sanitizeChallenges(challenges);
  }

  public getChallenges(): Challenges {
    return this.challenges;
  }

  public setChallenge(challenge: Challenge): void {
    const idx = challenge.getIndex();
    this.challenges.set(idx, challenge);
  }

  private sanitizeChallenges(challenges: Challenges): Challenges {
    let newChallenge = OrderedMap<number, Challenge>();
    challenges.forEach((challenge) => {
      if (
        challenge.getQuestion() !== "" &&
        challenge.getIndex() > 0 &&
        challenge.getAnswers().length > 0 &&
        challenge.getChoices().length > 0
      ) {
        newChallenge = newChallenge.set(challenge.getIndex(), challenge);
      }
    });
    return newChallenge;
  }
}
