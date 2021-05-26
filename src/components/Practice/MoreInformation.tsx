import { Map } from "immutable";
import { Link } from "react-router-dom";
import { Response } from "../../contexts/practice-context";
import { ChallengeStatus } from "../../quiz-too";

import { ReactComponent as Homepage } from "./homepage.svg";
import PracticePieChart from "./PracticePieChart";

interface Props {
  sessionData: Map<number, Response>;
  onClickItem: (id: number) => void;
}

const MoreInformation = (props: Props) => {
  const { sessionData } = props;

  const getStatusColor = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.CORRECT: {
        return "text-green-500 font-extrabold";
      }
      case ChallengeStatus.WRONG: {
        return "text-red-500 font-extrabold";
      }
      default: {
        return "font-normal";
      }
    }
  };

  return (
    <div className="p-4">
      <HomepageButton />
      <AccuracyBoard sessionData={sessionData} />
      <div className="p-4 overflow-y-scroll no-scrollbar h-60">
        <div className="grid grid-flow-row-dense grid-cols-6 md:grid-cols-9 xl:grid-cols-12 gap-4">
          {sessionData.entrySeq().map(([key, value]) => {
            return (
              <span
                className={`cursor-pointer p-1 text-center font-thin border-transparent border-b-2 rounded-md hover:border-primary-700 dark:hover:border-gray-100 ${getStatusColor(
                  value.status
                )}`}
                key={key}
                onClick={() => props.onClickItem(key)}
              >
                {key}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface DisplayBoardProps {
  sessionData: Map<number, Response>
}

const AccuracyBoard = (props: DisplayBoardProps) => {
  const sessionData = props.sessionData

  const idleCount = sessionData
    .filter((item) => item.status === ChallengeStatus.IDLE)
    .count();
  const correctCount = sessionData
    .filter((item) => item.status === ChallengeStatus.CORRECT)
    .count();
  const wrongCount = sessionData
    .filter((item) => item.status === ChallengeStatus.WRONG)
    .count();

  const pieData = [
    { name: "Correct", value: correctCount },
    { name: "Wrong", value: wrongCount },
  ];
  const pieTotal = pieData.reduce((total, item) => total + item.value, 0);
  

  const PieDisplay = () => {
    return (
      <>
        {pieTotal !== 0 ? (
          <div className="h-60">
            <PracticePieChart data={pieData} />
          </div>
        ) : (
          <p className="p-2 py-4 text-center">No Data Available Yet.</p>
        )}
      </>
    )
  }

  return (
    <div className="flex mt-5 justify-around ">
      <div className="w-full md:w-2/3 ">
        <div className="md:hidden p-1 font-bold">FINISHED: <span className="font-normal">{pieTotal}</span></div>
        <div className="md:hidden p-1 font-bold">IDLE: <span className="font-normal">{idleCount}</span></div>
        <PieDisplay/>
      </div>
      <div className="justify-around items-center hidden md:flex md:flex-col text-center">
        <div className="shadow w-full border-2 p-2 rounded-lg border-gray-400">
          <p className="border-b-2 p-2 border-gray-400 font-bold">FINISHED</p>
          <p className="p-2">{pieTotal}</p>
        </div>
        <div className="shadow w-full border-2 p-2 rounded-lg border-gray-400">
          <p className="border-b-2 p-2 border-gray-400 font-bold">IDLE</p>
          <p className="p-2">{idleCount}</p>
        </div>
      </div>
    </div>
  );
};

const HomepageButton = () => {
  return (
    <Link to="/">
      <button className="inline-flex rounded-full shadow items-center p-3 dark:bg-gray-700 dark:hover:bg-gray-900 bg-gray-200 hover:bg-gray-300">
        <span>HOMEPAGE</span>
        <Homepage className="ml-2 w-5 h-5 dark:text-white text-gray-900 fill-current" />
      </button>
    </Link>
  );
};

export default MoreInformation;
