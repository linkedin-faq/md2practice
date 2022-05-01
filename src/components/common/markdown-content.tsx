/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps, TransformImage } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownContentProps {
    raw: string;
    baseImageURL?: string;
}

const components = (theme: string) => ({
  code({
    inline, className, children, ...props
  }: CodeProps) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        className={`${className} pointer-events-auto`}
        style={theme === 'dark' ? dracula : materialLight}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={`${className}`} {...props}>{children}</code>
    );
  },
});

const MarkdownContent = (
  { raw, baseImageURL }: MarkdownContentProps,
) => {
  const transformImageUri: TransformImage = (src) => {
    if (!src.startsWith('http') && baseImageURL) {
      return new URL(src, baseImageURL).toString();
    }
    return src;
  };

  return (<ReactMarkdown components={components('light')} transformImageUri={transformImageUri}>{raw}</ReactMarkdown>);
};

export default MarkdownContent;
