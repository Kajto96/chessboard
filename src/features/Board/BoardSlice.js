import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selected: null,
};
export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        selectPawn: (state, action) => {
            let chessboard = action.payload.chessboard;
            let field = chessboard[action.payload.y][action.payload.x];
            state.selected = field;
        }
    }
})

export const { selectPawn } = boardSlice.actions;

export const selectSelected = (state) => state.board.selected;

export default boardSlice.reducer;