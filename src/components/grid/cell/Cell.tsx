import { useContext } from 'react';
import classNames from 'classnames';
import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';
import { DefaultGridDimesions } from '../../../App.model';
import { GameContext } from '../../../GameStore';

export default function Cell({
  isShip = false,
  hiddenViewMode = false,
  rowIndex,
  columnIndex,
  id,
}: ICellProps) {
  const { state, dispatch } = useContext(GameContext);
  const size = DefaultGridDimesions.CellSize;
  const cellStyles = isShip ? { width: size - 2, height: size - 2 } : {};
  const cellClasses = classNames({
    [styles.cell]: true,
    [styles.isShip]: isShip,
  });

  const fired = () => {
    console.log('rowIndex : ', rowIndex);
    console.log('columnIndex : ', columnIndex);
    console.log('cellState : ', state.players[id].gridState[rowIndex][columnIndex]);
    console.log('id : ', id);
  };

  return (
    <div
      className={cellClasses}
      style={cellStyles}
    >
      {
        hiddenViewMode ? <button onClick={fired} type="button" className={styles.cellButton}>&nbsp;</button> : null
      }
    </div>
  );
}
