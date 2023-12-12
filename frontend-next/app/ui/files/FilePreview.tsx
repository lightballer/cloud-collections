import useGetToken from "@/app/lib/hooks/useGetToken";
import { getFilePreview } from "@/app/lib/http/files";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  id: string;
  name: string;
}

const FilePreview = ({ id, name }: Props) => {
  const { token } = useGetToken();

  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    getFilePreview(token, id).then((dataUrl) => {
      setFileUrl(dataUrl || "");
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Image src={fileUrl} alt={name} width={500} height={500} />
    </div>
  );
};

export default FilePreview;
