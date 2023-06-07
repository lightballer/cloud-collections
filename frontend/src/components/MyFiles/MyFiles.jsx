import { useEffect, useState } from "react";

import "./MyFiles.css";
import { getFilePreview, getFiles } from "../http/files";
import File from "../File";
import React from "react";
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
          const dataUrl = await getFilePreview(token, file.id);
          console.log({ dataUrl });
          filesWithPreview.push({ ...file, dataUrl });
        }
        return filesWithPreview;

        // return files.map(async (file) => {
        //   const dataUrl = await getFilePreview(token, file.id);
        //   console.log({ dataUrl });
        //   return {...file, dataUrl}
        //});
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
          <File key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default MyFiles;
