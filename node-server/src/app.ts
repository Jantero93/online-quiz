import express from 'express';
import { useExpressServer } from 'routing-controllers';
import AppDataSource from './config/db/DataSource';

import requestLogger from './middleware/requestLogger';
import logger from './utility/logger';

import RootController from './controller/RootController';
import UserController from './controller/UserController';

const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(requestLogger);
    useExpressServer(app, {
      controllers: [RootController, UserController]
    });
  })
  .catch((error) => logger.error('Db not initialized', error));

export default app;
