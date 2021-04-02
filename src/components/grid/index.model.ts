import { GridState, PlayerIdentifiers } from '../../App.model';

export interface IGridIndexProps {
  rows?: number,
  columns?: number,
  gridState?: GridState,
  updateGridState?: Function,
  id: PlayerIdentifiers
}
