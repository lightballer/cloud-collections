'use client';

import React, { useCallback, useState, useRef } from "react";

// import useAuth from "useAuth";
// import { upload } from "http/files";

export default function Page() {
//   const { getToken } = useAuth();

  const [files, setFiles] = useState<FileList>();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (selectedFiles) setFiles(selectedFiles);
    },
    []
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = async () => {
    // if (!files) return;

    // const token = getToken();
    // const file = files[0];

    // upload(token, file).then((uploadResult) => {
    //   console.log(uploadResult);
    //   window.location.reload();
    // });
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
        {!files && (
          <button
            type="button"
            className="input__file-button"
            onClick={handleSelectFileClick}
          >
            Select file
          </button>
        )}
        {files && (
          <button
            type="button"
            className="input__file-button"
            onClick={handleUploadClick}
          >
            Upload
          </button>
        )}
      </form>
      {files && (
        <div className="list-group list-group-flush">
          <div className="list-group-item list-group-item-fixed">
            {files[0].name}
          </div>
        </div>
      )}
    </div>
  );
};
