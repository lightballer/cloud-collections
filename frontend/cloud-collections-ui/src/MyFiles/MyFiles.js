import { useEffect, useState } from "react";

import "./MyFiles.css";
import { getFiles } from "../http/files";

const MyFiles = () => {
  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    getFiles().then((files) => setFilesList(files));
  }, []);

  return (
    <div className="files-list_container">
      {filesList.map((file) => (
        <div className="file_container" key={file.id}>
          <p className="file_name">{file.name}</p>
          <p className="file_updatedAt">{file.updatedAt}</p>
          <img alt="file" src={file.url} />
        </div>
      ))}
    </div>
  );
};

export default MyFiles;
