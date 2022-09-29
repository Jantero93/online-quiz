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

export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LOGGER.info('Controller: Delete question');

  try {
    await QuestionService.deleteQuestion(Number(req.params.id));
    res.send({ message: 'Question deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  LOGGER.info(`Get question with id ${id}`);

  try {
    const dbQuestion = await QuestionService.getQuestion(id);
    res.send(dbQuestion);
  } catch (error) {
    next(error);
  }
};
