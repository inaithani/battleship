import { GameState, Action, ActionKind } from './App.model';

const Reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case ActionKind.SetActivePlayer:
      return {
        ...state,
        [action.payload]: {
          isActive: true,
        },
      };
    default: return state;
  }
};

export default Reducer;
