import React from 'react';

interface MarkdownContentProps {
    raw: string;
}

const MarkdownContent = jest.fn().mockImplementation((
  { raw }: MarkdownContentProps,
) => <div>{raw}</div>);

export default MarkdownContent;
