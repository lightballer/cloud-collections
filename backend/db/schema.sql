CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    upload_date TIMESTAMP NOT NULL
);

ALTER TABLE files ADD CONSTRAINT user_id FOREIGN KEY (id) REFERENCES users(id);

CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL
);

ALTER TABLE folders ADD CONSTRAINT owner_id FOREIGN KEY (id) REFERENCES users(id);

-- CREATE TYPE access_type AS ENUM ('read', 'write', 'delete');

-- CREATE TABLE access (
--     id SERIAL PRIMARY KEY,
--     file_or_folder_id VARCHAR(255) NOT NULL,
--     type access_type NOT NULL
-- );

-- ALTER TABLE access ADD CONSTRAINT user_id FOREIGN KEY (id) REFERENCES users(id);
