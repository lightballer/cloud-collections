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
    return (
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <FilePreview id={id} name={name} />
      </Modal>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-60 h-100 m-10 bg-slate-300 border-2 border-slate-400 rounded-lg shadow-2xl">
        <div>
          {isImage ? (
            <Image
              className="object-contain w-60 h-60"
              src={dataUrl}
              height={50}
              width={50}
              alt="file"
            />
          ) : (
            <div className="w-60 h-60 flex justify-center items-center">
              <div className="text-5xl text-pink-700 uppercase overflow-hidden">
                <code>{extension.toUpperCase()}</code>
              </div>
            </div>
          )}
        </div>

        <div className="">
          <div className="flex items-center h-8 pl-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="p-1"
                />
                <span>{`.${fileExtension}`}</span>
              </>
            ) : (
              <>
                <h6 className="truncate">{fileName}</h6>
                <span>{`.${fileExtension}`}</span>
              </>
            )}
          </div>
          <div className=" text-gray-500 pl-2 text-sm">
            <span>Uploaded at: {date}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {isEditing ? (
            <button onClick={handleSaveClick} className="options-btn m-2">
              Save
            </button>
          ) : (
            <button onClick={handleEditClick} className="options-btn m-2">
              <i className="fas fa-pencil-alt"></i> Edit title
            </button>
          )}
          <button onClick={handleDownloadClick} className="options-btn m-2">
            Download
          </button>
          <button onClick={handleViewClick} className="options-btn m-2">
            View
          </button>
          <button
            onClick={handleDeleteClick}
            className="options-btn !text-red-600 m-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
