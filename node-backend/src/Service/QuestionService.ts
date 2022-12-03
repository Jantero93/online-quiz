import QuestionStore from '../Store/QuestionStore';

import QuestionMapper from '../Common/Mapper/QuestionMapper';

import { QuestionDTO } from './../Types/Question';
import { LOGGER } from '../Common/Logger';

export type PostQuestion = Omit<QuestionDTO, 'id'>;

const postNewQuestion = async (
  question: PostQuestion
): Promise<QuestionDTO> => {
  LOGGER.info('Service: Posting new question', question);

  const dbQuestion = await QuestionStore.postQuestion(question);
  const dbWrongOptions = await QuestionStore.postQuestionWrongOptions(
    question.wrong_options,
    dbQuestion.id
  );

  return QuestionMapper.mapQuestionToDto(dbQuestion, dbWrongOptions);
};

const deleteQuestion = async (id: number) => {
  LOGGER.info(`Service: Deleting question with id ${id}`);
  await QuestionStore.deleteWrongOptions(id);
  await QuestionStore.deleteQuestion(id);
};

const getQuestion = async (id: number): Promise<QuestionDTO> => {
  LOGGER.info(`Service: Getting question with id ${id}`);
  const question = await QuestionStore.getQuestion(id);
  const questionWrongOptions = await QuestionStore.getQuestionWrongOptions(id);

  return QuestionMapper.mapQuestionToDto(question, questionWrongOptions);
};

export default {
  getQuestion,
  deleteQuestion,
  postNewQuestion
};
