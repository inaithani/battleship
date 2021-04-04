import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';
import { DefaultGridDimesions, StateValue } from '../../../App.model';
import { GameContext } from '../../../GameStore';
import GridMarker from './GridMarker';
import { fire } from './helpers';
import {
  toggleIsFireEnabled,
  setCurrentTurn,
  toggleNextTurnButton,
  checkPlayerVictory,
} from '../../../utils/index';

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
    [styles.hit]: cellState.state === StateValue.CELL_HIT,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (cellState.state === StateValue.CELL_HIT) {
      checkPlayerVictory(dispatch, state, id);
    }
  }, [cellState.state === StateValue.CELL_HIT]);

  const prepareToFire = () => {
    fire(state, dispatch, id, rowIndex, columnIndex);
    toggleIsFireEnabled(dispatch, id, false);
    setCurrentTurn(dispatch, id);
    toggleNextTurnButton(dispatch, true);
  };

  const enableFireButton = hiddenViewMode
  && state.players[id].isFireEnabled
  && cellState.state !== StateValue.CELL_HIT
  && cellState.state !== StateValue.CELL_MISS;

  const showGridMarker = rowIndex === 0 || columnIndex === 0;

  return (
    <div
      className={cellClasses}
      style={cellStyles}
    >
      {
        enableFireButton ? <button onClick={prepareToFire} type="button" className={styles.cellButton}>&nbsp;</button> : null
      }
      {
        cellState.state === StateValue.CELL_HIT
          ? <div className={styles.cellHit}>&#x2715;</div> : null
      }
      {
        cellState.state === StateValue.CELL_MISS
          ? <div className={styles.missed}>&sdot;</div> : null
      }
      {
        showGridMarker ? <GridMarker rowIndex={rowIndex} columnIndex={columnIndex} /> : null
      }
    </div>
  );
}
