import { DndProvider } from 'react-dnd';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridWrapper from '../grid/index';
import Ship from '../ship/index';
import { getBaseGridState, getUpdatedGridState } from '../../utils/index';
import { DefaultGridDimesions, IGridStateUpdateObjects } from '../../App.model';
import { IPlayerProps } from './Player.model';
import styles from './Player.module.scss';

const Player = ({ isActive }: IPlayerProps) => {
  const [gridState, setGridState] = useState(
    getBaseGridState(DefaultGridDimesions.Rows, DefaultGridDimesions.Columns),
  );

  const updateGridState = (gridStateUpdateObjects: IGridStateUpdateObjects) => {
    setGridState(getUpdatedGridState(gridStateUpdateObjects, gridState));
  };

  return (
    <div>
      {
        isActive ? (
          <DndProvider backend={HTML5Backend}>
            <div className={styles.playerWrapperMain}>
              <h2>Battleship</h2>
              <div className={styles.playerView}>
                <Ship id="qwdqwe12312312" updateGridState={updateGridState} length={2} orientation="horizontal" />
                <p>---</p>
                <Ship id="qwnmqnjkh1237897918237" updateGridState={updateGridState} length={3} orientation="vertical" />
                <p>----</p>
                <Ship id="12iy381937uyhkjn" updateGridState={updateGridState} length={5} orientation="horizontal" />
                <p>----</p>
                <GridWrapper gridState={gridState} updateGridState={updateGridState} />
              </div>
            </div>
          </DndProvider>
        ) : null
      }
    </div>
  );
};

export default Player;
