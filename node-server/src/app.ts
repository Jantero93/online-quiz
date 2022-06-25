import express from 'express';
import { useExpressServer } from 'routing-controllers';
import AppDataSource from './config/db/DataSource';

import RequestLogger from './middleware/requestLogger';

import RootController from './controller/RootController';
import UserController from './controller/UserController';

import logger from './utility/logger';

const app = express();

AppDataSource.initialize()
  .then(() => {
    useExpressServer(app, {
      controllers: [RootController, UserController],
      middlewares: [RequestLogger]
    });
  })
  .catch((error) => logger.error('Db not initialized', error));

export default app;
