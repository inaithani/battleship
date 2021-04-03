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
import { ActionKind } from '../../Actions';

export default function Ship({
  id,
  length,
  orientation,
  isPlacedOnGrid = false,
  playerId,
  hiddenViewMode = false,
  sunken = false,
}: ShipModel.ShipProps) {
  const { state, dispatch } = useContext(GameContext);
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
        const shipTracker = state.players[playerId].shipTracker[id];
        if (typeof shipTracker !== 'undefined') {
          const previousLocations = { ...shipTracker.locations };
          previousLocations.map((previousLocation) => {
            const { row, column } = previousLocation;
            dispatch({
              type: ActionKind.ClearShipLocation,
              payload: {
                rowIndex: row,
                columnIndex: column,
                id: playerId,
              },
            });
            return true;
          });
        }

        dispatch({ type: ActionKind.InitializeShipTraker, payload: { id: playerId, shipId: id } });
        dispatchUpdateCell(dispatch, { ...dropResult, id: playerId, shipId: id });
      }
    },
    options: {
      dropEffect: 'move',
    },
  }));
  const shipArray = [...Array(length).fill(0, 0, length)];
  const width = orientation === 'horizontal' ? DefaultGridDimesions.CellSize * length + (length - 1) : DefaultGridDimesions.CellSize;
  const shipClasses = classNames({
    [styles[`ship${orientation}`]]: true,
    [styles.isPlacedOnGrid]: isPlacedOnGrid,
    [styles.hiddenViewMode]: hiddenViewMode && !sunken,
    [styles.sunken]: sunken,
  });
  return (
    <div
      ref={!state.started ? drag : null}
      className={shipClasses}
      style={{
        width,
        opacity: isDragging ? 0.5 : 1,
        height: orientation === 'horizontal' ? DefaultGridDimesions.CellSize : DefaultGridDimesions.CellSize * length + (length - 1),
      }}
    >
      {
        shipArray.map((el, index) => <ShipCell key={`${orientation}-${el + index}`} isPlacedOnGrid={isPlacedOnGrid} orientation={orientation} />)
      }
    </div>
  );
}
