import { LOGGER } from '../Common/Logger';
import { Response, Request, NextFunction } from 'express';

import * as QuestionService from '../Service/QuestionService';

export const postQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LOGGER.info('Controller: Post question');

  try {
    const newQuestion = await QuestionService.postNewQuestion(req.body);
    res.send(newQuestion);
  } catch (error) {
    next(error);
  }
};
