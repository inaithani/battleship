import { v4 as uuidv4 } from 'uuid';
import { PlayerIdentifiers } from '../../App.model';
import Ship from '../ship/index';
import styles from './Player.module.scss';

const ShipsContainer = ({ id }: { id: PlayerIdentifiers }) => (
  <>
    <p>Drag the ships on to the grid to place them</p>
    <div className={styles.shipsContainer}>
      <Ship playerId={id} id={uuidv4()} length={4} orientation="horizontal" />
      <Ship playerId={id} id={uuidv4()} length={3} orientation="horizontal" />
      <Ship playerId={id} id={uuidv4()} length={2} orientation="horizontal" />
    </div>
    <div className={styles.shipsContainer}>
      <Ship playerId={id} id={uuidv4()} length={4} orientation="vertical" />
      <Ship playerId={id} id={uuidv4()} length={3} orientation="vertical" />
      <Ship playerId={id} id={uuidv4()} length={2} orientation="vertical" />
    </div>
    <div className={styles.shipsContainer}>
      <Ship playerId={id} id={uuidv4()} length={1} orientation="horizontal" />
      <Ship playerId={id} id={uuidv4()} length={1} orientation="horizontal" />
    </div>
  </>
);

export default ShipsContainer;
