import { CellState, GridState, PlayerIdentifiers } from '../../../App.model';

export interface ICellProps {
  rowIndex?: number,
  columnIndex?: number,
  isShip?: boolean,
  isOver?: boolean,
  cellState?: CellState,
  updateGridState?: Function | undefined,
  gridState?: GridState
  id: PlayerIdentifiers
}