export type Orientation = 'vertical' | 'horizontal';

export interface ShipProps {
  length: number,
  orientation: Orientation,
  updateGridState?: Function,
  isPlacedOnGrid?: boolean,
  id: string
}