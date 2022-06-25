import 'reflect-metadata';
import { DataSource } from 'typeorm';

import Entities from './indexEntities';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: Entities,
  synchronize: true,
  logging: false
});

export default AppDataSource;
