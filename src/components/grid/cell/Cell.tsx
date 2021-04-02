import { useContext } from 'react';
import classNames from 'classnames';
import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';
import { DefaultGridDimesions } from '../../../App.model';
import { GameContext } from '../../../GameStore';
import { ActionKind } from '../../../Actions';

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

  const fired = () => {
    const currentCellState = { ...state.players[id].gridState[rowIndex][columnIndex] };
    currentCellState.state = currentCellState.state === 1 ? 2 : 3;
    dispatch({
      type: ActionKind.UpdateCell,
      payload: {
        rowIndex,
        columnIndex,
        cellState: { ...currentCellState },
        id,
      },
    });
  };

  return (
    <div
      className={cellClasses}
      style={cellStyles}
    >
      {
        hiddenViewMode && cellState.state !== 2 && cellState.state !== 3 ? <button onClick={fired} type="button" className={styles.cellButton}>&nbsp;</button> : null
      }
      {
        cellState.state === 2 ? <>HIT</> : null
      }
      {
        cellState.state === 3 ? <>MISS</> : null
      }
    </div>
  );
}
