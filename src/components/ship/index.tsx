import { useDrag } from 'react-dnd';
import Cell from '../grid/cell/Cell';
import { ShipProps } from './Ship.model';
import { DefaultGridDimesions, ItemTypes, IDragItem } from '../../App.model';
import styles from './Ship.module.scss';

export default function Ship({ length, orientation }: ShipProps) {
  const draggedItem: IDragItem = {
    orientation,
    length,
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.Ship,
    item: draggedItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const shipArray = [...Array(length)];
  const width = orientation === 'horizontal' ? DefaultGridDimesions.CellSize * length : DefaultGridDimesions.CellSize;
  return (
    <div ref={drag} className={styles[`ship${orientation}`]} style={{ width, opacity: isDragging ? 0.5 : 1 }}>
      {
        shipArray.map((index) => <Cell key={index} isShip />)
      }
    </div>
  );
}
