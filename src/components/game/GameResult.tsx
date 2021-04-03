import { useContext } from 'react';
import { PlayerIdentifiers } from '../../App.model';
import { GameContext } from '../../GameStore';
import GridWrapper from '../grid/index';
import { resetGame } from '../../utils/index';
import styles from './Game.module.scss';

const GameResult = () => {
  const { state, dispatch } = useContext(GameContext);
  const { FIRST, SECOND } = PlayerIdentifiers;

  const isFirstPlayerWinner = state.players[FIRST].winner;

  const startOver = () => {
    resetGame(dispatch);
  };

  return (
    <div className={styles.gameResultContainer}>
      <h2 className={styles.header}>
        &#x272D;&#x272D;&#x272D; Game Over.
        <span className={styles.playerName}>
          {
            isFirstPlayerWinner ? ' First ' : ' Second '
          }
          Player
        </span>
        {' '}
        is the winner. &#x272D;&#x272D;&#x272D;
      </h2>
      <div className={styles.readOnlyGrids}>
        <div className={styles.player}>
          <h4>First Player</h4>
          <GridWrapper id={FIRST} />
        </div>
        <div className={styles.player}>
          <h4>Second Player</h4>
          <GridWrapper id={SECOND} />
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.gameButton} type="button" onClick={startOver}>
          Start Over
        </button>
      </div>
    </div>
  );
};

export default GameResult;
