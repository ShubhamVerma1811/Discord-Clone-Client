CREATE TABLE IF NOT EXISTS users(
  user_uid UUID DEFAULT uuid_generate_v4(),
  username VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL,
  profile_picture TEXT,
  hash VARCHAR(255) NOT NULL,
  created_at VARCHAR(30) NOT NULL,
  updated_at VARCHAR(30) NOT NULL,
  PRIMARY KEY (user_uid),
  UNIQUE (username),
  UNIQUE (email)
);