"use client";

import { getFiles } from "@/app/lib/http/files";
import FileCard from "@/app/ui/files/FileCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface IFile {
  name: string;
  upload_date: string;
  dataUrl?: string;
  id: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const [filesList, setFilesList] = useState<IFile[]>([]);

  useEffect(() => {
    if (session?.data?.user?.access_token) {
      getFiles(session.data.user.access_token).then((files) => {
        setFilesList(files);
        setIsLoading(false);
      });
    }
  }, [session]);

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
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
