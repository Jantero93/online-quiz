import express from 'express';
import { useExpressServer } from 'routing-controllers';
import AppDataSource from './config/db/DataSource';

import requestLogger from './middleware/requestLogger';
import logger from './utility/logger';

import control from './controller/RootController';
const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(requestLogger);
    useExpressServer(app, {
      controllers: [control]
    });
  })
  .catch((error) => logger.error('Db not initialized', error));

export default app;
