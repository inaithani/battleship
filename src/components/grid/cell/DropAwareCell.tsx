import { useState } from 'react';
import { useDrop } from 'react-dnd';
import Cell from './Cell';
import Ship from '../../ship/index';
import { ICellProps } from './Cell.model';
import { ItemTypes, IDragItem } from '../../../App.model';

export default function DropAwareCell({
  rowIndex,
  columnIndex,
  isShip = false,
  cellState,
  updateGridState,
}: ICellProps) {
  const [item, setItem] = useState<IDragItem>({ length: 0, orientation: 'horizontal' });
  const [{ isOver }, drop] = useDrop(() => ({
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
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <div ref={drop}>
      <Cell
        isShip={isShip}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        isOver={isOver}
        cellState={cellState}
        updateGridState={updateGridState}
      />
      {
        cellState ? (
          <Ship
            updateGridState={updateGridState}
            length={item.length}
            orientation={item.orientation}
          />
        ) : null
      }
    </div>
  );
}
