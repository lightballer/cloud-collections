import { authOptions } from "@/app/(pages)/api/auth/[...nextauth]/route";
import { getFiles } from "@/app/lib/http/files";
import FileCard from "@/app/ui/files/FileCard";
import { Session, getServerSession } from "next-auth";

const FilesList = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const token = session?.user?.access_token || "";

  const filesList = await getFiles(token);

  if (!filesList) return "Server error";

  return (
    <div className="bg-slate-300">
      <div className="grid md:grid-cols-3 grid-cols-2">
        {filesList.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default FilesList;
