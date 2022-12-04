import { Question } from './../Types/Question';
import { v4 as uuidv4 } from 'uuid';

import GameService from './GameService';

class Game {
  readonly gameId: string;
  readonly creatorId: string;
  readonly questionCount: number;

  playerIds: string[] = [];
  questions: Question[] = [];

  constructor(creatorId: string, questionCount: number) {
    this.gameId = uuidv4();
    this.creatorId = creatorId;
    this.questionCount = questionCount;
  }

  async createGame(): Promise<string> {
    this.questions = await GameService.getRandomQuestions(this.questionCount);
    return this.gameId;
  }
}

export default Game;
