import { ActionKind, IUpdateCellAction } from '../Actions';
import {
  GridState,
  CellState,
  DefaultGridDimesions,
} from '../App.model';
import { Orientation } from '../components/ship/Ship.model';

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

export const getCellsToUpdate = (
  orientation: any,
  rowIndex: number,
  columnIndex: number,
  length: number,
  state = 1,
  ship: any,
) => {
  const cellsToUpdate = [];
  if (length === 1) {
    return [{
      state: 1,
      rowIndex,
      columnIndex,
      isTarget: true,
      ship,
    }];
  }

  const isVertical = orientation === 'vertical';

  let n = isVertical ? rowIndex : columnIndex;
  const indexToUse = isVertical ? rowIndex : columnIndex;

  while (n < indexToUse + length) {
    cellsToUpdate.push({
      state,
      rowIndex: orientation === 'vertical' ? n : rowIndex,
      columnIndex: orientation === 'horizontal' ? n : columnIndex,
      isTarget: false,
      ship: null,
    });
    n += 1;
  }

  cellsToUpdate[0].isTarget = true;
  cellsToUpdate[0].ship = ship;
  return cellsToUpdate;
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
): boolean => {
  if (Array.isArray(gridState) && typeof rowIndex === 'number' && typeof columnIndex === 'number') {
    const { state } = gridState[rowIndex][columnIndex];
    if (state === 1) {
      return true;
    }

    if (isShipOutOfBounds(rowIndex, columnIndex, orientation, length)) {
      return true;
    }

    let collisionFound = false;
    if (orientation === 'vertical') {
      let n = rowIndex;
      while (n < rowIndex + length) {
        if (gridState[n][columnIndex].state === 1) {
          collisionFound = true;
          break;
        }
        n += 1;
      }
    } else {
      let n = columnIndex;
      while (n < columnIndex + length) {
        if (gridState[rowIndex][n].state === 1) {
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
