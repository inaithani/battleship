import { useContext } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import classNames from 'classnames';
import { GameContext } from '../../GameStore';
import ShipCell from './ShipCell';
import * as ShipModel from './Ship.model';
import {
  DefaultGridDimesions,
  ItemTypes,
  IDragItem,
  IDragCollectionItem,
} from '../../App.model';
import styles from './Ship.module.scss';
import { dispatchUpdateCell } from '../../utils';

export default function Ship({
  id,
  length,
  orientation,
  isPlacedOnGrid = false,
  playerId,
}: ShipModel.ShipProps) {
  const { dispatch } = useContext(GameContext);
  const draggedItem: IDragItem = {
    orientation,
    length,
    id,
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.Ship,
    item: draggedItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item: IDragItem, monitor: DragSourceMonitor) => {
      const dropResult: IDragCollectionItem | null = monitor.getDropResult();
      if (dropResult) {
        dispatchUpdateCell(dispatch, { ...dropResult, id: playerId });
      }
    },
    options: {
      dropEffect: 'move',
    },
  }));
  const shipArray = [...Array(length).fill(0, 0, length)];
  const width = orientation === 'horizontal' ? DefaultGridDimesions.CellSize * length : DefaultGridDimesions.CellSize;
  const shipClasses = classNames({
    [styles[`ship${orientation}`]]: true,
    [styles.isPlacedOnGrid]: isPlacedOnGrid,
  });
  return (
    <div ref={drag} className={shipClasses} style={{ width, opacity: isDragging ? 0.5 : 1, height: isPlacedOnGrid && orientation === 'horizontal' ? DefaultGridDimesions.CellSize : 'auto' }}>
      {
        shipArray.map((el, index) => <ShipCell key={`${orientation}-${el + index}`} />)
      }
    </div>
  );
}
