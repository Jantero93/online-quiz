import express from 'express';
import AppDataSource from './config/db/DataSource';

import routes from './route/indexRoutes';

import requestLogger from './middleware/requestLogger';
import logger from './utility/logger';

const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(requestLogger);
    app.use(routes);
  })
  .catch((error) => logger.error('Db not initialized', error));

export default app;
