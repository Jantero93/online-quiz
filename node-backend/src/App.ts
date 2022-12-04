import express from 'express';
import routes from './Routes/index';

import { dbClient } from './DB/DB';

import { errorLogger, errorResponser } from './Middleware/ErrorMiddleware';
import { requestLogger } from './Middleware/RequestLogger';

import cors from 'cors';

dbClient.connect();

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/', routes);

app.use(errorLogger);
app.use(errorResponser);

export default app;
