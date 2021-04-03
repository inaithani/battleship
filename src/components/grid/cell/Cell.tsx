import { useContext } from 'react';
import classNames from 'classnames';
import { ICellProps } from './Cell.model';
import styles from './Cell.module.scss';
import { DefaultGridDimesions, PlayerIdentifiers } from '../../../App.model';
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
  const { FIRST, SECOND } = PlayerIdentifiers;
  const cellStyles = isShip ? { width: size - 2, height: size - 2 } : {};
  const cellClasses = classNames({
    [styles.cell]: true,
    [styles.isShip]: isShip,
  });

  const prepareToFire = () => {
    const nextPlayer = id === FIRST ? SECOND : id;
    fire(state, dispatch, id, rowIndex, columnIndex);
    toggleIsFireEnabled(dispatch, id, false);
    toggleIsFireEnabled(dispatch, id, false);
    setCurrentTurn(dispatch, nextPlayer);
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
        cellState.state === 2 ? <>H</> : null
      }
      {
        cellState.state === 3 ? <>M</> : null
      }
    </div>
  );
}
