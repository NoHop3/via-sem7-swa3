export interface GameModel {
  userId: string;
  score: number;
  completed: boolean;
}

export interface CompletedGameModel extends GameModel {
  id: string;
}
