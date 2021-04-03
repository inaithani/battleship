import { useContext } from 'react';
import classNames from 'classnames';
import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';
import { DefaultGridDimesions } from '../../../App.model';
import { GameContext } from '../../../GameStore';
import { fire } from './helpers';

export default function Cell({
  isShip = false,
  hiddenViewMode = false,
  rowIndex,
  columnIndex,
  id,
}: ICellProps) {
  const { state, dispatch } = useContext(GameContext);
  const cellState = state.players[id].gridState[rowIndex][columnIndex];
  const size = DefaultGridDimesions.CellSize;
  const cellStyles = isShip ? { width: size - 2, height: size - 2 } : {};
  const cellClasses = classNames({
    [styles.cell]: true,
    [styles.isShip]: isShip,
  });

  const prepareToFire = () => {
    fire(state, dispatch, id, rowIndex, columnIndex);
  };

  return (
    <div
      className={cellClasses}
      style={cellStyles}
    >
      {
        hiddenViewMode && cellState.state !== 2 && cellState.state !== 3 ? <button onClick={prepareToFire} type="button" className={styles.cellButton}>&nbsp;</button> : null
      }
      {
        cellState.state === 2 ? <>H</> : null
      }
      {
        cellState.state === 3 ? <>M</> : null
      }
    </div>
  );
}
