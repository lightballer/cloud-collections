import { useEffect, useState } from "react";

import "./MyFiles.css";
import { getFiles } from "../http/files";
import File from "../File";
import React from "react";

const MyFiles = () => {
  const [filesList, setFilesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFiles().then((files) => {
      setFilesList(files);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="files-list_container">
      <div className="card-deck cards-container">
        {filesList.map((file) => (
          <File key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default MyFiles;
