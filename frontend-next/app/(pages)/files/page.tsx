import { getFiles } from "@/app/lib/http/files";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/(pages)/api/auth/[...nextauth]/route";
import FilesList from "@/app/ui/files/FilesList";

export default async function Page() {
  const session: Session | null = await getServerSession(authOptions);

  const token = session?.user?.access_token || "";

  const filesList = (await getFiles(token)) || [];

  return <FilesList filesList={filesList} />;
}
