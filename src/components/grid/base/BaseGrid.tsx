import DropAwareCell from '../cell/DropAwareCell';
import styles from './BaseGrid.module.scss';
import { IBaseGridProps } from './BaseGrid.model';
import { DefaultGridDimesions, CellState } from '../../../App.model';

export default function BaseGrid({
  columns = DefaultGridDimesions.Columns,
  gridState,
  updateGridState,
}: IBaseGridProps) {
  const baseGridWith = (columns * DefaultGridDimesions.CellSize) + (columns - 1);
  return (
    <div className={styles.main} style={{ width: baseGridWith, gridTemplateColumns: `repeat(${columns}, minmax(${DefaultGridDimesions.CellSize}px, 0fr))` }}>
      { // eslint-disable-next-line
        gridState.map((rowArray, rowIndex) => rowArray.map((cellState: CellState, columnIndex: number) => <DropAwareCell gridState={gridState} cellState={cellState} key={`${rowIndex}${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} updateGridState={updateGridState} />))
      }
    </div>
  );
}
