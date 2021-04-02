import { DndProvider } from 'react-dnd';
import { useContext, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridWrapper from '../grid/index';
import Ship from '../ship/index';
import { getBaseGridState, getUpdatedGridState } from '../../utils/index';
import { DefaultGridDimesions, IGridStateUpdateObjects } from '../../App.model';
import { IPlayerProps } from './Player.model';
import styles from './Player.module.scss';
import { GameContext } from '../../GameStore';

const Player = ({ id }: IPlayerProps) => {

  const { state } = useContext(GameContext);
  const { isActive } = state[id];
  return (
    <div>
      {
        isActive ? (
          <DndProvider backend={HTML5Backend}>
            <div className={styles.playerWrapperMain}>
              <h2>Battleship</h2>
              <div className={styles.playerView}>
                <Ship id="qwdqwe12312312"  length={2} orientation="horizontal" />
                <p>---</p>
                <Ship id="qwnmqnjkh1237897918237"  length={3} orientation="vertical" />
                <p>----</p>
                <Ship id="12iy381937uyhkjn"  length={5} orientation="horizontal" />
                <p>----</p>
                <GridWrapper id={id} />
              </div>
            </div>
          </DndProvider>
        ) : null
      }
    </div>
  );
};

export default Player;
