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
    const { locations } = { ...state.players[id].shipTracker[currentCellState.shipId] };
    currentCellState.state = currentCellState.state === 1 ? 2 : 3;
    dispatch({
      type: ActionKind.SetCellHitMissState,
      payload: {
        id,
        rowIndex,
        columnIndex,
        cellState: currentCellState,
      },
    });

    if (Array.isArray(locations) && locations.length) {
      let sunken = true;

      for (let i = 0; i < locations.length; i += 1) {
        const { row, column } = locations[i];
        if (row === rowIndex && column === columnIndex) {
          locations[i].hit = true;
        }

        if (!locations[i].hit) {
          sunken = false;
        }
      }

      dispatch({
        type: ActionKind.UpdateShipTracker,
        payload: {
          locations,
          sunken,
          id,
          shipId: currentCellState.shipId,
        },
      });
    }
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
        cellState.state === 2 ? <>H</> : null
      }
      {
        cellState.state === 3 ? <>M</> : null
      }
    </div>
  );
}
