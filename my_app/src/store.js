import { configureStore} from '@reduxjs/toolkit'
import { Field } from './Field'

const initialState = {
  whitePawns: 11,
    blackPawns: 11,
    currentPlayer: 1,
    selected: null,
    fields: [
      new Field(1, 0, "circlew"), new Field(3, 0, "circlew"), new Field(5, 0, "circlew"), new Field(7, 0, "circlew"),
      new Field(0, 1, "circlew"), new Field(2, 1, "circlew"), new Field(4, 1, "circlew"), new Field(6, 1, "circlew"),
      new Field(1, 2, "circlew"), new Field(3, 2, "circlew"), new Field(5, 2, "circlew"), new Field(7, 2, "circlew"),
      new Field(0, 5, "circle"), new Field(2, 5, "circle"), new Field(4, 5, "circle"), new Field(6, 5, "circle"),
      new Field(1, 6, "circle"), new Field(3, 6, "circle"), new Field(5, 6, "circle"), new Field(7, 6, "circle"),
      new Field(0, 7, "circle"), new Field(2, 7, "circle"), new Field(4, 7, "circle"), new Field(6, 7, "circle"),
    ]
}

// Action creators
const selectPawn = (x, y) => {
  return { type: 'SELECT_PAWN', payload: { x, y } };
};

const move = (x, y) => {
  return { type: 'MOVE', payload: { x, y } };
};

// Improved handleOnClick function
const handleOnClick = (field, x, y) => {
  return (dispatch) => {
    if (field != null) {
      dispatch(selectPawn(x, y));
    } else {
      dispatch(move(x, y));
    }
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_PAWN':
      return { ...state, selected: Field[action.payload.y][action.payload.x] };
    case 'MOVE':
      if (state.currentPlayer === 1) {
        return { ...state, whitePawns: state.whitePawns - 1 };
      } else {
        return { ...state, blackPawns: state.blackPawns - 1 };
      }
    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducer,handleOnClick,
});

export default store;