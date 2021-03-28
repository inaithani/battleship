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
