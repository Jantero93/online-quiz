import { QuestionMapper } from './../../Common/Mapper/QuestionMapping';
import { Question, QuestionWrongOption } from './../../Types/Question';
describe('Question mapper tests', () => {
  test('Map model question to question dto, should return correct', () => {
    const question: Question = {
      correct_option: 'correct',
      difficulty: 'easy',
      id: -123,
      question: 'question'
    };

    const wrongOptions: QuestionWrongOption[] = [
      { id: 12, question_id: -123, wrong_option: 'wrong1' },
      { id: 13, question_id: -123, wrong_option: 'wrong2' },
      { id: 14, question_id: -123, wrong_option: 'wrong3' }
    ];

    const dto = QuestionMapper.mapQuestionToDto(question, wrongOptions);

    expect(dto.id).toEqual(question.id);
    expect(dto.question).toEqual(question.question);
    expect(dto.correct_option).toEqual(question.correct_option);
    expect(dto.difficulty).toEqual(question.difficulty);
    expect(dto.wrong_options[0]).toEqual(wrongOptions[0].wrong_option);
    expect(dto.wrong_options[1]).toEqual(wrongOptions[1].wrong_option);
    expect(dto.wrong_options[2]).toEqual(wrongOptions[2].wrong_option);
  });
});
