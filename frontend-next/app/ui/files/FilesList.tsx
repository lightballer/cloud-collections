import FileCard from "@/app/ui/files/FileCard";
import { IFile } from "@/types/IFile";

interface Props {
    filesList: IFile[];
}

const FilesList = ({filesList}: Props) => {
  return (
    <div className="files-list_container">
      <div className="card-deck cards-container">
        {filesList.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default FilesList;
