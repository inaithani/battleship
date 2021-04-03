import { createContext, useReducer, Dispatch } from 'react';
import {
  GameState,
  IStoreProps,
} from './App.model';
import Reducer from './Reducer';
import { getInitialState } from './utils';
import { Action } from './Actions';

const initialState: GameState = getInitialState();

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
