CREATE TABLE IF NOT EXISTS messages(
  message_uid UUID DEFAULT uuid_generate_v4(),
  context TEXT NOT NULL,
  channel_uid UUID NOT NULL REFERENCES channels(channel_uid) ON DELETE CASCADE,
  author_uid UUID NOT NULL REFERENCES users(user_uid) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (message_uid)
);