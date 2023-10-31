import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import notificationReducer from './notification-store';
import themeReducer from './theme-store';
import userReducer from './user-store';
import gameboardReducer from './gameboard-store';

export const history = createBrowserHistory();

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    notifications: notificationReducer,
    theme: themeReducer,
    user: userReducer,
    gameboard: gameboardReducer,
  });

export let store: ReturnType<typeof configureAppStore>;

export const configureAppStore = () => {
  const _store = configureStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware({ serializableCheck: false }), routerMiddleware(history)];
    },
  });
  store = _store;
  return _store;
};
