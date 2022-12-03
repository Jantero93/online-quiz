import QuestionStore from '../Store/QuestionStore';

import { QuestionDTO } from './../Types/Question';
import { LOGGER } from '../Common/Logger';

export type PostQuestion = Omit<QuestionDTO, 'id'>;

const postNewQuestion = async (
  question: PostQuestion
): Promise<QuestionDTO> => {
  LOGGER.info('Service: Posting new question', question);
  return await QuestionStore.postQuestion(question);
};

const deleteQuestion = async (id: number) => {
  LOGGER.info(`Service: Deleting question with id ${id}`);
  await QuestionStore.deleteQuestion(id);
};

const getQuestion = async (id: number): Promise<QuestionDTO> => {
  LOGGER.info(`Service: Getting question with id ${id}`);
  return await QuestionStore.getQuestion(id);
};

export default {
  getQuestion,
  deleteQuestion,
  postNewQuestion
};
