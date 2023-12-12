import { getFilePreview, getFiles } from "@/app/lib/http/files";
import FileCard from "@/app/ui/files/FileCard";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/(pages)/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";

export interface IFile {
  name: string;
  upload_date: string;
  dataUrl?: string;
  id: string;
}

export default async function Page() {
  const session: Session | null = await getServerSession(authOptions);

  const token = session?.user?.access_token || "";

  const filesList = (await getFiles(token)) || [];

  // const filesWithPreview = [];

  // for (const file of filesList) {
  //   const extension = file.name.substring(file.name.lastIndexOf(".") + 1);
  //   if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
  //     const dataUrl = await getFilePreview(token, file.id);
  //     filesWithPreview.push({ ...file, dataUrl });
  //   } else {
  //     filesWithPreview.push({ ...file });
  //   }
  // }

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
