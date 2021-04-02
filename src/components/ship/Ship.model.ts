export type Orientation = 'vertical' | 'horizontal';

export interface ShipProps extends Ship {
  updateGridState?: Function,
  isPlacedOnGrid?: boolean,
}
export interface Ship {
  length: number,
  orientation: Orientation,
  id: string
}