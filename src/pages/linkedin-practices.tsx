import React from 'react';
import { useParams } from 'react-router-dom';
import GithubPractices from './github-practices/github-practices';

export const LinkedInPracticesPage: React.FC = () => {
  const { encodedUrl } = useParams<{ encodedUrl: string }>();
  const url = atob(encodedUrl || '');

  return (
    <GithubPractices githubLink={url} />
  );
};
