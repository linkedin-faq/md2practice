import React from 'react';
import MarkdownContent from '../common/markdown-content';

// eslint-disable-next-line no-shadow
export enum OptionStatus {
  IDLE = 'idle',
  SELECTED = 'selected',
  CORRECT = 'correct',
  WRONG = 'wrong'
}
export interface SelectionOption {
  rawOption: string;
  status: OptionStatus
}

// eslint-disable-next-line no-shadow
export enum PracticeStatus {
  IDLE = 'idle',
  CORRECT = 'correct',
  WRONG = 'wrong'
}
export interface PracticeParams {
  rawQuestion: string;
  selection: SelectionOption[];
  answers: number[]
  status: PracticeStatus
}

interface PracticeProps extends PracticeParams {
  id: number;
  baseImageURL?: string;
  onSubmit: (id: number, selection: SelectionOption[]) => void;
  onSelectionChange: (id: number, selection: SelectionOption[]) => void;
}

interface OptionProps {
  optionId: number;
  disabled: boolean;
  optionStatus: OptionStatus
  type: 'checkbox' | 'radio'
  onChange: (optionId: number) => void
}

const Option: React.FC<OptionProps> = ({
  onChange, optionId, children, optionStatus, type, disabled,
}) => {
  const getColorClassname = () => {
    switch (optionStatus) {
      case OptionStatus.CORRECT:
        return 'bg-gradient-to-r from-green-800';
      case OptionStatus.WRONG:
        return 'bg-gradient-to-r from-red-800';
      default:
        return '';
    }
  };

  const checked = optionStatus !== OptionStatus.IDLE;

  const selectedStyle = checked ? 'rounded-l-full' : '';

  return (
    <div className={`flex mb-2  ${disabled ? 'pointer-events-none' : ''} accent-secondary-dark-500`}>
      <label className={`w-full p-2 flex items-center ${selectedStyle} ${getColorClassname()}`}>
        <input
          // disabled={disabled}
          type={type}
          onChange={() => onChange(optionId)}
          aria-labelledby={`option-${optionId}`}
          aria-describedby={`option-${optionId}`}
          checked={checked}
        />
        <span className="pl-2 w-full overflow-x-auto">{children}</span>
      </label>
    </div>
  );
};

const Practice:React.FC<PracticeProps> = ({
  id, rawQuestion, selection, answers, status, onSubmit, onSelectionChange, baseImageURL,
}) => {
  const isMultiple = answers.length > 1;

  const getButtonColor = () => {
    switch (status) {
      case PracticeStatus.CORRECT:
        return 'bg-green-800';
      case PracticeStatus.WRONG:
        return 'bg-red-800';
      default:
        return 'bg-secondary-dark-700';
    }
  };

  const handleRadioChange = (optionId: number) => {
    const newSelection = selection.map((item, idx) => {
      const newStatus = idx === optionId ? OptionStatus.SELECTED : OptionStatus.IDLE;
      return { ...item, status: newStatus };
    });
    onSelectionChange(id, newSelection);
  };

  const handleCheckboxChange = (optionId: number) => {
    const newSelection = [...selection];
    const oldStatus = selection[optionId].status;
    newSelection[optionId].status = oldStatus === OptionStatus.SELECTED
      ? OptionStatus.IDLE : OptionStatus.SELECTED;
    onSelectionChange(id, newSelection);
  };

  return (
    <div className="mb-4 text-xs tablet:text-lg" data-testid="practice-component">
      <div className="mb-2 overflow-x-auto" aria-label="question-container">
        <MarkdownContent raw={rawQuestion} baseImageURL={baseImageURL} />
      </div>
      <div data-testid="selection-component">
        {selection.map((item, idx) => (
          <Option
            // eslint-disable-next-line react/no-array-index-key
            key={`option-${idx}`}
            optionId={idx}
            optionStatus={item.status}
            type={answers.length > 1 ? 'checkbox' : 'radio'}
            disabled={status !== PracticeStatus.IDLE}
            onChange={isMultiple ? handleCheckboxChange : handleRadioChange}
          >
            <MarkdownContent raw={item.rawOption} baseImageURL={baseImageURL} />
          </Option>
        ))}
      </div>
      <button
        data-testid="submit-button"
        disabled={status !== PracticeStatus.IDLE}
        className={`p-2  font-bold rounded-lg ${getButtonColor()}`}
        type="button"
        onClick={() => onSubmit(id, selection)}
      >
        Check
      </button>
    </div>
  );
};

export default Practice;
