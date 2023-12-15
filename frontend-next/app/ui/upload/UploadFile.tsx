"use client";

import { upload } from "@/app/lib/http/files";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useRef } from "react";

const UploadFile = () => {
  const session = useSession();

  const [files, setFiles] = useState<FileList>();
  const router = useRouter();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (selectedFiles) setFiles(selectedFiles);
    },
    []
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = async () => {
    console.log("upload click");
    if (!files) return;
    const token = session?.data?.user.access_token || "";
    const file = files[0];

    try {
      const uploadResult = await upload(token, file);
      console.log(uploadResult);
    } catch (err) {
      console.log(err);
    }
    router.push("/files");
  };

  return (
    <>
      <form onSubmit={handleUploadClick} className="p-5">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="input__file text-3xl"
          accept="*"
        />
        {!files && (
          <button
            type="button"
            className="options-btn text-3xl !w-max"
            onClick={handleSelectFileClick}
          >
            Select file
          </button>
        )}
        {files && (
          <button
            type="button"
            className="options-btn text-3xl !w-max"
            onClick={handleUploadClick}
          >
            Upload
          </button>
        )}
      </form>
      {files && <FileName name={files[0].name} />}
    </>
  );
};

const FileName = ({ name }: { name: string }) => {
  return (
    <div className="list-group list-group-flush">
      <div className="list-group-item list-group-item-fixed">{name}</div>
    </div>
  );
};

export default UploadFile;
