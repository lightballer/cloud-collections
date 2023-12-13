"use client";

import useGetToken from "@/app/lib/hooks/useGetToken";
import { getFilePreview } from "@/app/lib/http/files";
import { useEffect, useState } from "react";
import Image from "next/image";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import PDFViewer from "./PDFViewer";
import { parseFileName } from "@/app/ui/files/parseFileName";

interface Props {
  id: string;
  name: string;
}

const FilePreview = ({ id, name }: Props) => {
  const { token } = useGetToken();

  const { extension, isImage } = parseFileName(name);

  console.log({ extension });

  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    getFilePreview(token, id).then((dataUrl) => {
      if (dataUrl) setFileUrl(dataUrl);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {isImage && <Image src={fileUrl} alt={name} width={500} height={500} />}
      {extension === "pdf" && <PDFViewer fileUrl={fileUrl} />}
    </div>
  );
};

export default FilePreview;
