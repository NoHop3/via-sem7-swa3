import { AuthenticatedUser } from '../../shared';

export interface IGameboardProps {
  score: number;
  movesLeft: number;
  user?: AuthenticatedUser;

  rows: number;
  cols: number;
  generator: Generator<string, void, unknown>;

  setScore: (score: number) => void;
  setMovesLeft: (movesLeft: number) => void;
}
