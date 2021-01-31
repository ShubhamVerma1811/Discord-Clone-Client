CREATE TABLE IF NOT EXISTS channels (
  channel_uid UUID DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  author_uid UUID NOT NULL,
  server_uid UUID REFERENCES servers(server_uid) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (channel_uid)
);