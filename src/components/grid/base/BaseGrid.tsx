import Cell from '../cell/Cell';
import styles from './BaseGrid.module.scss';
import { IBaseGridProps, DefaultGridDimesions } from './BaseGrid.model';

export default function BaseGrid({
  rows = DefaultGridDimesions.Rows,
  columns = DefaultGridDimesions.Columns,
}: IBaseGridProps) {
  const rowsArray = [...Array(rows)];
  const columnArray = [...Array(columns)];
  return (
    <div className={styles.main} style={{ gridTemplateColumns: `repeat(${columns}, minmax(10px, 1fr))` }}>
      { // eslint-disable-next-line
        rowsArray.map((_, rowIndex) => columnArray.map((__, columnIndex) => <Cell rowIndex={rowIndex} columnIndex={columnIndex} />))
      }
    </div>
  );
}
