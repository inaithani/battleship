import { useState } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import Cell from './Cell';
import Ship from '../../ship/index';
import { ICellProps } from './Cell.model';
import { ItemTypes, IDragItem, DefaultGridDimesions } from '../../../App.model';
import { hasCollisionPath } from '../../../utils/index';
import styles from './Cell.module.scss';

export default function DropAwareCell({
  rowIndex,
  columnIndex,
  isShip = false,
  cellState,
  updateGridState,
  gridState,
}: ICellProps) {
  const [item, setItem] = useState<IDragItem>({ length: 0, orientation: 'horizontal', id: '' });
  const [showDropPlaceholder, setShowDropPlaceholder] = useState(false);
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.Ship,
    drop: (draggedItem: IDragItem) => {
      if (draggedItem) {
        setItem(draggedItem);
      }
      return {
        rowIndex,
        columnIndex,
        cellState: {
          state: 1,
          isTarget: true,
        },
      };
    },
    collect: (monitor) => {
      const isOverCell = monitor.isOver();
      if (isOverCell) {
        const shipItem: IDragItem = monitor.getItem();
        const isColliding = hasCollisionPath(
          gridState,
          rowIndex,
          columnIndex,
          shipItem.orientation,
          shipItem.length,
        );
        setItem(shipItem);
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
        gridState,
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

  return (
    <div ref={cellState?.state === 0 ? drop : null} className={classesMainWrapper}>
      <Cell
        isShip={isShip}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        cellState={cellState}
        updateGridState={updateGridState}
      />
      {
        cellState?.isTarget ? (
          <Ship
            updateGridState={updateGridState}
            length={item.length}
            orientation={item.orientation}
            id={item.id}
            isPlacedOnGrid
          />
        ) : null
      }
      {
        showDropPlaceholder ? (
          <div
            className={classesPlaceholder}
            style={{
              height: item.orientation === 'vertical' ? DefaultGridDimesions.CellSize * item.length : DefaultGridDimesions.CellSize,
              width: item.orientation === 'horizontal' ? DefaultGridDimesions.CellSize * item.length : DefaultGridDimesions.CellSize,
            }}
          />
        ) : null
      }
    </div>
  );
}
