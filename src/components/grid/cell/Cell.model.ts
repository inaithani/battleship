export type CellState = 0 | 1;
export interface ICellProps {
  rowIndex?: number,
  columnIndex?: number,
  isShip?: boolean,
  isOver?: boolean,
  cellState?: CellState,
}