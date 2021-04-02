import {
  GridState,
  CellState,
  DefaultGridDimesions,
  IGridStateUpdateObjects,
} from '../App.model';
import { Orientation } from '../components/ship/Ship.model';

export const getBaseGridState = (rows: number, columns: number): GridState => {
  const arrayState = new Array(rows);
  const defaultCellState: CellState = {
    state: 0,
    isTarget: false,
    ship: null,
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
) => {
  const cellsToUpdate = [];
  if (length === 1) {
    return [{
      state: 1,
      rowIndex,
      columnIndex,
      isTarget: true,
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
    });
    n += 1;
  }

  cellsToUpdate[0].isTarget = true;
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

export const getUpdatedGridState = (
  gridStateUpdateObjects: IGridStateUpdateObjects,
  gridState: GridState,
) => {
  const newState = [...gridState];

  gridStateUpdateObjects.forEach((gridStateUpdateObject) => {
    const {
      state,
      rowIndex,
      columnIndex,
      isTarget = false,
      ship,
    } = gridStateUpdateObject;
    newState[rowIndex][columnIndex] = {
      isTarget,
      state,
      ship,
    };
  });

  return newState;
};
