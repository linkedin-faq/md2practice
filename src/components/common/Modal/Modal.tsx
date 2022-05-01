interface Props {
  show: boolean;
  children: React.ReactNode;
  onShowChanged: React.MouseEventHandler<HTMLDivElement>;
}

const Modal = (props: Props) => {
  // const [show, setShow] = useState(props.show);
  const { show, onShowChanged } = props;

  return (
    <>
      {show ? (
        <>
          <div
            // onClick={() => setShow(false)}
            onClick={onShowChanged}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
              {/* {content} */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 dark:bg-gray-800 outline-none focus:outline-none">
                {props.children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
