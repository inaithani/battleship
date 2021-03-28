import classNames from 'classnames';
import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';
import { DefaultGridDimesions } from '../../../App.model';

export default function Cell({
  isShip = false,
  isOver = false,
  cellState = 0,
}: ICellProps) {
  const size = DefaultGridDimesions.CellSize;
  const cellStyles = isShip ? { width: size - 2, height: size - 2 } : {};
  const cellClasses = classNames({
    [styles.cell]: true,
    [styles.isShip]: isShip,
    [styles.isOver]: isOver,
  });
  return (
    <div
      className={cellClasses}
      style={cellStyles}
    >
      {cellState}
    </div>
  );
}
