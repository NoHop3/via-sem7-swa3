/* eslint-disable @typescript-eslint/no-non-null-assertion */
const baseUrl = process.env.REACT_APP_API_URL!;

// #region userEndpoints
export const userEndpoints = {
  login: () => `${baseUrl}/login`,
  register: () => `${baseUrl}/register`,
};
// #endregion

// #region gameEndpoints
export const gameEndpoints = {
  createGame: (token: string) => `${baseUrl}/games?token=${token}`,
  getCompletedGames: (token: string) => `${baseUrl}/games?token=${token}`,
};
// #endregion
