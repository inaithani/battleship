import { GridState, CellState } from '../App.model';

export const getBaseGridState = (rows: number, columns: number): GridState => {
  const arrayState = new Array(rows);
  const defaultCellState: CellState = {
    state: 0,
    isTarget: false,
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
