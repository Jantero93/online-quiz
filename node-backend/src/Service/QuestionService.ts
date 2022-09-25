import { Question } from '../Types/Question';
import * as QuestionStore from '../Store/QuestionStore';
import { LOGGER } from '../Common/Logger';

export type PostQuestion = Omit<Question, 'id'>;

export const postNewQuestion = async (question: PostQuestion) => {
  LOGGER.info('Posting new question', question);
  const dbQuestion = await QuestionStore.postQuestionDB(question);
  return dbQuestion;
};
