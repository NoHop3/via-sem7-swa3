import { connect } from 'react-redux';

import { type ApplicationState } from '../../shared/store/app-state';
import { type AppDispatch } from '../../shared/store/app-thunk';
import GameBoard from './gameboard';
import { setMovesLeft, setScore } from '../../shared';

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user.user,
  score: state.gameboard.score,
  movesLeft: state.gameboard.movesLeft,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setScore: (score: number) => dispatch(setScore(score)),
    setMovesLeft: (movesLeft: number) => dispatch(setMovesLeft(movesLeft)),
  };
};

export const GameboardContainer = connect(mapStateToProps, mapDispatchToProps)(GameBoard);
