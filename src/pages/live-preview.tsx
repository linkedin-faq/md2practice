import { marked } from 'marked';
import React, { ChangeEventHandler } from 'react';
import { parsePractices, withId } from '../practice-parser/lexer';
import { Practices } from '../components/practices/practices';
import { usePractices } from '../components/practices/practices.hook';

const sample = '#### Q1. Normal Selection\n- [x] selection 1\n- [ ] selection 2';

const LivePreviewPractices: React.FC = () => {
  const sampleLexer = marked.lexer(sample);
  const initPractices = withId(parsePractices(sampleLexer));

  const [practices, {
    handleSubmit,
    handleSelectionChange,
    setPractices,
  }] = usePractices(initPractices);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const lexer = marked.lexer(e.target.value);
    setPractices(withId(parsePractices(lexer)));
  };

  return (
    <div className="flex gap-10">
      <textarea defaultValue={sample} className="w-1/2 text-left p-2" onChange={handleChange} />
      <div className="w-1/2">
        <Practices
          data={practices}
          onSubmit={handleSubmit}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
};

export default LivePreviewPractices;
