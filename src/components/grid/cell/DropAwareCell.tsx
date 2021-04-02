import { useContext, useState } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { GameContext } from '../../../GameStore';
import Cell from './Cell';
import Ship from '../../ship/index';
import { ICellProps } from './Cell.model';
import {
  ItemTypes,
  IDragItem,
  DefaultGridDimesions,
  IDragCollectionItem,
} from '../../../App.model';
import { hasCollisionPath } from '../../../utils/index';
import styles from './Cell.module.scss';

export default function DropAwareCell({
  rowIndex,
  columnIndex,
  isShip = false,
  id,
}: ICellProps) {
  const { state } = useContext(GameContext);
  const playerState = state.players[id];
  const [showDropPlaceholder, setShowDropPlaceholder] = useState(false);
  const [currentDraggedShip, setCurrentDraggedShip] = useState<IDragItem | null>(null);
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.Ship,
    drop: (draggedItem: IDragItem): IDragCollectionItem => ({
      rowIndex,
      columnIndex,
      cellState: {
        state: 1,
        isTarget: true,
        ship: {
          id: draggedItem.id,
          length: draggedItem.length,
          orientation: draggedItem.orientation,
        },
      },
    }),
    collect: (monitor) => {
      const isOverCell = monitor.isOver();
      if (isOverCell) {
        const shipItem: IDragItem = monitor.getItem();
        setCurrentDraggedShip(shipItem);
        const isColliding = hasCollisionPath(
          playerState.gridState,
          rowIndex,
          columnIndex,
          shipItem.orientation,
          shipItem.length,
        );
        setShowDropPlaceholder(isOverCell && !isColliding);
      } else {
        setShowDropPlaceholder(false);
      }
      return {
        isOver: isOverCell,
      };
    },
    canDrop: (shipItem) => {
      const isColliding = hasCollisionPath(
        playerState.gridState,
        rowIndex,
        columnIndex,
        shipItem.orientation,
        shipItem.length,
      );
      if (isColliding) return false;
      return true;
    },
  }));

  const classesMainWrapper = classNames({
    [styles.positionRelative]: true,
  });

  const classesPlaceholder = classNames({
    [styles.showDropPlaceholder]: showDropPlaceholder,
  });

  const { isTarget, ship, state: cellStateValue } = playerState.gridState[rowIndex][columnIndex];

  return (
    <div ref={cellStateValue === 0 ? drop : null} className={classesMainWrapper}>
      <Cell
        isShip={isShip}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        id={id}
      />
      {
        isTarget && ship ? (
          <Ship
            playerId={id}
            length={ship.length}
            orientation={ship.orientation}
            id={ship.id}
            isPlacedOnGrid
          />
        ) : null
      }
      {
        showDropPlaceholder && currentDraggedShip ? (
          <div
            className={classesPlaceholder}
            style={{
              height: currentDraggedShip.orientation === 'vertical' ? DefaultGridDimesions.CellSize * currentDraggedShip.length : DefaultGridDimesions.CellSize,
              width: currentDraggedShip.orientation === 'horizontal' ? DefaultGridDimesions.CellSize * currentDraggedShip.length : DefaultGridDimesions.CellSize,
            }}
          />
        ) : null
      }
    </div>
  );
}
