import React, { useCallback, useState, useRef } from "react";

import "./Upload.css";
import useAuth from "useAuth";

const Upload = () => {
  const { getToken } = useAuth();

  const [files, setFiles] = useState([]);

  const handleFileChange = useCallback((event) => {
    const selectedFiles = event.target.files;
    console.log({ selectedFiles });
    if (selectedFiles) setFiles((oldFiles) => [...oldFiles, ...selectedFiles]);
  }, []);

  const fileInputRef = useRef(null);

  const handleSelectFileClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadClick = async () => {
    const token = getToken();
    const file = files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target.result;

      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_BACKEND_URL}/files/${file.name}`,
          {
            method: "POST",
            body: fileContent,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": file.type,
            },
          }
        );

        if (response.ok) {
          console.log("File sent successfully");
        } else {
          console.error(
            "Failed to send file:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error sending file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="upload__container">
      <form onSubmit={handleUploadClick} className="input__wrapper">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="input__file"
          // accept="audio/*,video/*,image/*,.pdf,.doc,.docx,.xls,.xlsx"
          accept="*"
          // multiple
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
