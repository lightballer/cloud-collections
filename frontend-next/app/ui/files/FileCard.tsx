"use client";

import useGetToken from "@/app/lib/hooks/useGetToken";
import {
  deleteFile,
  getFilePreview,
  updateFilename,
} from "@/app/lib/http/files";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import FilePreview from "@/app/ui/files/FilePreview";
import { IFile } from "@/types/IFile";
import { parseFileName } from "@/app/ui/files/parseFileName";

interface Props {
  file: IFile;
}

const FileCard = ({ file }: Props) => {
  const router = useRouter();

  const { token } = useGetToken();

  const { name, upload_date, id } = file;

  const { extension, isImage } = parseFileName(name);

  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (token) {
      getFilePreview(token, id).then((dataUrl: string | null) => {
        if (dataUrl) setDataUrl(dataUrl);
      });
    }
  }, [id, token]);

  const fileName = name.substring(0, name.lastIndexOf("."));
  const fileExtension = name.substring(name.lastIndexOf(".") + 1);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(fileName);

  const handleDownloadClick = () => {
    getFilePreview(token, id).then((dataUrl) => {
      console.log({ dataUrl });
      if (!dataUrl) return;
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const filename = `${editedName}.${fileExtension}`;
    updateFilename(token, id, filename).then(() => router.refresh());
  };

  const handleDeleteClick = () => {
    deleteFile(token, id).then((deleteResult) => {
      console.log({ deleteResult });
      router.refresh();
    });
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
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <FilePreview id={id} name={name} />
      </Modal>
    );
  }

  return (
    <div className="card mx-3 smaller-card">
      {isImage ? (
        <Image
          className="card-img-top"
          src={dataUrl}
          height={50}
          width={50}
          alt="file"
        />
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
