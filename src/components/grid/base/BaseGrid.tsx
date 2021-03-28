import { useState } from 'react';
import DropAwareCell from '../cell/DropAwareCell';
import styles from './BaseGrid.module.scss';
import { IBaseGridProps } from './BaseGrid.model';
import { CellState } from '../cell/Cell.model';
import { DefaultGridDimesions } from '../../../App.model';

const getBaseGridState = (rows: number, columns: number) => {
  const arrayState = new Array(rows);
  for (let i = 0; i < arrayState.length; i += 1) {
    arrayState[i] = new Array(columns);
    arrayState[i].fill(0, 0, columns);
  }

  return arrayState;
};

export default function BaseGrid({
  rows = DefaultGridDimesions.Rows,
  columns = DefaultGridDimesions.Columns,
}: IBaseGridProps) {
  const [gridState] = useState(getBaseGridState(rows, columns));
  const baseGridWith = (columns * DefaultGridDimesions.CellSize) + (columns - 1);
  return (
    <div className={styles.main} style={{ width: baseGridWith, gridTemplateColumns: `repeat(${columns}, minmax(${DefaultGridDimesions.CellSize}px, 0fr))` }}>
      { // eslint-disable-next-line
        gridState.map((rowArray, rowIndex) => rowArray.map((cellState: CellState, columnIndex: number) => <DropAwareCell cellState={cellState} key={`${rowIndex}${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} />))
      }
    </div>
  );
}
