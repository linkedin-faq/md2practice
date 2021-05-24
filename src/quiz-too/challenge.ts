export enum ChallengeStatus {
  IDLE = "IDLE",
  CORRECT = "CORRECT",
  WRONG = "WRONG",
}

export enum ChallengeType {
  SINGLE,
  MULTIPLE,
}

export class Challenge {
  private challengeType: ChallengeType;
  private index: number;
  private question: string;
  private choices: string[];
  private answers: number[];
  private explanation?: string;

  constructor(
    index: number,
    question: string,
    choices: string[],
    answers: number[],
    explanation: string | undefined
  ) {
    this.challengeType =
      answers.length > 1 ? ChallengeType.MULTIPLE : ChallengeType.SINGLE;
    this.index = index;
    this.question = question;
    this.choices = choices;
    this.answers = answers;
    this.explanation = explanation;
  }

  public getChallengeType(): ChallengeType {
    return this.challengeType;
  }

  public getIndex(): number {
    return this.index;
  }

  public getQuestion(): string {
    return this.question;
  }

  public setQuestion(newQuestion: string): void {
    this.question = newQuestion;
  }

  public getChoices(): string[] {
    return this.choices;
  }

  public setChoices(newChoices: string[]): void {
    this.choices = newChoices;
  }
  
  public getAnswers(): number[] {
    return this.answers;
  }

  public getExplanation(): string | undefined {
    return this.explanation;
  }

  public setExplanation(newExplanation: string): void {
    this.explanation = newExplanation;
  }

  private arrayEquals(a: number[], b: number[]): boolean {
    const sorted_a = a.sort();
    const sorted_b = b.sort();
    return (
      sorted_a.length === sorted_b.length &&
      sorted_a.every((val, idx) => val === sorted_b[idx])
    );
  }
}
