import FileCard from "@/app/ui/files/FileCard";

interface IFile {
  name: string;
  upload_date: string;
  dataUrl?: string;
  id: string;
}

export default function Page() {
  const isLoading = false;
  const filesList: IFile[] = [
    { name: "test.jpg", upload_date: "2023-11-30", id: "1" },
  ];

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
