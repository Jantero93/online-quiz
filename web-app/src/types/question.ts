export type Question = {
  question: string;
  correct_option: string;
  wrong_options: [string, string, string];
  difficulty: string;
  userCreated: number;
};

export type Difficulty = 'easy' | 'medium' | 'hard';
