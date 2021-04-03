import { createContext, useReducer, Dispatch } from 'react';
import {
  GameState,
  PlayerIdentifiers,
  IStoreProps,
  DefaultGridDimesions,
} from './App.model';
import Reducer from './Reducer';
import { getBaseGridState } from './utils';
import { Action } from './Actions';

const initialState: GameState = {
  players: {
    [PlayerIdentifiers.FIRST]: {
      gridState: getBaseGridState(DefaultGridDimesions.Rows, DefaultGridDimesions.Columns),
      isActive: true,
      isFireEnabled: false,
      winner: false,
      shipTracker: {},
    },
    [PlayerIdentifiers.SECOND]: {
      gridState: getBaseGridState(DefaultGridDimesions.Rows, DefaultGridDimesions.Columns),
      isActive: false,
      isFireEnabled: false,
      winner: false,
      shipTracker: {},
    },
  },
  started: false,
  currentTurn: PlayerIdentifiers.FIRST,
  showNextTurnButton: false,
};

const GameStore = ({ children }: IStoreProps) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = { state, dispatch };
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

interface InitContextProps {
  state: GameState;
  dispatch: Dispatch<Action>;
}

export const GameContext = createContext({} as InitContextProps);
export default GameStore;
