CREATE TABLE IF NOT EXISTS user_servers(
  us_uid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  server_uid UUID NOT NULL REFERENCES servers(server_uid) ON DELETE CASCADE,
  user_uid UUID NOT NULL REFERENCES users(user_uid) ON DELETE CASCADE
);