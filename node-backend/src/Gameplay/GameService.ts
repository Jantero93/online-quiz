import QuestionService from '../Service/QuestionService';

import LOGGER from '../Common/Logger';
import { QuestionDTO } from '../Types/Question';

const getRandomQuestions = async (questionCount: number): Promise<QuestionDTO[]> => {
  LOGGER.info('Getting all questions and randomizing questions for game');
  const allQuestions = await QuestionService.getAllQuestions();

  const shuffledQuestions = allQuestions
    .map((question) => ({
      value: question,
      sort: Math.random()
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((q) => q.value);

  return shuffledQuestions.filter((_question, idx) => idx > questionCount);
};

export default { getRandomQuestions };
