const File = ({ file }) => {
  const { id, name, updatedAt, url } = file;

  return (
    <div className="file_container" key={id}>
      <p className="file_name">{name}</p>
      <p className="file_updatedAt">{updatedAt}</p>
      <img alt="file" src={url} />
    </div>
  );
};

export default File;
