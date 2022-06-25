import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Entities from './indexEntities';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'online-quiz',
  entities: Entities,
  synchronize: true,
  logging: false
});

export default AppDataSource;
