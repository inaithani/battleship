import { useContext } from 'react';
import classNames from 'classnames';
import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';
import { DefaultGridDimesions } from '../../../App.model';
import { GameContext } from '../../../GameStore';
import { fire } from './helpers';
import { toggleIsFireEnabled, setCurrentTurn, toggleNextTurnButton } from '../../../utils/index';

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
    [styles.hit]: cellState.state === 2,
  });

  const prepareToFire = () => {
    fire(state, dispatch, id, rowIndex, columnIndex);
    toggleIsFireEnabled(dispatch, id, false);
    setCurrentTurn(dispatch, id);
    toggleNextTurnButton(dispatch, true);
  };

  const enableFireButton = hiddenViewMode
  && state.players[id].isFireEnabled
  && cellState.state !== 2
  && cellState.state !== 3;

  return (
    <div
      className={cellClasses}
      style={cellStyles}
    >
      {
        enableFireButton ? <button onClick={prepareToFire} type="button" className={styles.cellButton}>&nbsp;</button> : null
      }
      {
        cellState.state === 2 ? <div className={styles.cellHit}>&#x2715;</div> : null
      }
      {
        cellState.state === 3 ? <div className={styles.missed}>&sdot;</div> : null
      }
    </div>
  );
}
