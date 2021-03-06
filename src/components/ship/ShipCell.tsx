import classNames from 'classnames';
import { DefaultGridDimesions } from '../../App.model';
import { IShipCellProps } from './Ship.model';
import styles from './Ship.module.scss';

export default function ShipCell({
  disabled = false,
  isPlacedOnGrid = true,
  orientation = 'none',
}: IShipCellProps) {
  const size = DefaultGridDimesions.CellSize;
  const cellStyles = { width: size, height: size };
  const cellClasses = classNames({
    [styles.shipCell]: true,
    [styles.shipCellDisabled]: disabled,
    [styles.inGrid]: isPlacedOnGrid,
    [styles[orientation]]: true,
  });
  return (
    <div
      className={cellClasses}
      style={cellStyles}
    />
  );
}
