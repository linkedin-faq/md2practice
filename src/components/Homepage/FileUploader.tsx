import FileUploaderIcon from "./FileUploaderIcon";

interface Props {
  handleFileUpload: React.ChangeEventHandler<HTMLInputElement>;
}

const FileUploader = (props: Props): JSX.Element => {
  return (
    <span>
      <label htmlFor="file-upload" className="cursor-pointer">
        <FileUploaderIcon />
      </label>
      <input className="hidden" id="file-upload" type="file" name="file-upload" onChange={props.handleFileUpload} />
    </span>
  );
};

export default FileUploader;
