const uploadFile = async (token, file) => {
  const response = await fetch(
    `http://${process.env.BACKEND_URL}/files/${file.file_name}`,
    {
      method: "POST",
      body: file.content,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": file.mime_type,
      },
    }
  );

  if (response.status === 201) {
    return response.json();
  }

  return null;
};

const getFilesList = async (token) => {
  const response = await fetch(`http://${process.env.BACKEND_URL}/files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.json();
  }

  return null;
};

const getRawFile = async (token, id) => {
  const response = await fetch(
    `http://${process.env.BACKEND_URL}/files/${id}/raw`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    const headerValue = response.headers.get("content-disposition");
    const filename = headerValue.substring(
      headerValue.indexOf(`"`) + 1,
      headerValue.lastIndexOf(`"`)
    );
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  }

  return null;
};

const getFileInfo = async (token, id) => {
  const response = await fetch(
    `http://${process.env.BACKEND_URL}/files/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    return response.json();
  }

  return null;
};

module.exports = { uploadFile, getFilesList, getFileInfo, getRawFile };
