import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import useAuth from "useAuth";

interface Props {
  id: string;
  name: string;
}

const FilePreview = ({ id, name }: Props) => {
//   const { getToken } = useAuth();
  
  const rawFileUrl = getRawFileUrl(id);

  return (
    <DocViewer
      documents={[
        {
          uri: rawFileUrl,
          fileName: name,
        },
      ]}
      prefetchMethod="GET"
    //   requestHeaders={{ Authorization: `Bearer ${getToken()}` }}
      pluginRenderers={DocViewerRenderers}
    />
  );
};

const getRawFileUrl = (id: string) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) throw new Error("Backend url is not set");
  return `http://${backendUrl}/files/${id}/raw`;
};

export default FilePreview;
