import { authOptions } from "@/app/(pages)/api/auth/[...nextauth]/route";
import { getFiles } from "@/app/lib/http/files";
import FileCard from "@/app/ui/files/FileCard";
import { Session, getServerSession } from "next-auth";

const FilesList = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const token = session?.user?.access_token || "";

  const filesList = await getFiles(token);

  if (!filesList)
    return <div className="text-center place-content-center">Server error</div>;

  if (filesList.length === 0)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5.75rem)]">
        <h3 className="text-3xl font-bold">{`No files :(`}</h3>
      </div>
    );

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

export const dynamic = 'force-dynamic';
