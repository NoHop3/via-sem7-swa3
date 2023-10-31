import axios from 'axios';
import { gameEndpoints, CompletedGameModel, setCompletedGames, setNotification, GameModel } from '../shared';

// #region getCompletedGames
export const getCompletedGames = () => (dispatch: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(
      setNotification({
        open: true,
        type: 'error',
        message: `User is not logged in!`,
      }),
    );
    return;
  }
  axios
    .get(gameEndpoints.getCompletedGames(token), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: any) => {
      dispatch(setCompletedGames(res.data as CompletedGameModel[]));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Successfully retrieved completed games!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Failed to retrieve completed games!`,
        }),
      );
      console.error(err);
    });
};
// #endregion

// #region createGame
export const createGame = (game: GameModel) => (dispatch: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(
      setNotification({
        open: true,
        type: 'error',
        message: `User is not logged in!`,
      }),
    );
    return;
  }

  axios
    .post(gameEndpoints.createGame(token), JSON.stringify(game), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: any) => {
      getCompletedGames();
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Game recorded!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Game not recorded!`,
        }),
      );
      console.error(err);
    });
};
// #endregion
