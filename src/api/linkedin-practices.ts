import axios from 'axios';
import { marked } from 'marked';

export interface LinkedInPracticeInfo {
  title: string;
  url: string;
}

type Table = marked.Tokens.Table
type Link = marked.Tokens.Link

export const getLinkedInPracticeInfos = (
  data: string,
  baseURL?: string,
): LinkedInPracticeInfo[] => {
  const tableData = marked.lexer(data).find((token) => {
    const isTable = token.type === 'table';
    if (isTable) {
      const table = token as Table;
      const isLinkedInTable = table.header[0].text === 'Linkedin-quiz-questions';
      return isLinkedInTable;
    }
    return isTable;
  }) as Table | undefined;

  if (!tableData) {
    throw new Error('No LinkedIn Data Found.');
  }

  const infos = tableData.rows.map((row) => {
    const link = row[0].tokens.find((token) => token.type === 'link') as Link | undefined;
    if (!link) {
      return { title: 'No Title', url: 'No URL' };
    }
    return { title: link.text, url: new URL(link.href, baseURL).toString() };
  }).filter((item) => item.title !== 'No Title');

  return infos;
};

export const fetchLinkedInPracticeInfos = async (): Promise<LinkedInPracticeInfo[]> => {
  // const BASE_URL = 'https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/';
  const MENU = 'https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/README.md';
  const response = await axios.get(MENU);
  return getLinkedInPracticeInfos(response.data, 'https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/master/');
};
