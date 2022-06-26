export type Question = {
  question: string;
  correctOption: string;
  wrongOptions: [string, string, string];
  difficulty: string;
  userCreated: number;
};

export type Difficulty = 'easy' | 'medium' | 'hard';
