import { useState } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import Cell from './Cell';
import Ship from '../../ship/index';
import { ICellProps } from './Cell.model';
import { ItemTypes, IDragItem, DefaultGridDimesions } from '../../../App.model';
import styles from './Cell.module.scss';

export default function DropAwareCell({
  rowIndex,
  columnIndex,
  isShip = false,
  cellState,
  updateGridState,
}: ICellProps) {
  const [item, setItem] = useState<IDragItem>({ length: 0, orientation: 'horizontal' });
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
        cellState,
      };
    },
    collect: (monitor) => {
      const isOverCell = monitor.isOver();

      if (isOverCell) {
        setItem(monitor.getItem());
        setShowDropPlaceholder(isOverCell);
      } else {
        setShowDropPlaceholder(false);
      }
      return {
        isOver: isOverCell,
      };
    },
  }));

  const classesMainWrapper = classNames({
    [styles.positionRelative]: true,
  });

  const classesPlaceholder = classNames({
    [styles.showDropPlaceholder]: showDropPlaceholder,
  });

  return (
    <div ref={drop} className={classesMainWrapper}>
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
