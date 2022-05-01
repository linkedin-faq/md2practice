import { Challenge } from "./challenge";
import { Quiz } from "./quiz";
import { OrderedMap } from "immutable";

export class MdFileProcessor {
  private content: string;
  private challengeRawPartition?: string[];

  constructor(content: string) {
    this.content = content;
    this.challengeRawPartition = this.partitionContent(content);
  }

  public getContent(): string {
    return this.content;
  }

  public getChallengeRawPartition(): string[] {
    if (this.challengeRawPartition === undefined) {
      throw ReferenceError("Fail to get challenge raw partition.");
    }
    return this.challengeRawPartition;
  }

  private partitionContent(content: string): string[] {
    const remove_header = content.match(
      /#{3,5}\s{0,1}Q{0,1}\.{0,1}\s{0,1}\d+(.|\n)*/g
    );
    if (remove_header === null) {
      throw new ReferenceError("Fail to partition content.");
    }
    content = remove_header[0];
    let challengeRawPartition = content.split(/#{3,5}\s{0,1}/g);
    challengeRawPartition = challengeRawPartition
      .filter((item) => item.split("\n").length > 4)
      .map(trimNewline);

    return challengeRawPartition;
  }

  public extractQuestionIndex(challengeRaw: string): number {
    const question = this.extractQuestion(challengeRaw);
    const index_match = (question.match(/Q\d+/g) || [undefined])[0]?.replace(
      "Q",
      ""
    );
    if (index_match === undefined) {
      return -1;
    } else {
      const index = parseInt(index_match);
      return index;
    }
  }

  public extractQuestion(challengeRaw: string): string {
    const questionByLine = challengeRaw.split("\n");
    let question;
    questionByLine.some((line, idx) => {
      if (line.match(/-\s{0,1}\[[x{0,1}|\s]\]/i)) {
        question = questionByLine.slice(0, idx).join("\n");
        return true;
      } else {
        return false;
      }
    });
    if (question === undefined) {
      // throw ReferenceError("Fail to extract question.");
      question = "";
    }
    return trimNewline(question);
  }

  public extractAnswers(challengeRaw: string): number[] {
    const result = challengeRaw.match(/-\s{0,1}\[[x{0,1}|\s]\]/g);
    const answers = result?.map((item) =>
      item.match(/\[x\]/i) ? true : false
    );
    const answersIdx = answers
      ?.map((bool, i) => (bool ? i : -1))
      .filter((i) => i !== -1);
    return answersIdx || [];
  }

  public extractChoices(challengeRaw: string): string[] {
    const question = this.extractQuestion(challengeRaw);
    const choiceAnswerExplain = trimNewline(challengeRaw.replace(question, ""));
    const choiceAnswerExplainArray = choiceAnswerExplain
      .trim()
      .split(/-\s{0,1}\[[x{0,1}|\s]\]/gi)
      .filter((item) => item);

    let choiceExplainArray = choiceAnswerExplainArray
      .map((item) => item.replace(/<{2,3}-{0,3}\s{0,1}CORRECT.*/gi, ""))
      .map((item) => item.replace(/<{2,3}-{0,3}\s{0,1}WRONG.*/gi, ""));
    choiceExplainArray = choiceExplainArray.map(trimNewline);
    const explain = this.extractExplanation(challengeRaw);

    const cleanedLastChoiceDetail = choiceExplainArray[
      choiceExplainArray.length - 1
    ].replace(explain || "", "");
    choiceExplainArray[choiceExplainArray.length - 1] = cleanedLastChoiceDetail;
    const choices = choiceExplainArray;

    return choices;
  }

  public extractExplanation(challengeRaw: string): string | undefined {
    const question = this.extractQuestion(challengeRaw);
    const choiceAnswerExplain = trimNewline(challengeRaw.replace(question, ""));
    const choiceAnswerExplainArray = choiceAnswerExplain
      .trim()
      .split(/-\s{0,1}\[[x{0,1}|\s]\]/gi)
      .filter((item) => item);

    // Assume Details at last
    const lastChoiceDetail =
      choiceAnswerExplainArray[choiceAnswerExplainArray.length - 1];
    const detailMatch = lastChoiceDetail.match(/\n{2,}.*$/g);
    let detail = detailMatch ? detailMatch[0] : "";

    // Assume Details behind `<< Correct`
    if (detail === "") {
      choiceAnswerExplainArray.some((choiceAnswerDetailItem) => {
        const regMatch = choiceAnswerDetailItem.match(
          /<{2,3}-{0,3}\s{0,1}CORRECT.*/i
        );
        if (regMatch) {
          detail = regMatch[0].replace(/<{2,3}-{0,3}\s{0,1}CORRECT/i, "");
          return true;
        } else {
          return false;
        }
      });
    }

    return detail !== "" ? trimNewline(detail) : undefined;
  }

  public getQuestionCount(): number {
    return this.challengeRawPartition?.length || 0;
  }

  public getChallenge(challengeRaw: string): Challenge {
    const index = this.extractQuestionIndex(challengeRaw);
    const question = this.extractQuestion(challengeRaw).replace(
      /Q\d+.\s{0,1}/g,
      ""
    );
    const answers = this.extractAnswers(challengeRaw);
    const choices = this.extractChoices(challengeRaw);
    const explanation = this.extractExplanation(challengeRaw);
    const challenge = new Challenge(
      index,
      question,
      choices,
      answers,
      explanation
    );

    return challenge;
  }

  public getQuiz(): Quiz {
    if (this.challengeRawPartition === undefined) {
      throw ReferenceError("Fail to get question.");
    }
    let challenges = OrderedMap<number, Challenge>();
    this.challengeRawPartition.forEach((item) => {
      const challenge = this.getChallenge(item);
      challenges = challenges.set(challenge.getIndex(), challenge);
    });
    return new Quiz(challenges);
  }
}

const trimNewline = (str: string) => str.trim().replace(/^\n+|\n+$/g, "");
