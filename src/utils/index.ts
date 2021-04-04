import { Dispatch } from 'react';
import { Action, ActionKind, IUpdateCellAction } from '../Actions';
import {
  GridState,
  CellState,
  DefaultGridDimesions,
  PlayerIdentifiers,
  StateValue,
  GameState,
} from '../App.model';
import { Orientation } from '../components/ship/Ship.model';
import shipsSchema from './ships.data';

/**
 * Util function to generate on return the initial state or reset state
 */
export const getInitialState = (): GameState => (
  {
    players: {
      [PlayerIdentifiers.FIRST]: {
        gridState: getBaseGridState(DefaultGridDimesions.Rows, DefaultGridDimesions.Columns),
        isActive: true,
        isFireEnabled: false,
        winner: false,
        shipTracker: {},
      },
      [PlayerIdentifiers.SECOND]: {
        gridState: getBaseGridState(DefaultGridDimesions.Rows, DefaultGridDimesions.Columns),
        isActive: false,
        isFireEnabled: false,
        winner: false,
        shipTracker: {},
      },
    },
    started: false,
    currentTurn: PlayerIdentifiers.FIRST,
    showNextTurnButton: false,
  }
);

/**
 * Starts the game and sets the active player as the first player
 */
export const startGame = (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionKind.StartGame,
    payload: {},
  });

  dispatch({
    type: ActionKind.SetActivePlayer,
    payload: {
      id: PlayerIdentifiers.FIRST,
    },
  });

  toggleIsFireEnabled(dispatch, PlayerIdentifiers.SECOND, true);
};

/**
 * Fired after the Cell is cliked and requires a change of turn
 * Sets the next player as active player and enables fire on the grid
 * of the oponent.
 */
export const turnChange = (dispatch: Dispatch<Action>, state: GameState) => {
  dispatch({
    type: ActionKind.SetActivePlayer,
    payload: {
      id: state.currentTurn,
    },
  });

  let enableFireFor = PlayerIdentifiers.FIRST;

  if (state.currentTurn === PlayerIdentifiers.FIRST) {
    enableFireFor = PlayerIdentifiers.SECOND;
  } else {
    enableFireFor = PlayerIdentifiers.FIRST;
  }

  toggleNextTurnButton(dispatch, false);
  toggleIsFireEnabled(dispatch, enableFireFor, true);
};

/*
 * Shows the setup screen for the next player
 */
export const nextPlayerGameSetup = (dispatch: Dispatch<Action>, isFirstPlayerActive: boolean) => {
  const id = isFirstPlayerActive ? PlayerIdentifiers.SECOND : PlayerIdentifiers.FIRST;
  dispatch({
    type: ActionKind.SetActivePlayer,
    payload: {
      id,
    },
  });
};

/**
 * Util function used by the getInitialState function. Generates the 2D Array
 * and fills it with the default CellState
 */
export const getBaseGridState = (rows: number, columns: number): GridState => {
  const arrayState = new Array(rows);
  const defaultCellState: CellState = {
    state: 0,
    isTarget: false,
    ship: null,
    shipId: '',
  };

  for (let i = 0; i < arrayState.length; i += 1) {
    arrayState[i] = new Array(columns);
    arrayState[i].fill(defaultCellState, 0, columns);
  }

  return arrayState;
};

/**
 * The function is fired when Ship is being dragged over a Grid Cell
 * It determines wether it is out of the grid boundary. This is used
 * for helping to show the drop placeholder correctly.
 */
const isShipOutOfBounds = (
  rowIndex: number,
  columnIndex: number,
  orientation: Orientation,
  length: number,
): boolean => {
  let isOutOfBounds = false;
  if (orientation === 'vertical') {
    isOutOfBounds = (rowIndex + length) > DefaultGridDimesions.Rows;
  } else {
    isOutOfBounds = (columnIndex + length) > DefaultGridDimesions.Columns;
  }

  return isOutOfBounds;
};

/**
 * The function is fired when Ship is being dragged over a Grid Cell. It determines
 * that if the Ship was to be dropped on this particular cell, are all the cells need
 * by the Ship's length unoccupied or occupied. This is used for helping to show the
 * drop placeholder correctly.
 */
