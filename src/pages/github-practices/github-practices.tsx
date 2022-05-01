import axios from 'axios';
import { marked } from 'marked';
import React, { useEffect } from 'react';
import { parsePractices, withId } from '../../practice-parser/lexer';
import { Practices } from '../../components/practices/practices';
import { isEmptyPractices, usePracticesWithLocalStorage } from '../../components/practices/practices.hook';
import { convertGithubLink, recorrectQuestionIndex } from './utils';

interface GithubPracticesProps {
  githubLink: string;
}

const GithubPractices: React.FC<GithubPracticesProps> = ({ githubLink }) => {
  const link = convertGithubLink(githubLink);
  const getPractices = () => axios.get(link)
    .then((response) => {
      const lexer = marked.lexer(response.data);
      const practices = recorrectQuestionIndex(parsePractices(lexer));
      return withId(practices);
    });

  const [practices, {
    handleSubmit,
    handleSelectionChange,
    setPractices,
    resetStorage,
  }] = usePracticesWithLocalStorage(link, {});

  useEffect(() => {
    if (isEmptyPractices(practices)) {
      getPractices().then((data) => {
        setPractices(data);
      });
    }
  }, [practices]);

  return (
    <Practices
      data={practices}
      onSubmit={handleSubmit}
      onSelectionChange={handleSelectionChange}
      baseImageURL={link}
      onResetPractices={resetStorage}
    />
  );
};

export default GithubPractices;
