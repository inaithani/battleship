import { IDropResult, PlayerIdentifiers, IShipLocation } from './App.model';

/* eslint-disable no-shadow */
export enum ActionKind {
  SetActivePlayer = 'SET_ACTIVE_PLAYER',
  UpdateShipLocation = 'UPDATE_SHIP_LOCATION',
  StartGame = 'START_GAME',
  InitializeShipTraker = 'INIT_SHIP_TRACKER',
  UpdateShipTracker = 'UPDATE_SHIP_TRACKER',
  SetCellHitMissState = 'SET_CELL_HIT_MISS',
  ClearShipLocation = 'CLEAR_SHIP_LOCATION',
}

export type Action = {
  type: ActionKind,
  payload: any
}

export interface IUpdateCellAction extends IDropResult {
  id: PlayerIdentifiers;
  shipId: string;
}
export interface IInitShipTrackerAction {
  shipId: string;
  id: PlayerIdentifiers;
}

export interface IUpdateShipTracker {
  locations: Array<IShipLocation>;
  sunken: boolean;
  id: PlayerIdentifiers;
  shipId: string;
}
