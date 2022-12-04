import QuestionStore from '../Store/QuestionStore';

import { QuestionDTO } from './../Types/Question';
import LOGGER from '../Common/Logger';

export type PostQuestion = Omit<QuestionDTO, 'id'>;

const deleteQuestion = async (id: number) => {
  LOGGER.info(`Service: Deleting question with id ${id}`);
  await QuestionStore.deleteQuestion(id);
};

const getAllQuestions = async () => {
  LOGGER.info('Service: Getting all quesitons from database');
  return await QuestionStore.getAllQuestions();
};

const getQuestion = async (id: number): Promise<QuestionDTO> => {
  LOGGER.info(`Service: Getting question with id ${id}`);
  return await QuestionStore.getQuestion(id);
};

const postNewQuestion = async (
  question: PostQuestion
): Promise<QuestionDTO> => {
  LOGGER.info('Service: Posting new question', question);
  return await QuestionStore.postQuestion(question);
};

export default {
  deleteQuestion,
  getAllQuestions,
  getQuestion,
  postNewQuestion
};
