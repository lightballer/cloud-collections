import React from "react";
import "./File.css";

const File = ({ file }) => {
  const { name, upload_date, dataUrl } = file;
  console.log({ file });
  // const date = upload_date.split("T")[0];
  return (
    <div className="card mx-3 smaller-card">
      <img className="card-img-top" src={dataUrl} alt="file" />
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
      </div>
      <div className="card-footer">
        <small className="text-muted">Last updated at: {upload_date}</small>
      </div>
    </div>
  );
};

export default File;
