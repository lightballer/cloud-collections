import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import useAuth from "useAuth";

const FilePreview = ({ id }) => {
  const { getToken } = useAuth();

  return (
    <DocViewer
      documents={[
        {
          uri: `http://${process.env.REACT_APP_BACKEND_URL}/files/${id}/raw`,
        },
      ]}
      prefetchMethod="GET"
      requestHeaders={{ Authorization: `Bearer ${getToken()}` }}
      pluginRenderers={DocViewerRenderers}
    />
  );
};

export default FilePreview;
