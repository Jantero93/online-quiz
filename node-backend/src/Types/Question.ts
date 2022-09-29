// DATABASE MODELS
export type Question = {
  id: number;
  question: string;
  correct_option: string;
  wrong_options: [
    QuestionWrongOption,
    QuestionWrongOption,
    QuestionWrongOption
  ];
  difficulty: string;
};

export type QuestionWrongOption = {
  id: number;
  question_id: number;
  wrong_option: string;
};

// DTOS
export type QuestionDTO = {
  id: number;
  question: string;
  correct_option: string;
  wrong_options: [string, string, string];
  difficulty: string;
};
