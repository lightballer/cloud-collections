import React, { useEffect, useState } from "react";

import "./MyFiles.css";
import { getFilePreview, getFiles, updateFilename } from "../../http/files";
import FileCard from "../FileCard";
import useAuth from "useAuth";

const MyFiles = () => {
  const { getToken } = useAuth();

  const [filesList, setFilesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    getFiles(token)
      .then(async (files) => {
        const filesWithPreview = [];
        for (const file of files) {
          const extension = file.name.substring(file.name.lastIndexOf(".") + 1);
          if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
            const dataUrl = await getFilePreview(token, file.id);
            filesWithPreview.push({ ...file, dataUrl });
          } else {
            filesWithPreview.push({ ...file });
          }
        }
        return filesWithPreview;
      })
      .then((files) => {
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
          <FileCard key={file.id} file={file}  />
        ))}
      </div>
    </div>
  );
};

export default MyFiles;
