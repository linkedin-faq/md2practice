import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Practice, { OptionStatus, PracticeStatus } from './practice';
import { mockedPractice, mockedSelection } from './__mocks__/data.mock';
import '@testing-library/jest-dom';

describe('test practice component', () => {
  const defaultPractice = mockedPractice(mockedSelection(4));
  const mockedHandleSubmit = jest.fn();
  const mockedHandleOnChange = jest.fn();
  const CORRECT_CLASS = 'from-green-800';
  const WRONG_CLASS = 'from-red-800';

  it('should be able to render data, like question and selection correctly', () => {
    const data = defaultPractice;
    render(<Practice
      id={1}
      rawQuestion={data.rawQuestion}
      selection={data.selection}
      answers={data.answers}
      status={data.status}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleOnChange}
    />);
    const question = screen.getByLabelText('question-container');
    expect(question).toHaveTextContent(data.rawQuestion);
    data.selection.forEach((item) => {
      expect(screen.getByText(item.rawOption)).toBeInTheDocument();
    });
  });

  it('should be able to submit data', async () => {
    const data = defaultPractice;
    render(<Practice
      id={1}
      rawQuestion={data.rawQuestion}
      selection={data.selection}
      answers={data.answers}
      status={data.status}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleOnChange}
    />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockedHandleSubmit).toBeCalled();
  });

  it('should be able to check on radiobox', async () => {
    const data = defaultPractice;
    render(<Practice
      id={1}
      rawQuestion={data.rawQuestion}
      selection={data.selection}
      answers={data.answers}
      status={data.status}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleOnChange}
    />);
    const options = screen.getAllByRole('radio');
    await userEvent.click(options[1]);
    expect(mockedHandleOnChange).toBeCalledWith(1, expect.arrayContaining([
      expect.objectContaining({
        rawOption: data.selection[1].rawOption,
        status: OptionStatus.SELECTED,
      }),
    ]));
    await userEvent.click(options[0]);
    expect(mockedHandleOnChange).toBeCalledWith(1, expect.arrayContaining([
      expect.objectContaining({
        rawOption: data.selection[0].rawOption,
        status: OptionStatus.SELECTED,
      }),
    ]));

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockedHandleSubmit).toBeCalledWith(1, data.selection);
  });

  it('should be able to check on checkbox', async () => {
    const data = defaultPractice;
    render(<Practice
      id={1}
      rawQuestion={data.rawQuestion}
      selection={data.selection}
      answers={[0, 1]}
      status={data.status}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleOnChange}
    />);
    const options = screen.getAllByRole('checkbox');
    await userEvent.click(options[1]);
    await userEvent.click(options[0]);
    await userEvent.click(options[2]);
    await userEvent.click(options[2]);
    expect(mockedHandleOnChange).toBeCalledWith(1, expect.arrayContaining([
      {
        rawOption: data.selection[0].rawOption,
        status: OptionStatus.SELECTED,
      },
      {
        rawOption: data.selection[1].rawOption,
        status: OptionStatus.SELECTED,
      },
    ]));

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockedHandleSubmit).toBeCalledWith(1, data.selection);
  });

  it('should be able to show the correct answer for radio group', () => {
    const selection = mockedSelection(4);
    selection[0].status = OptionStatus.CORRECT;
    const practice = mockedPractice(selection);
    practice.status = PracticeStatus.CORRECT;

    render(<Practice
      id={1}
      rawQuestion={practice.rawQuestion}
      selection={practice.selection}
      answers={[0]}
      status={practice.status}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleOnChange}
    />);
    const options = screen.getAllByRole('radio');
    expect(options[0].parentElement).toHaveClass(CORRECT_CLASS);
    expect(1).toBe(1);
  });

  it('should be able to show the wrong answer for radio group', () => {
    const selection = mockedSelection(4);
    selection[0].status = OptionStatus.WRONG;
    selection[1].status = OptionStatus.CORRECT;
    const practice = mockedPractice(selection);
    practice.status = PracticeStatus.WRONG;

    render(<Practice
      id={1}
      rawQuestion={practice.rawQuestion}
      selection={practice.selection}
      answers={[1]}
      status={practice.status}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleOnChange}
    />);
    const options = screen.getAllByRole('radio');
    // Wrong option
    expect(options[0].parentElement).toHaveClass(WRONG_CLASS);
    // Indicate correct option
    expect(options[1].parentElement).toHaveClass(CORRECT_CLASS);
    expect(1).toBe(1);
  });
});
