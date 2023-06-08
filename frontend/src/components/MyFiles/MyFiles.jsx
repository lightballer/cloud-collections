import { useEffect, useState } from "react";

import "./MyFiles.css";
import { getFilePreview, getFiles } from "../http/files";
import FileCard from "../FileCard";
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
      })
      .then((files) => {
        setFilesList(files);
        setIsLoading(false);
      });
  }, []);

  const handleSaveClick = (id, filename) => {
    // send updated data
    const token = getToken();
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/files/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: filename }),
    })
      .then((data) => data.json())
      .catch((err) => console.error(err));
    // request updated file data
    window.location.reload();
  };

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
          <FileCard key={file.id} file={file} onSaveClick={handleSaveClick} />
        ))}
      </div>
    </div>
  );
};

export default MyFiles;
