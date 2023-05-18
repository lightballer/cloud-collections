import "./File.css"

const File = ({ file }) => {
  const { name, updatedAt, url } = file;

  return (
    <div className="card mx-3 smaller-card">
      <img className="card-img-top" src={url} alt="file" />
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
      </div>
      <div className="card-footer">
        <small className="text-muted">Last updated at: {updatedAt}</small>
      </div>
    </div>
  );
};

export default File;
