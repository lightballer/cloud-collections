import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import useAuth from "useAuth";

const FilePreview = ({ id, name }) => {
  const { getToken } = useAuth();

  return (
    <DocViewer
      documents={[
        {
          uri: `http://${process.env.REACT_APP_BACKEND_URL}/files/${id}/raw`,
          fileName: name,
        },
      ]}
      prefetchMethod="GET"
      requestHeaders={{ Authorization: `Bearer ${getToken()}` }}
      pluginRenderers={DocViewerRenderers}
    />
  );
};

export default FilePreview;
