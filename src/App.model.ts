import { Orientation, Ship } from './components/ship/Ship.model';

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
  ship: Ship,
}

export type IGridStateUpdateObjects = Array<IGridStateUpdateObject>
