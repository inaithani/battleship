import { GameState } from './App.model';
import {
  Action,
  ActionKind,
  IUpdateCellAction,
} from './Actions';

const Reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case ActionKind.UpdateCell: {
      const newState = { ...state };
      const {
        rowIndex,
        columnIndex,
        cellState,
        id,
      }: IUpdateCellAction = action.payload;
      newState[id].gridState[rowIndex][columnIndex] = cellState;
      return newState;
    }
    default: return state;
  }
};

export default Reducer;
