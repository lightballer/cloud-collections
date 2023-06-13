import React, { useCallback, useState, useRef } from "react";

import "./Upload.css";
import useAuth from "useAuth";
import { upload } from "http/files";

const Upload = () => {
  const { getToken } = useAuth();

  const [files, setFiles] = useState([]);

  const handleFileChange = useCallback((event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) setFiles((oldFiles) => [...oldFiles, ...selectedFiles]);
  }, []);

  const fileInputRef = useRef(null);

  const handleSelectFileClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadClick = async () => {
    const token = getToken();
    const file = files[0];

    upload(token, file).then((uploadResult) => {
      window.location.reload();
    });
  };

  return (
    <div className="upload__container">
      <form onSubmit={handleUploadClick} className="input__wrapper">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="input__file"
          accept="*"
        />
        {!files.length && (
          <button
            type="button"
            className="input__file-button"
            onClick={handleSelectFileClick}
          >
            Select file
          </button>
        )}
        {files.length > 0 && (
          <button
            type="button"
            className="input__file-button"
            onClick={handleUploadClick}
          >
            Upload
          </button>
        )}
      </form>
      <ul className="list-group list-group-flush">
        {files.map((file, i) => (
          <li className="list-group-item list-group-item-fixed" key={i}>
            {file?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Upload;
