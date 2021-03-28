import { GridState } from '../App.model';

/* eslint-disable import/prefer-default-export */
export const getBaseGridState = (rows: number, columns: number): GridState => {
  const arrayState = new Array(rows);
  for (let i = 0; i < arrayState.length; i += 1) {
    arrayState[i] = new Array(columns);
    arrayState[i].fill(0, 0, columns);
  }

  return arrayState;
};
