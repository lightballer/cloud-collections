const baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}`;

const getFiles = async (token) => {
  const response = await fetch(`${baseUrl}/files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const files = await response.json();
    return files;
  }

  return null;
};

const getFilePreview = async (token, id) => {
  const response = await fetch(`${baseUrl}/files/${id}/raw`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], { type: response.headers["content-type"] });
    // const blob = new Blob([buffer]);
    const dataURL = URL.createObjectURL(blob);
    return dataURL;
  }

  return null;
};

const upload = (token, file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target.result;

      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_BACKEND_URL}/files/${file.name}`,
          {
            method: "POST",
            body: fileContent,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": file.type,
            },
          }
        );

        if (response.ok) {
          console.log("File sent successfully");
          resolve(true);
        } else {
          reject(false);
          console.error(
            "Failed to send file:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error sending file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};

const deleteFile = async (token, id) => {
  const response = await fetch(
    `http://${process.env.REACT_APP_BACKEND_URL}/files/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((data) => data.json());

  return response;
};

const updateFilename = async (token, id, filename) => {
  fetch(`http://${process.env.REACT_APP_BACKEND_URL}/files/${id}`, {
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
