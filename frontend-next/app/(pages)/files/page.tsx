import FilesList from "@/app/ui/files/FilesList";
import { FilesListSkeleton } from "@/app/ui/files/Skeletons";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<FilesListSkeleton />}>
      <FilesList />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';
