import { CellState, PlayerIdentifiers } from '../../../App.model';

export interface ICellProps {
  rowIndex: number,
  columnIndex: number,
  isShip?: boolean,
  isOver?: boolean,
  cellState?: CellState,
  id: PlayerIdentifiers,
  hiddenViewMode?: boolean
}
