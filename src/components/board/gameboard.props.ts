import { AuthenticatedUser, CompletedGameModel, GameModel } from '../../shared';

export interface IGameboardProps {
  score: number;
  movesLeft: number;
  user?: AuthenticatedUser;
  completedGames: CompletedGameModel[];

  rows: number;
  cols: number;
  generator: Generator<string, void, unknown>;

  setCompletedGames: () => void;
  setScore: (score: number) => void;
  createGame: (game: GameModel) => void;
  setMovesLeft: (movesLeft: number) => void;
}
