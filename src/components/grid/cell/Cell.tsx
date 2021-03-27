import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';

export default function Cell({ rowIndex, columnIndex }: ICellProps) {
  return (
    <div className={styles.cell}>
      {rowIndex}
      {columnIndex}
    </div>
  );
}
