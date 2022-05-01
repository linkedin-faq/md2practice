import { convertGithubLink } from './utils';

describe('github practices utilities', () => {
  it('should convert the github link to raw file link correctly', () => {
    const githubLink = 'https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/master/git/git-quiz.md';
    const rawLink = 'https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/git/git-quiz.md';
    expect(convertGithubLink(githubLink)).toEqual(rawLink);
  });
});
