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

export interface IDragCollectionItem {
  rowIndex: number;
  columnIndex: number;
  cellState: CellState;
}
export interface IDropResult {
  cellState: CellState,
  columnIndex: number,
  rowIndex: number
}

export type StateValue = 0 | 1 | 2 | 3; // 0 - Empty, 1 - Busy, 2 - HIT, 3 - MISS

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
  players: {
    [key: string]: IPlayerGameState,
  },
  started: boolean,
}

export type IGridStateUpdateObjects = Array<IGridStateUpdateObject>
