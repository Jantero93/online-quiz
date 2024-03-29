import { Router } from 'express';

import * as UserController from '../Controller/QuestionController';

const router = Router();

router.post('/', UserController.postQuestion);
router.delete('/:id', UserController.deleteQuestion);
router.get('/:id', UserController.getQuestion);

export default router;
