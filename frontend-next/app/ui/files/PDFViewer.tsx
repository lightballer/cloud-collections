"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface Props {
  fileUrl: string;
}

const PDFViewer = ({ fileUrl }: Props) => {
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setPages(numPages)}
      >
        <Page pageNumber={currentPage} renderTextLayer={false} />
      </Document>
      <div>
        <button
          className="btn btn-dark btn-md"
          type="button"
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          className="btn btn-dark btn-md"
          type="button"
          onClick={() => {
            if (currentPage !== pages) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PDFViewer;
