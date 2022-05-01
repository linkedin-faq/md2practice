import { PracticeParams } from '../../components/practice/practice';

export const convertGithubLink = (githubLink: string) => {
  const url = new URL(githubLink);
  const tokens = url.pathname.split('/');
  const user = tokens[1];
  const repository = tokens[2];
  const branch = tokens[4];
  const path = tokens.slice(5).join('/');
  return `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${path}`;
};

// for linkedin assessment incorrect question index,
// because some question still doesn't have answer yet.
export const recorrectQuestionIndex = (data: PracticeParams[]) => data.map((item, idx) => ({
  ...item,
  rawQuestion: item.rawQuestion.replace(/#### Q{0,1}\d+/g, `#### Q${idx + 1}`),
}));
