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
  StateValue,
} from '../../../App.model';
import { hasCollisionPath } from '../../../utils/index';
import styles from './Cell.module.scss';

export default function DropAwareCell({
  rowIndex,
  columnIndex,
  isShip = false,
  id,
  hiddenViewMode = false,
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
        shipId: draggedItem.id,
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
          shipItem.id,
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
        shipItem.id,
      );
      if (isColliding) return false;
      return true;
    },
  }));

  const classesMainWrapper = classNames({
    [styles.dropAwareCellMainWrapper]: true,
  });

  const classesPlaceholder = classNames({
    [styles.showDropPlaceholder]: showDropPlaceholder,
  });

  const {
    isTarget,
    ship,
    shipId,
    state: cellStateValue,
  } = playerState.gridState[rowIndex][columnIndex];

  let sunken = false;

  if (typeof playerState.shipTracker[shipId] !== 'undefined') {
    sunken = playerState.shipTracker[shipId].sunken;
  }

  return (
    <div
      ref={cellStateValue === StateValue.CELL_EMPTY ? drop : null}
      className={classesMainWrapper}
      style={{
        width: DefaultGridDimesions.CellSize,
        height: DefaultGridDimesions.CellSize,
      }}
    >
      <Cell
        isShip={isShip}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        id={id}
        hiddenViewMode={hiddenViewMode}
      />
      {
        isTarget && ship ? (
          <Ship
            playerId={id}
            length={ship.length}
            orientation={ship.orientation}
            id={ship.id}
            isPlacedOnGrid
            hiddenViewMode={hiddenViewMode}
            sunken={sunken}
          />
        ) : null
      }
      {
        showDropPlaceholder && currentDraggedShip ? (
          <div
            className={classesPlaceholder}
            style={{
              height: currentDraggedShip.orientation === 'vertical' ? DefaultGridDimesions.CellSize * currentDraggedShip.length + (currentDraggedShip.length - 1) : DefaultGridDimesions.CellSize,
              width: currentDraggedShip.orientation === 'horizontal' ? DefaultGridDimesions.CellSize * currentDraggedShip.length + (currentDraggedShip.length - 1) : DefaultGridDimesions.CellSize,
            }}
          />
        ) : null
      }
    </div>
  );
}
