import { Question } from '../Types/Question';
import * as QuestionStore from '../Store/QuestionStore';
import { LOGGER } from '../Common/Logger';

export type PostQuestion = Omit<Question, 'id'>;

export const postNewQuestion = async (question: PostQuestion) => {
  LOGGER.info('Posting new question', question);
  const dbQuestion = await QuestionStore.postQuestionDB(question);
  return dbQuestion;
};

export const deleteQuestion = async (id: number) => {
  LOGGER.info(`Deleting question with id ${id}`);
  await QuestionStore.deleteQuestionDB(id);
};

export const getQuestion = async (id: number) => {
  LOGGER.info(`Getting question with id ${id}`);
  return QuestionStore.getQuestionDB(id);
};
