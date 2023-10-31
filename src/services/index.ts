import { register, login } from './user-service';
import { getCompletedGames, createGame } from './game-service';

export const userService = {
  login,
  register,
};

export const gameService = {
  getCompletedGames,
  createGame,
};
