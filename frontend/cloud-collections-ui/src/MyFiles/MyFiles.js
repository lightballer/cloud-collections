import { useEffect, useState } from "react";

import "./MyFiles.css";
import { getFiles } from "../http/files";
import File from "../File";

const MyFiles = () => {
  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    getFiles().then((files) => setFilesList(files));
  }, []);

  return (
    <div className="files-list_container">
      {filesList.map((file) => (
        <File key={file.id} file={file} />
      ))}
    </div>
  );
};

export default MyFiles;
