import { useContext } from 'react';
import { PlayerIdentifiers } from '../../App.model';
import Ship from '../ship/index';
import styles from './Player.module.scss';
import { GameContext } from '../../GameStore';
import shipsSchema from '../../utils/ships.data';

const ShipsContainer = ({ id }: { id: PlayerIdentifiers }) => {
  const { state } = useContext(GameContext);
  const { shipTracker } = state.players[id];
  return (
    <>
      <p>Drag the ships on to the grid to place them</p>
      <div className={styles.shipsContainer}>
        {
          shipsSchema.horizontal.map((ship) => <Ship playerId={id} id={ship.id} key={ship.id} length={ship.length} orientation="horizontal" />)
        }
      </div>
      <div className={styles.shipsContainer}>
        {
          shipsSchema.vertical.map((ship) => <Ship playerId={id} id={ship.id} key={ship.id} length={ship.length} orientation="vertical" />)
        }
      </div>
      <div className={styles.shipsContainer}>
        {
          shipsSchema.square.map((ship) => <Ship playerId={id} id={ship.id} key={ship.id} length={ship.length} orientation="horizontal" />)
        }
      </div>
    </>
  );
};

export default ShipsContainer;
