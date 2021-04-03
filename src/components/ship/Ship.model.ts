import { PlayerIdentifiers } from '../../App.model';

export type Orientation = 'vertical' | 'horizontal' | 'none';
export interface ShipProps extends Ship {
  isPlacedOnGrid?: boolean,
  playerId: PlayerIdentifiers,
  hiddenViewMode?: boolean,
  sunken?: boolean,
}
export interface Ship {
  length: number,
  orientation: Orientation,
  id: string
}

export interface IShipCellProps {
  disabled?: boolean;
  isPlacedOnGrid?: boolean;
  orientation?: Orientation;
}

export interface IShipSchema {
  [key: string]: Array<{
    length: number;
    id: string
  }>
}
