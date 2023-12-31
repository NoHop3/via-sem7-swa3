import axios from 'axios';
import { AuthenticatedUser, User, setIsLoading, setNotification, setUser, userEndpoints } from '../shared';

// #region login
export const login = (user: User) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  console.log(user);
  axios
    .post(
      userEndpoints.login(),
      JSON.stringify({
        user,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res: any) => {
      localStorage.setItem('token', res.data.token as string);
      dispatch(setUser({ ...user, admin: false, id: res.data.userId }));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `User was signed in successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `User was not signed in!`,
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

// #endregion

// #region register
export const register = (user: User) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  axios
    .post(userEndpoints.register(), JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: any) => {
      localStorage.setItem('token', res.data.token as string);
      dispatch(setUser(res.data.user as AuthenticatedUser));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `User was signed up successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `User was not signed up!`,
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
// #endregion
