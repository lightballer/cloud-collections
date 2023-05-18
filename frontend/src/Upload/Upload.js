import { useCallback, useState, useRef } from "react";

import "./Upload.css";

const Upload = () => {
  const [files, setFiles] = useState([]);

  const handleUploadClick = useCallback(() => {
    console.log("uploading...");
  }, []);

  const handleFileChange = useCallback((event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) setFiles((oldFiles) => [...oldFiles, ...selectedFiles]);
  }, []);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  console.log(files);

  return (
    <div className="upload__container">
      <form onSubmit={handleUploadClick} className="input__wrapper">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="input__file"
          accept="audio/*,video/*,image/*,.pdf,.doc,.docx,.xls,.xlsx"
          multiple
        />
        <button
          type="button"
          className="input__file-button"
          onClick={handleButtonClick}
        >
          Select file
        </button>
      </form>
      <ul className="list-group">
        {files.map((file, i) => (
          <li className="list-group-item" key={i}>{file?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Upload;
