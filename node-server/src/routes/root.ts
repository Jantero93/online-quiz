import { Router } from 'express';

import * as RootController from '../controller/rootController';

const router = Router();

router.get('/', RootController.root);

export default router;
