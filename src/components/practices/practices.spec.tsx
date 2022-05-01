import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Practices } from './practices';
import { mockedPractices } from './__mocks__/practices.mock';
import '@testing-library/jest-dom';
import { PracticeStatus } from '../practice/practice';

jest.mock('recharts', () => {
  const original = jest.requireActual('recharts');
  return {
    ...original,
    // eslint-disable-next-line react/jsx-props-no-spreading
    ResponsiveContainer: (props:any) => <div {...props} />,
  };
});
// jest.mock('react-router-dom', () => {
//   const original = jest.requireActual('react-router-dom');
//   return {
//     ...original,
//     // eslint-disable-next-line react/jsx-props-no-spreading
//     useNavigate: () => jest.fn(),
//   };
// });

const renderWithRouterProvider = (children: JSX.Element) => {
  render(<MemoryRouter>{children}</MemoryRouter>);
};

describe('Practices Component', () => {
  const TOTAL_MOCKED_PRACTICES = 3;
  const defaultPractices = mockedPractices(TOTAL_MOCKED_PRACTICES);
  const mockedHandleSubmit = jest.fn();
  const mockedHandleChange = jest.fn();

  it('should be able to render a set of practices', () => {
    const alotPractices = mockedPractices(20);
    renderWithRouterProvider(<Practices
      data={alotPractices}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleChange}
    />);
    const practices = screen.getAllByTestId('practice-component');
    expect(practices).toHaveLength(20);
  });

  it('should be able to submit one of the practice', async () => {
    const practiceId = 1;
    renderWithRouterProvider(<Practices
      data={defaultPractices}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleChange}
    />);
    const practices = screen.getAllByTestId('practice-component');
    expect(practices).toHaveLength(TOTAL_MOCKED_PRACTICES);
    const submit = within(practices[practiceId]).getByRole('button');
    await userEvent.click(submit);
    expect(mockedHandleSubmit).toBeCalled();
  });

  it('should be able to display and close information panel', async () => {
    renderWithRouterProvider(<Practices
      data={defaultPractices}
      onSubmit={mockedHandleSubmit}
      onSelectionChange={mockedHandleChange}
    />);

    const actionButton = screen.getByTestId('action-button');
    await userEvent.click(actionButton);
    expect(screen.queryByTestId('information-panel')).toBeInTheDocument();
    const modal = screen.getByTestId('modal');
    await userEvent.click(modal);
    expect(screen.queryByTestId('information-panel')).not.toBeInTheDocument();
  });

  describe('Information Panel', () => {
    it('should navigate to the practice selected in the information panel', async () => {
      window.scrollTo = jest.fn();
      renderWithRouterProvider(<Practices
        data={defaultPractices}
        onSubmit={mockedHandleSubmit}
        onSelectionChange={mockedHandleChange}
      />);
      const actionButton = screen.getByTestId('action-button');
      await userEvent.click(actionButton);
      const practice = screen.getByTestId(`practice-navigation-${TOTAL_MOCKED_PRACTICES - 1}`);
      await userEvent.click(practice);
      expect(window.scrollTo).toBeCalled();
    });

    it('should display result visualization if there is question answered', async () => {
      const practices = mockedPractices(3);
      practices[0].status = PracticeStatus.CORRECT;
      practices[1].status = PracticeStatus.WRONG;
      renderWithRouterProvider(<Practices
        data={practices}
        onSubmit={mockedHandleSubmit}
        onSelectionChange={mockedHandleChange}
      />);
      const actionButton = screen.getByTestId('action-button');
      await userEvent.click(actionButton);
      expect(screen.queryByTestId('information-panel')).toBeInTheDocument();
      expect(screen.queryByTestId('result-visualization')).toBeInTheDocument();
    });

    it('should reset practice if reset button is clicked', async () => {
      const resetHandler = jest.fn();
      renderWithRouterProvider(<Practices
        data={defaultPractices}
        onSubmit={mockedHandleSubmit}
        onSelectionChange={mockedHandleChange}
        onResetPractices={resetHandler}
      />);
      const actionButton = screen.getByTestId('action-button');
      await userEvent.click(actionButton);
      await userEvent.click(screen.getByTestId('reset-button'));
      expect(resetHandler).toBeCalled();
      // Test home button is working
      await userEvent.click(screen.getByTestId('homepage-button'));
    });
  });
});
