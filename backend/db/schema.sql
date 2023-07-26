CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    upload_date TIMESTAMP NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
