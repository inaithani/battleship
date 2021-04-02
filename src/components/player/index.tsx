import { DndProvider } from 'react-dnd';
import { ReactNode, useContext } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridWrapper from '../grid/index';
import { IPlayerProps } from './Player.model';
import styles from './Player.module.scss';
import { GameContext } from '../../GameStore';
import { PlayerIdentifiers } from '../../App.model';
import ShipsContainer from './ShipsContainer';
import InGameView from './InGameView';

const WithHeader = ({ children, id }: { children: ReactNode, id: PlayerIdentifiers }) => (
  <div className={styles.playerWrapperMain}>
    <h2>Battleship</h2>
    <h2 className={styles.playerHeading}>{id === PlayerIdentifiers.FIRST ? 'First Player' : 'Second Player'}</h2>
    {
      children
    }
  </div>
);

const Player = ({ id }: IPlayerProps) => {
  const { state } = useContext(GameContext);
  const { isActive } = state.players[id];
  const { started } = state;
  return (
    <div>
      {
        isActive && !started ? (
          <DndProvider backend={HTML5Backend}>
            <WithHeader id={id}>
              <div className={styles.playerPane}>
                <div className={styles.playerPaneLeft}>
                  <ShipsContainer id={id} />
                </div>
                <div className={styles.playerPaneRight}>
                  <GridWrapper id={id} />
                </div>
              </div>
            </WithHeader>
          </DndProvider>
        ) : null
      }
      {
        started && isActive ? (
          <DndProvider backend={HTML5Backend}>
            <WithHeader id={id}>
              <InGameView id={id} />
            </WithHeader>
          </DndProvider>
        ) : null
      }
    </div>
  );
};

export default Player;
