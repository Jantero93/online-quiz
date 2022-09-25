import { Router } from 'express';

import * as UserController from '../Controller/QuestionController';

const router = Router();

router.post('/', UserController.postQuestion);

export default router;
