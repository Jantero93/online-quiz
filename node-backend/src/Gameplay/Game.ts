import { QuestionDTO } from './../Types/Question';
import { v4 as uuidv4 } from 'uuid';

import GameService from './GameService';

class Game {
  private readonly _questionCount: number;
  readonly _creatorId: string;
  readonly _gameId: string;

  _currentQuestion = 0;
  _playerIds: string[] = [];
  _questions: QuestionDTO[] = [];

  constructor(questionCount: number) {
    this._gameId = uuidv4();
    this._creatorId = uuidv4();
    this._questionCount = questionCount;
  }

  addPlayer(): string {
    const newPlayerId = uuidv4();
    this._playerIds = this._playerIds.concat(newPlayerId);
    return newPlayerId;
  }
  async createGame(): Promise<void> {
    this._questions = await GameService.getRandomQuestions(this._questionCount);
  }

  isLastQuestion(): boolean {
    return this._questionCount === this._currentQuestion;
  }

  nextQuestion(): QuestionDTO | null {
    this._currentQuestion++;
    return this._questions[this._currentQuestion] || null;
  }
}

export default Game;
