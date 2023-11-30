'use client';

import { useState } from "react";
// import useAuth from "useAuth";
// import FilePreview from "@/app/ui/myfiles/FilePreview";
import Modal from "react-modal";
// import { deleteFile, getFilePreview, updateFilename } from "http/files";

export interface IFile {
  name: string;
  upload_date: string;
  dataUrl?: string;
  id: string;
}

interface Props {
  file: IFile;
}

const FileCard = ({ file }: Props) => {
  const { name, upload_date, dataUrl, id } = file;

  const fileName = name.substring(0, name.lastIndexOf("."));
  const fileExtension = name.substring(name.lastIndexOf(".") + 1);

//   const { getToken } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(fileName);

  const handleDownloadClick = () => {
    // const token = getToken();
    // getFilePreview(token, id).then((dataUrl) => {
    //   if (!dataUrl) return;
    //   const link = document.createElement("a");
    //   link.href = dataUrl;
    //   link.download = name;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // setIsEditing(false);
    // const token = getToken();
    // const filename = `${editedName}.${fileExtension}`;
    // updateFilename(token, id, filename).then(() => window.location.reload());
  };

  const handleDeleteClick = () => {
    // const token = getToken();

    // deleteFile(token, id).then(() => {
    //   window.location.reload();
    // });
  };

  const date = upload_date ? upload_date.split("T")[0] : "";

  const handleViewClick = () => {
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  if (isOpen) {
    console.log({ id });
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        {/* <FilePreview id={id} name={name} /> */}
      </Modal>
    );
  }
  const extension = file.name.substring(file.name.lastIndexOf(".") + 1);

  return (
    <div className="card mx-3 smaller-card">
      {dataUrl ? (
        <img className="card-img-top" src={dataUrl} alt="file" />
      ) : (
        <div
          className="card-img-top"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "50px", overflow: "hidden" }}>
            <code>{extension.toUpperCase()}</code>
          </div>
        </div>
      )}
      <div className="card-body">
        <div
          className="d-flex align-items-center"
          style={{ overflow: "hidden" }}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="form-control mr-2"
              />
              <span className="text-muted">{`.${fileExtension}`}</span>
            </>
          ) : (
            <>
              <h6 className="card-title">{fileName}</h6>
              <span className="text-muted">{`.${fileExtension}`}</span>
            </>
          )}
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">Uploaded at: {date}</small>
        {isEditing ? (
          <button onClick={handleSaveClick} className="btn btn-success mt-2">
            Save
          </button>
        ) : (
          <button onClick={handleEditClick} className="btn btn-secondary mt-2">
            <i className="fas fa-pencil-alt"></i> Edit title
          </button>
        )}
        <button onClick={handleDownloadClick} className="btn btn-primary mt-2">
          Download
        </button>
        <button onClick={handleViewClick} className="btn btn-primary mt-2">
          View
        </button>
        <button onClick={handleDeleteClick} className="btn btn-danger mt-2">
          Delete
        </button>
      </div>
    </div>
  );
};

export default FileCard;
