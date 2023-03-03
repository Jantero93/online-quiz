import { Question, QuestionWrongOption, QuestionDTO } from '../../Types/Question';

const mapQuestionToDto = (
  question: Question,
  wrongOptionsArray: QuestionWrongOption[]
): QuestionDTO => {
  const wrongOptions: [string, string, string] = [
    wrongOptionsArray[0].wrong_option,
    wrongOptionsArray[1].wrong_option,
    wrongOptionsArray[2].wrong_option
  ];

  const questionDTO: QuestionDTO = {
    correct_option: question.correct_option,
    difficulty: question.difficulty,
    id: question.id,
    question: question.question,
    wrong_options: wrongOptions
  };

  return questionDTO;
};

export default {
  mapQuestionToDto
};
