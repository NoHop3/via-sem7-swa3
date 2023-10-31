import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface GameboardStore {
  score: number;
  movesLeft: number;
}

const initialState: GameboardStore = {
  score: 0,
  movesLeft: 10,
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
  },
});

export default userSlice.reducer;
export const { setScore, setMovesLeft } = userSlice.actions;
