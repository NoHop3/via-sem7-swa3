import { connect } from 'react-redux';

import { type ApplicationState } from '../../shared/store/app-state';
import { type AppDispatch } from '../../shared/store/app-thunk';
import GameBoard from './gameboard';
import { GameModel, setMovesLeft, setScore } from '../../shared';
import { gameService } from '../../services';

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user.user,
  score: state.gameboard.score,
  movesLeft: state.gameboard.movesLeft,
  completedGames: state.gameboard.completedGames,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setScore: (score: number) => dispatch(setScore(score)),
    setMovesLeft: (movesLeft: number) => dispatch(setMovesLeft(movesLeft)),
    setCompletedGames: () => {
      dispatch(gameService.getCompletedGames());
    },
    createGame: (game: GameModel) => {
      dispatch(gameService.createGame(game));
    },
  };
};

export const GameboardContainer = connect(mapStateToProps, mapDispatchToProps)(GameBoard);
