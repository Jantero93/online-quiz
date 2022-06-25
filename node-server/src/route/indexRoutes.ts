import { Router } from 'express';

import rootRouter from './root';

const routes = Router();

routes.use('/', rootRouter);

export default routes;
