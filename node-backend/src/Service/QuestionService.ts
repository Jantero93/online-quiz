import { QuestionWrongOption } from './../Types/Question';
import { Question } from '../Types/Question';
import * as QuestionStore from '../Store/QuestionStore';
import { LOGGER } from '../Common/Logger';

export type PostQuestion = Omit<Question, 'id'>;
export type PostQuestionWrongOptions = [string, string, string];

export const postNewQuestion = async (question: PostQuestion) => {
  LOGGER.info('Service: Posting new question', question);
  const dbQuestion = await QuestionStore.postQuestionDB(question);
  const dbWrongOptions = await QuestionStore.postQuestionWrongOptionsDB(
    question.wrong_options,
    dbQuestion.id
  );
  // TODO: MAPPERS AND DTOS
  return mapQuestion(dbQuestion, dbWrongOptions);
};

export const deleteQuestion = async (id: number) => {
  LOGGER.info(`Service: Deleting question with id ${id}`);
  await QuestionStore.deleteWrongOptionsQuestionDB(id);
  await QuestionStore.deleteQuestionDB(id);
};

export const getQuestion = async (id: number) => {
  LOGGER.info(`Service: Getting question with id ${id}`);
  return QuestionStore.getQuestionDB(id);
};

// TODO: MAPPER AND DTOS
const mapQuestion = (
  question: Question,
  wrongOptionsArray: QuestionWrongOption[]
) => {
  const wrongOptions: [string, string, string] = [
    wrongOptionsArray[0].wrong_option,
    wrongOptionsArray[1].wrong_option,
    wrongOptionsArray[2].wrong_option
  ];

  question.wrong_options = wrongOptions;
  return question;
};
