import { QuestionMapper } from './../Common/Mapper/QuestionMapping';
import { QuestionDTO } from './../Types/Question';
import * as QuestionStore from '../Store/QuestionStore';
import { LOGGER } from '../Common/Logger';

export type PostQuestion = Omit<QuestionDTO, 'id'>;

export const postNewQuestion = async (question: PostQuestion) => {
  LOGGER.info('Service: Posting new question', question);

  const dbQuestion = await QuestionStore.postQuestionDB(question);
  const dbWrongOptions = await QuestionStore.postQuestionWrongOptionsDB(
    question.wrong_options,
    dbQuestion.id
  );

  return QuestionMapper.mapQuestionToDto(dbQuestion, dbWrongOptions);
};

export const deleteQuestion = async (id: number) => {
  LOGGER.info(`Service: Deleting question with id ${id}`);
  await QuestionStore.deleteWrongOptionsQuestionDB(id);
  await QuestionStore.deleteQuestionDB(id);
};

export const getQuestion = async (id: number) => {
  // TODO: RETURN WRONG OPTIONS
  LOGGER.info(`Service: Getting question with id ${id}`);
  return QuestionStore.getQuestionDB(id);
};
