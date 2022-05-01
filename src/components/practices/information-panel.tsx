import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PracticeStatus } from '../practice/practice';
import CustomPieChart from './piechart';
import { PracticesData } from './practices';

const HomeSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 tablet:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const RefreshSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 tablet:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

interface InformationPanelProps {
    data: PracticesData
    onNavigatePractice: (id: number) =>void
    onResetPractices?: () => void
}

const InformationPanel: React.FC<InformationPanelProps> = ({
  data, onNavigatePractice, onResetPractices,
}) => {
  const navigate = useNavigate();
  const practiceItems = Object.values(data);
  const idle = practiceItems.filter((item) => item.status === PracticeStatus.IDLE).length;
  const wrong = practiceItems.filter((item) => item.status === PracticeStatus.WRONG).length;
  const correct = practiceItems.filter((item) => item.status === PracticeStatus.CORRECT).length;
  const done = correct + wrong;

  const getStatusColor = (status: PracticeStatus) => {
    switch (status) {
      case PracticeStatus.CORRECT:
        return 'text-green-800 font-bold';
      case PracticeStatus.WRONG:
        return 'text-red-800 font-bold';
      default:
        return '';
    }
  };

  return (
    <div
      data-testid="information-panel"
      className="relative w-3/4 desktop:w-1/2 h-3/5 no-scrollbar overflow-y-scroll mx-auto top-10 p-2 bg-primary-dark-800 select-none border-2 rounded-lg"
      onClick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <div id="panel-header">
        <button className="p-1" type="button" data-testid="homepage-button" onClick={() => navigate('/')}>
          <HomeSVG />
        </button>
        {onResetPractices ? (
          <button className="p-1" type="button" data-testid="reset-button" onClick={onResetPractices}>
            <RefreshSVG />
          </button>
        ) : null}
      </div>
      <div id="result-visualization">
        <div className="flex my-5 justify-around ">
          <div className="w-full tablet:w-2/3">
            <div className="tablet:hidden p-1 font-bold">
              FINISHED:
              {done}
            </div>
            <div className="tablet:hidden p-1 font-bold">
              IDLE:
              <span className="font-normal">{idle}</span>
            </div>
            {done !== 0 ? (
              <div className="h-40 tablet:60" data-testid="result-visualization">
                <CustomPieChart data={[{ name: 'Correct', value: correct }, { name: 'Wrong', value: wrong }]} />
              </div>
            ) : (
              <p className="p-2 py-4 text-center">No Data Available Yet.</p>
            )}
          </div>
          <div className="justify-around items-center hidden tablet:flex tablet:flex-col text-center">
            <div className="shadow w-full border-2 p-2 rounded-lg border-gray-400">
              <p className="border-b-2 p-2 border-gray-400 font-bold">FINISHED</p>
              <p className="p-2">{done}</p>
            </div>
            <div className="shadow w-full border-2 p-2 rounded-lg border-gray-400">
              <p className="border-b-2 p-2 border-gray-400 font-bold">IDLE</p>
              <p className="p-2">{idle}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="navigate-practices"
        className="p-2
            grid grid-cols-5 gap-4 justify-items-center"
      >
        {Object.entries(data).map(([id, item]) => (
          <button
            type="button"
            data-testid={`practice-navigation-${id}`}
            className={`${getStatusColor(item.status)} w-6 border-b-2 border-transparent hover:border-b-2 hover:border-primary-dark-50`}
            key={id}
            onClick={() => onNavigatePractice(Number(id))}
          >
            {Number(id) + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InformationPanel;
