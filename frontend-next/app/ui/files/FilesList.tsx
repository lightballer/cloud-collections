import FileCard from "@/app/ui/files/FileCard";
import { IFile } from "@/types/IFile";

interface Props {
  filesList: IFile[];
}

const FilesList = ({ filesList }: Props) => {
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
