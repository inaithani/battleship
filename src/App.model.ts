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

// 0 - Empty, 1 - Busy, 2 - HIT, 3 - MISS
export enum StateValue {
  CELL_EMPTY = 0,
  CELL_BUSY = 1,
  CELL_HIT = 2,
  CELL_MISS = 3
}

export type CellState = {
  isTarget: boolean,
  state: StateValue,
  ship: Ship | null,
  shipId: string,
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

export interface IShipLocation {
  row: number,
  column: number,
  hit: boolean
}

export interface IShipTracker {
  [key: string]: {
    sunken: boolean,
    locations: Array<IShipLocation>
  }
}
export interface IPlayerGameState {
    isActive: boolean;
    isFireEnabled: boolean;
    gridState: GridState;
    shipTracker: IShipTracker;
    winner: boolean;
}

export interface GameState {
  players: {
    [key: string]: IPlayerGameState,
  },
  started: boolean;
  currentTurn: PlayerIdentifiers;
  showNextTurnButton: boolean;
}

export type IGridStateUpdateObjects = Array<IGridStateUpdateObject>
