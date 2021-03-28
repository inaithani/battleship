import { useDrop } from 'react-dnd';
import Cell from './Cell';
import { ICellProps } from './Cell.model';
import { ItemTypes, IDragItem } from '../../../App.model';

export default function DropAwareCell({
  rowIndex,
  columnIndex,
  isShip = false,
  cellState,
}: ICellProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.Ship,
    drop: () => {},
    collect: (monitor) => {
      const item: IDragItem = monitor.getItem();
      if (item) {
        if (item.orientation === 'horizontal') {
          console.log(item);
        }
      }
      return {
        isOver: monitor.isOver(),
      };
    },
  }));
  return (
    <div ref={drop}>
      <Cell
        isShip={isShip}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        isOver={isOver}
        cellState={cellState}
      />
    </div>
  );
}
