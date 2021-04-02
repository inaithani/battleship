import { PlayerIdentifiers } from "../../App.model";

export type Orientation = 'vertical' | 'horizontal';
export interface ShipProps extends Ship {
  updateGridState?: Function,
  isPlacedOnGrid?: boolean,
  playerId: PlayerIdentifiers
}
export interface Ship {
  length: number,
  orientation: Orientation,
  id: string
}

export interface IShipCellProps {}
