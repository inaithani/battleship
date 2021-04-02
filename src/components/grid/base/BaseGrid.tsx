import { useContext } from 'react';
import classNames from 'classnames';
import DropAwareCell from '../cell/DropAwareCell';
import styles from './BaseGrid.module.scss';
import { IBaseGridProps } from './BaseGrid.model';
import { DefaultGridDimesions, CellState } from '../../../App.model';
import { GameContext } from '../../../GameStore';

export default function BaseGrid({ id, hiddenViewMode }: IBaseGridProps) {
  const { state } = useContext(GameContext);
  const { gridState } = state.players[id];
  const { Columns, CellSize } = DefaultGridDimesions;
  const baseGridWith = (Columns * CellSize) + (Columns - 1);
  const cssClasses = classNames({
    [styles.main]: true,
    [styles.hiddenViewMode]: hiddenViewMode,
  });

  return (
    <div className={cssClasses} style={{ width: baseGridWith, gridTemplateColumns: `repeat(${Columns}, minmax(${CellSize}px, 0fr))` }}>
      { // eslint-disable-next-line
        gridState.map((rowArray, rowIndex) => rowArray.map((cellState: CellState, columnIndex: number) => <DropAwareCell id={id} rowIndex={rowIndex} columnIndex={columnIndex} key={`${rowIndex}${columnIndex}`} hiddenViewMode={hiddenViewMode} />))
      }
    </div>
  );
}
