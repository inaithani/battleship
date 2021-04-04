import { ReactNode } from 'react';
import { Orientation, Ship } from './components/ship/Ship.model';
/* eslint-disable no-shadow */

/**
 * Specify what should be the default Rows and Columns for the battleship grid
 * CellSize: height and width in pixels for a cell inside the grid
 */
export enum DefaultGridDimesions {
  Rows = 10,
  Columns = 10,
  CellSize = 32
}

/**
 * Used by the React-DnD (Drag n Drop) library to identify a an item-type being
 * dragged/dropped on the grid
 */
export enum ItemTypes {
  Ship = 'ship'
}
export interface IDragItem {
  orientation: Orientation,
  length: number,
  id: string
}

export interface IDragCollectionItem {
  rowIndex: number;
  columnIndex: number;
  cellState: CellState;
}

/**
 * Shape of the object that is returned from the drop callback
 * in DropAwareCell when a Ship is dropped. This object is recieved by the Ship component
 */
export interface IDropResult {
  cellState: CellState,
  columnIndex: number,
  rowIndex: number
}

/**
 * The values used to track the current state of a Cell
 */
export enum StateValue {
  CELL_EMPTY = 0, // The Cell is not occupied by a Ship
  CELL_BUSY = 1, // The Cell is occupied by a Ship
  CELL_HIT = 2, // The Cell was occupied by a Ship and the opponent has hit it
  CELL_MISS = 3 // The was was not occupied and the opponent has missed
}

/**
 * Data about the current state of a cell inside a Grid.
 */
export type CellState = {
  isTarget: boolean, // If a ship was dropped on this cell
  state: StateValue, // Wether a cell is empty, busy, hit or miss state
  ship: Ship | null, // if Cell was a target, then it will have a Ship
  shipId: string, // ID of the ship
};

/**
 * Part of IPlayerGameState - GridState is 2D Array of CellState
 * This represents the state of player's grid
 */

export type GridState = Array<Array<CellState>>;

/**
 * IDs for player 1 and player 2
 */
export enum PlayerIdentifiers {
  FIRST = 'player1',
  SECOND = 'player2'
}

/**
 * GameStore props - Accepts JSX
 */
export interface IStoreProps {
  children: ReactNode,
}

/**
 * Metadata about ship's location and current health state.
 */
export interface IShipLocation {
  row: number,
  column: number,
  hit: boolean
}

/**
 * This Map keeps a track of ships placed on the grid. It tracks thier locations and
 * cell states to gather how many hits they have taken and are they sunken.
 */
export interface IShipTracker {
  [key: string]: {
    sunken: boolean,
    locations: Array<IShipLocation>
  }
}

/**
 * Individual Player's state slice. Part of GameState
 */
export interface IPlayerGameState {
    isActive: boolean;
    isFireEnabled: boolean;
    gridState: GridState;
    shipTracker: IShipTracker;
    winner: boolean;
}

/**
 * The main app store. This contains the state for both players 1 and 2 along with metadata
 * about the cuurent game in play
 */
export interface GameState {
  players: {
    [key: string]: IPlayerGameState, // key = PlayerIdentifiers
  },
  started: boolean; // Has the game started
  currentTurn: PlayerIdentifiers;
  showNextTurnButton: boolean;
}
