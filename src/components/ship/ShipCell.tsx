import classNames from 'classnames';
import { DefaultGridDimesions } from '../../App.model';
import styles from './Ship.module.scss';

export default function ShipCell() {
  const size = DefaultGridDimesions.CellSize;
  const cellStyles = { width: size - 2, height: size - 2 };
  const cellClasses = classNames({
    [styles.shipCell]: true,
  });
  return (
    <div
      className={cellClasses}
      style={cellStyles}
    />
  );
}
