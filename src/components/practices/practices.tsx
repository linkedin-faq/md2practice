/* eslint-disable react/jsx-props-no-spreading */
import {
  useDrag, useScroll,
} from '@use-gesture/react';
import React, {
  createRef,
  memo, useEffect, useRef, useState,
} from 'react';
import { useSpring, animated } from 'react-spring';
import Modal from '../common/modal';
import Practice, { PracticeParams, SelectionOption } from '../practice/practice';
import InformationPanel from './information-panel';

export type PracticesData = Record<number, PracticeParams>

const MemoizedPractice = memo(Practice);

const Cube: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
interface PracticesProps {
    data: PracticesData;
    baseImageURL?: string;
    onSubmit: (id: number, selection: SelectionOption[]) => void;
    onSelectionChange: (id: number, selection: SelectionOption[]) => void;
    onResetPractices?: () => void;
    onShuffleQuestions?: () => void;
}

export const Practices: React.FC<PracticesProps> = (
  {
    data, baseImageURL, onSubmit, onSelectionChange, onResetPractices, onShuffleQuestions,
  },
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const practiceRefs = Object.keys(data).map(() => createRef<HTMLDivElement>());
  const [{ x: actionButtonX, y: actionButtonY }, api] = useSpring(() => ({ x: 0, y: 0 }));

  /* istanbul ignore next */
  useScroll(({ offset }) => {
    api.start({
      y: offset[1], immediate: true,
    });
  }, {
    from: () => [actionButtonX.get(), actionButtonY.get()],
    target: window,
    bounds: { top: 0, bottom: maxHeight },
  });

  /* istanbul ignore next */
  const bindAction = useDrag(({ offset: [x, y], down }) => {
    api.start({
      x: down ? x : 0, y, immediate: down,
    });
  }, {
    from: () => [actionButtonX.get(), actionButtonY.get()],
    bounds: wrapperRef,
    rubberband: true,
    filterTaps: true,
  });

  useEffect(() => {
    if (wrapperRef.current) {
      setMaxHeight(wrapperRef.current.clientHeight);
    }
  });

  const handleNavigatePractice = (id: number) => {
    setIsOpen(!isOpen);
    if (practiceRefs) {
      window.scrollTo({
        top: practiceRefs[id].current?.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={wrapperRef} className="mt-10">
      <Modal show={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <InformationPanel
          data={data}
          onNavigatePractice={handleNavigatePractice}
          onResetPractices={onResetPractices}
          onShuffleQuestions={onShuffleQuestions}
        />
      </Modal>
      {/* <div className="relative float-right" id="action-button-space"> */}
      <animated.div
        data-testid="action-button"
        className="my-2 p-2 border-2 rounded-full w-fit bg-secondary-dark-500 z-10 absolute right-2 shadow"
        style={{
          x: actionButtonX, y: actionButtonY, touchAction: 'none',
        }}
        {...bindAction()}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cube />
      </animated.div>
      {/* </div> */}

      {Object.entries(data).map(([key, practice]) => (
        <div
          ref={practiceRefs[Number(key)]}
          key={key}
          className="border rounded-lg my-2 p-2"
        >
          <MemoizedPractice
            id={Number(key)}
            rawQuestion={practice.rawQuestion}
            selection={practice.selection}
            answers={practice.answers}
            status={practice.status}
            onSubmit={onSubmit}
            onSelectionChange={onSelectionChange}
            baseImageURL={baseImageURL}
          />
        </div>
      ))}
    </div>
  );
};
