import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/Board/BoardSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});
