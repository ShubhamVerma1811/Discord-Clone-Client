import { Pool } from 'pg';

const devConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

const prodConfig = {
  connectionString: process.env.PG_CONNECTION_URI,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);

export default pool;