export const hasCollisionPath = (
  gridState: GridState | undefined,
  rowIndex: number | undefined,
  columnIndex: number | undefined,
  orientation: Orientation,
  length: number,
  shipId: string,
): boolean => {
  if (Array.isArray(gridState) && typeof rowIndex === 'number' && typeof columnIndex === 'number') {
    const { state } = gridState[rowIndex][columnIndex];
    if (state === StateValue.CELL_BUSY) {
      return true;
    }

    if (isShipOutOfBounds(rowIndex, columnIndex, orientation, length)) {
      return true;
    }

    let collisionFound = false;
    if (orientation === 'vertical') {
      let n = rowIndex;
      while (n < rowIndex + length) {
        if (gridState[n][columnIndex].state === 1 && gridState[n][columnIndex].shipId !== shipId) {
          collisionFound = true;
          break;
        }
        n += 1;
      }
    } else {
      let n = columnIndex;
      while (n < columnIndex + length) {
        if (gridState[rowIndex][n].state === 1 && gridState[rowIndex][n].shipId !== shipId) {
          collisionFound = true;
          break;
        }
        n += 1;
      }
    }
    return collisionFound;
  }

  return true;
};

/**
 * Fired when a Ship is succesfully dropped on a cell. The function updates
 * the target cell i.e.the Cell on which it was dropped and the required
 * adjacent Cells on the path to CELL_BUSY value
 */
export const dispatchUpdateCell = (dispatch: Function, payload: IUpdateCellAction): void => {
  const {
    rowIndex,
    cellState,
    columnIndex,
    id,
    shipId,
  } = payload;

  if (cellState.ship) {
    const { ship: { orientation } } = cellState;
    const isVertical = orientation === 'vertical';

    let n = isVertical ? rowIndex : columnIndex;
    const indexToUse = isVertical ? rowIndex : columnIndex;

    const siblingCellBusy: CellState = {
      isTarget: false,
      ship: null,
      state: StateValue.CELL_BUSY,
      shipId: cellState.ship.id,
    };

    while (n < indexToUse + cellState.ship.length) {
      dispatch({
        type: ActionKind.UpdateShipLocation,
        payload: {
          rowIndex: orientation === 'vertical' ? n : rowIndex,
          columnIndex: orientation === 'horizontal' ? n : columnIndex,
          cellState: n === indexToUse ? cellState : siblingCellBusy,
          id,
          shipId,
        },
      });
      n += 1;
    }
  }
};

/**
 * Enable/Disable fire button on a Player's Grid
 */
export const toggleIsFireEnabled = (
  dispatch: Dispatch<Action>,
  id: PlayerIdentifiers,
  isFireEnabled: boolean,
) => {
  dispatch({
    type: ActionKind.ToggleIsGridEnabled,
    payload: {
      id,
      isFireEnabled,
    },
  });
};

/**
 * Change the turn to the next player
 */
export const setCurrentTurn = (
  dispatch: Dispatch<Action>,
  id: PlayerIdentifiers,
) => {
  dispatch({
    type: ActionKind.SetCurrentTurn,
    payload: {
      id,
    },
  });
};

/**
 * Start Over and reset the state to initialState
 */
export const resetGame = (
  dispatch: Dispatch<Action>,
) => {
  dispatch({
    type: ActionKind.ResetGame,
    payload: {},
  });
};

/**
 * Show/Hide the Take Next Turn button
 */
export const toggleNextTurnButton = (
  dispatch: Dispatch<Action>,
  showNextTurnButton: boolean,
) => {
  dispatch({
    type: ActionKind.ToggleNextTurnButton,
    payload: {
      showNextTurnButton,
    },
  });
};

/**
 * Called when a Cell is hit - this function checks if all of the
 * ships of a player have been destroyed. It updates the winner flag
 * in the GameState
 */
export const checkPlayerVictory = (
  dispatch: Dispatch<Action>,
  state: GameState,
  id: PlayerIdentifiers,
) => {
  const ships = state.players[id].shipTracker;
  let allShipsSunken = true;

  for (const shipId in ships) {
    if (Object.hasOwnProperty.call(ships, shipId)) {
      const { sunken } = ships[shipId];
      if (!sunken) {
        allShipsSunken = false;
      }
    }
  }

  if (allShipsSunken) {
    let winnerId = id;
    if (id === PlayerIdentifiers.FIRST) {
      winnerId = PlayerIdentifiers.SECOND;
    } else {
      winnerId = PlayerIdentifiers.FIRST;
    }

    dispatch({
      type: ActionKind.CheckPlayerVictory,
      payload: {
        winner: allShipsSunken,
        id: winnerId,
      },
    });
  }
};

/**
 * Validation function to check if all the Ships have been
 * placed on the Grid by the player.
 */
export const areAllPlayerShipsPlaced = (state: GameState, id: PlayerIdentifiers): boolean => {
  const playerState = state.players[id];
  let totalCount = 0;
  let allShipsPlaced = false;

  for (const orientationKey in shipsSchema) {
    if (Object.prototype.hasOwnProperty.call(shipsSchema, orientationKey)) {
      totalCount += shipsSchema[orientationKey].length;
    }
  }

  if (typeof playerState.shipTracker !== 'undefined') {
    allShipsPlaced = totalCount === Object.keys(playerState.shipTracker).length;
  }

  return allShipsPlaced;
};
