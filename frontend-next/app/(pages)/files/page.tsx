import { getFiles } from "@/app/lib/http/files";
import FileCard from "@/app/ui/files/FileCard";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/(pages)/api/auth/[...nextauth]/route";

export interface IFile {
  name: string;
  upload_date: string;
  dataUrl?: string;
  id: string;
}

export default async function Page() {
  const session: Session | null = await getServerSession(authOptions);
  // console.log({ session });
  const filesList = (await getFiles(session?.user?.access_token || "")) || [];
  // console.log({ filesList });

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
