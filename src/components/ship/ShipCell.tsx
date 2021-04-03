import classNames from 'classnames';
import { DefaultGridDimesions } from '../../App.model';
import { IShipCellProps } from './Ship.model';
import styles from './Ship.module.scss';

export default function ShipCell({ disabled = false }: IShipCellProps) {
  const size = DefaultGridDimesions.CellSize;
  const cellStyles = { width: size - 2, height: size - 2 };
  const cellClasses = classNames({
    [styles.shipCell]: true,
    [styles.shipCellDisabled]: disabled,
  });
  return (
    <div
      className={cellClasses}
      style={cellStyles}
    />
  );
}
