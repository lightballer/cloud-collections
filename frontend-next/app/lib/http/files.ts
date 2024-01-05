import { IFile } from "@/types/IFile";

const baseUrl = `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const getFiles = async (token: string): Promise<IFile[] | null> => {
  // noStore();
  const response = await fetch(`${baseUrl}/files`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const files: IFile[] = await response.json();
    console.log(files);
    return files;
  }

  return null;
};

const getFilePreview = async (token: string, id: string) => {
  const response = await fetch(`${baseUrl}/files/${id}/raw`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], {
      type: response.headers.get("content-type") || "",
    });
    const dataURL = URL.createObjectURL(blob);
    return dataURL;
  }

  return null;
};

const upload = (token: string, file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const fileContent = event.target?.result;

      try {
        const response = await fetch(`${baseUrl}/files/${file.name}`, {
          method: "POST",
          body: fileContent,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": file.type,
          },
        });
        console.log({ response });
        if (response.ok) {
          console.log("File sent successfully");
          resolve(true);
        } else {
          console.error(
            "Failed to send file:",
            response.status,
            response.statusText
          );
          reject(false);
        }
      } catch (error) {
        console.error("Error sending file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};

const deleteFile = async (token: string, id: string) => {
  const response = await fetch(`${baseUrl}/files/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());

  return response;
};

const updateFilename = async (token: string, id: string, filename: string) => {
  return fetch(`${baseUrl}/files/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: filename }),
  })
    .then((data) => data.json())
    .catch((err) => console.error(err));
};

export { getFiles, getFilePreview, upload, deleteFile, updateFilename };
