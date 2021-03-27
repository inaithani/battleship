import Cell from '../cell/Cell';
import styles from './BaseGrid.module.scss';
import { IBaseGridProps, DefaultGridDimesions } from './BaseGrid.model';

export default function BaseGrid({ rows = DefaultGridDimesions.Rows, columns = DefaultGridDimesions.Columns }: IBaseGridProps) {
  return <div className={styles.main} style={{ gridTemplateColumns: `repeat(${columns}, minmax(10px, 1fr))` }}>
    {
      [...Array(rows)].map((_, rowIndex) => {
        return [...Array(columns)].map((__, columnIndex) => {
          return <Cell rowIndex={rowIndex} columnIndex={columnIndex} />
        })
      })
    }
  </div>
}