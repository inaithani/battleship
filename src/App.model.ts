import { Orientation } from './components/ship/Ship.model';

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
  length: number
}
export interface IDropResult {
  cellState: number,
  columnIndex: number,
  dropEffect: string,
  rowIndex: number
}
export type CellState = 0 | 1;

export type GridState = Array<Array<CellState>>;

export interface IGridStateUpdateObject {
  cellState: CellState,
  columnIndex: number,
  rowIndex: number
}

export type IGridStateUpdateObjects = Array<IGridStateUpdateObject>
