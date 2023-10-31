import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CompletedGameModel } from '../models';

export interface GameboardStore {
  score: number;
  movesLeft: number;
  completedGames: CompletedGameModel[];
}

const initialState: GameboardStore = {
  score: 0,
  movesLeft: 1,
  completedGames: [],
};

const userSlice = createSlice({
  name: 'gameboard',
  initialState,
  reducers: {
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    setMovesLeft(state, action: PayloadAction<number>) {
      state.movesLeft = action.payload;
    },
    setCompletedGames(state, action: PayloadAction<CompletedGameModel[]>) {
      state.completedGames = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setScore, setMovesLeft, setCompletedGames } = userSlice.actions;
