import { DndProvider } from 'react-dnd';
import { useContext } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridWrapper from '../grid/index';
import Ship from '../ship/index';
import { IPlayerProps } from './Player.model';
import styles from './Player.module.scss';
import { GameContext } from '../../GameStore';
import { PlayerIdentifiers } from '../../App.model';

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
              <h2 className={styles.playerHeading}>{id === PlayerIdentifiers.FIRST ? 'First Player' : 'Second Player'}</h2>
              <div className={styles.playerPane}>
                <div className={styles.playerPaneLeft}>
                  <p>Drag the ships on to the grid to place them</p>
                  <div className={styles.shipsContainer}>
                    <Ship playerId={id} id="qwdqwe12312312" length={4} orientation="horizontal" />
                    <Ship playerId={id} id="qwdqwe12312312" length={3} orientation="horizontal" />
                    <Ship playerId={id} id="qwdqwe12312312" length={2} orientation="horizontal" />
                  </div>
                  <div className={styles.shipsContainer}>
                    <Ship playerId={id} id="qwnmqnjkh1237897918237" length={4} orientation="vertical" />
                    <Ship playerId={id} id="qwnmqnjkh1237897918237" length={3} orientation="vertical" />
                    <Ship playerId={id} id="qwnmqnjkh1237897918237" length={2} orientation="vertical" />
                  </div>
                  <div className={styles.shipsContainer}>
                    <Ship playerId={id} id="12iy381937uyhkjn" length={1} orientation="horizontal" />
                    <Ship playerId={id} id="12iy381937uyhkjn" length={1} orientation="horizontal" />
                  </div>
                </div>
                <div className={styles.playerPaneRight}>
                  <GridWrapper id={id} />
                </div>
              </div>
            </div>
          </DndProvider>
        ) : null
      }
    </div>
  );
};

export default Player;
