import React, { useState } from "react";
import "./FileCard.css";
import useAuth from "useAuth";
import FilePreview from "components/FilePreview/FilePreview";
import Modal from "react-modal";

const FileCard = ({ file, onSaveClick }) => {
  const { name, upload_date, dataUrl, id } = file;

  const fileName = name.substring(0, name.lastIndexOf("."));
  const fileExtension = name.substring(name.lastIndexOf(".") + 1);

  const { getToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(fileName);

  const handleDownloadClick = () => {
    const downloadUrl = dataUrl;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const filename = `${editedName}.${fileExtension}`;
    onSaveClick(id, filename);
  };

  const handleDeleteClick = () => {
    const token = getToken();
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/files/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        window.location.reload();
      });
  };

  const date = upload_date ? upload_date.split("T")[0] : "";

  const handleViewClick = () => {
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>Close</button>
        <FilePreview id={id} />
      </Modal>
    );
  }

  return (
    <div className="card mx-3 smaller-card">
      <img className="card-img-top" src={dataUrl} alt="file" />
      <div className="card-body">
        <div className="d-flex align-items-center">
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
        <small className="text-muted">Last updated at: {date}</small>
        {isEditing ? (
          <button onClick={handleSaveClick} className="btn btn-success mt-2">
            Save
          </button>
        ) : (
          <button onClick={handleEditClick} className="btn btn-secondary mt-2">
            <i className="fas fa-pencil-alt"></i> Edit
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
