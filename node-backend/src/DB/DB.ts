import { Client } from 'pg';
import { DB_ENV } from '../Config/EnvironmentVariables';

export const dbClient = new Client({
  user: DB_ENV.PG_USER,
  host: DB_ENV.PG_HOST,
  database: DB_ENV.PG_DATABASE,
  password: DB_ENV.PG_PASSWORD,
  port: DB_ENV.PG_PORT
});
