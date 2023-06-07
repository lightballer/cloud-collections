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
  // return [
  //   {
  //     id: "12345",
  //     name: "homework.docx",
  //     updatedAt: "2023-02-02",
  //     url: "https://icon-library.com/images/docx-icon/docx-icon-10.jpg",
  //   },
  //   {
  //     id: "54321",
  //     name: "work_report.xlsx",
  //     updatedAt: "2023-19-04",
  //     url: "https://icon-library.com/images/xlsx-icon/xlsx-icon-6.jpg",
  //   },
  //   {
  //     id: "77777",
  //     name: "drafts.txt",
  //     updatedAt: "2023-01-01",
  //     url: "https://icon-library.com/images/txt-icon/txt-icon-6.jpg",
  //   },
  // ];
};

const getFilePreview = async (token, id) => {
  const response = await fetch(`${baseUrl}/files/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    // const raw = await response.json();
    const buffer = await response.arrayBuffer();
    // const blob = new Blob([buffer], { type: response.headers["content-type"] });
    const blob = new Blob([buffer]);
    const dataURL = URL.createObjectURL(blob);
    return dataURL;
  }

  return null;
};

export { getFiles, getFilePreview };
