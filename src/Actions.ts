import { IDropResult, PlayerIdentifiers } from './App.model';

/* eslint-disable no-shadow */
export enum ActionKind {
  SetActivePlayer = 'SET_ACTIVE_PLAYER',
  UpdateCell = 'UPDATE_CELL',
  StartGame = 'START_GAME',
}

export type Action = {
  type: ActionKind,
  payload: any
}

export interface IUpdateCellAction extends IDropResult {
  id: PlayerIdentifiers;
}
