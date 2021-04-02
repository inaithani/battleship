import { ReactNode } from 'react';
import { Orientation, Ship } from './components/ship/Ship.model';
/* eslint-disable no-shadow */

export enum DefaultGridDimesions {
  Rows = 10,
  Columns = 10,
  CellSize = 32
}

export enum ItemTypes {
  Ship = 'ship'
}

export interface IDragItem {
  orientation: Orientation,
  length: number,
  id: string
}
export interface IDropResult {
  cellState: number,
  columnIndex: number,
  dropEffect: string,
  rowIndex: number
}

export type StateValue = 0 | 1;

export type CellState = {
  isTarget: boolean,
  state: StateValue,
  ship: Ship | null,
};

export type GridState = Array<Array<CellState>>;

export interface IGridStateUpdateObject {
  state: StateValue,
  columnIndex: number,
  rowIndex: number,
  isTarget: boolean,
  ship: Ship | null,
}

export enum PlayerIdentifiers {
  FIRST = 'player1',
  SECOND = 'player2'
}

export interface IStoreProps {
  children: ReactNode,
}

export interface IPlayerGameState {
    isActive: boolean,
    gridState: GridState
}

export interface GameState {
  [key: string]: IPlayerGameState
}

export enum ActionKind {
  SetActivePlayer = 'SET_ACTIVE_PLAYER',
}

export type Action = {
  type: ActionKind,
  payload: number,
}

// const increaseAction: Action = {
//   type: ActionKind.Increase,
//   payload: 1,
// }

// const decreaseAction: Action = {
//   type: ActionKind.Decrease,
//   payload: 1,
// }

export type IGridStateUpdateObjects = Array<IGridStateUpdateObject>
