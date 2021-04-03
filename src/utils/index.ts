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

export const nextPlayerGameSetup = (dispatch: Dispatch<Action>, isFirstPlayerActive: boolean) => {
  const id = isFirstPlayerActive ? PlayerIdentifiers.SECOND : PlayerIdentifiers.FIRST;
  dispatch({
    type: ActionKind.SetActivePlayer,
    payload: {
      id,
    },
  });
};

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

const isShipOutOfBounds = (
  rowIndex: number,
  columnIndex: number,
  orientation: Orientation,
  length: number,
) => {
  let isOutOfBounds = false;
  if (orientation === 'vertical') {
    isOutOfBounds = (rowIndex + length) > DefaultGridDimesions.Rows;
  } else {
    isOutOfBounds = (columnIndex + length) > DefaultGridDimesions.Columns;
  }

  return isOutOfBounds;
};

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
      state: 1,
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

export const resetGame = (
  dispatch: Dispatch<Action>,
) => {
  dispatch({
    type: ActionKind.ResetGame,
    payload: {},
  });
};

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
