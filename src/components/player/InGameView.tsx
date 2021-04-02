import { PlayerIdentifiers } from '../../App.model';
import GridWrapper from '../grid/index';
import styles from './Player.module.scss';

const InGameView = ({ id }: { id: PlayerIdentifiers }) => {
  const { FIRST, SECOND } = PlayerIdentifiers;
  return (
    <div className={styles.inGameViewContainer}>
      <div className={styles.ownGrid}>
        <GridWrapper id={id} />
        <p className={styles.infoText}>Your Grid</p>
      </div>
      <div className={styles.opponentGrid}>
        <GridWrapper id={id === FIRST ? SECOND : FIRST} />
        <p className={styles.infoText}>Opponent&lsquo;s Grid</p>
      </div>
    </div>
  );
};

export default InGameView;
