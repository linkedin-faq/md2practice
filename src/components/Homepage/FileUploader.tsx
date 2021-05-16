// import FileUploaderIcon from "./FileUploaderIcon";
import { ReactComponent as FileUploaderIcon } from "./fileUploaderIcon.svg";

interface Props {
  handleFileUpload: React.ChangeEventHandler<HTMLInputElement>;
}

const FileUploader = (props: Props): JSX.Element => {
  return (
    <span className="flex justify-center ml-2 w-1/3 p-1 text-gray-100 bg-secondary-500 shadow rounded-full border-2 border-gray-300 dark:border-gray-100">
      <label
        htmlFor="file-upload"
        className="flex justify-center cursor-pointer items-center w-full"
      >
        <p className="font-semibold text-xs hidden lg:block mr-1">
          Upload File
        </p>
        <FileUploaderIcon
          className="fill-current text-gray-100"
          width="24px"
          height="24px"
        />
      </label>
      <input
        className="hidden"
        id="file-upload"
        type="file"
        name="file-upload"
        onChange={props.handleFileUpload}
      />
    </span>
  );
};

export default FileUploader;
