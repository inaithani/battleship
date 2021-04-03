import { useContext } from 'react';
import { GameContext } from '../../GameStore';
import { PlayerIdentifiers } from '../../App.model';
import styles from './Game.module.scss';
import {
  startGame,
  turnChange,
  nextPlayerGameSetup,
  areAllPlayerShipsPlaced,
} from '../../utils/index';

const PlayerActions = () => {
  const { state, dispatch } = useContext(GameContext);
  const { FIRST, SECOND } = PlayerIdentifiers;
  const isFirstPlayerActive = state.players[FIRST].isActive;
  const isSecondPlayerActive = state.players[SECOND].isActive;
  const { started, showNextTurnButton, currentTurn } = state;

  const firstPlayerShipsPlaced = areAllPlayerShipsPlaced(state, FIRST);
  const secondPlayerShipsPlaced = areAllPlayerShipsPlaced(state, SECOND);

  const moveSetupScreen = () => {
    nextPlayerGameSetup(dispatch, isFirstPlayerActive);
  };

  const start = () => {
    startGame(dispatch);
  };

  const nextTurn = () => {
    turnChange(dispatch, state);
  };

  return (
    <div className={styles.actionBar}>
      <div className={styles.buttonBar}>
        {
        !started ? (
          <button className={styles.gameButton} disabled={!firstPlayerShipsPlaced} type="button" onClick={moveSetupScreen}>
            {
            isFirstPlayerActive
              ? <span>Second Player (Setup)&nbsp;&#8594;</span>
              : <span>&#8592;&nbsp;First Player (Setup)</span>
            }
          </button>
        ) : null
      }
        {
        isSecondPlayerActive && !started ? (
          <button disabled={!(firstPlayerShipsPlaced && secondPlayerShipsPlaced)} className={styles.gameButton} onClick={start} type="button">
            Start Game
          </button>
        ) : null
      }
        {
        showNextTurnButton ? (
          <button className={styles.gameButton} onClick={nextTurn} type="button">
            Next Turn (
            { currentTurn === FIRST ? 'First PLayer' : 'Second Player' }
            )&nbsp;&#8594;
          </button>
        ) : null
      }
      </div>
      <div className={styles.userMessage}>
        {
          (isFirstPlayerActive && !firstPlayerShipsPlaced)
          || (isSecondPlayerActive && !secondPlayerShipsPlaced)
            ? (
              <p>
                <span className={styles.errorChevron}>
                  &#x276F;&nbsp;
                </span>
                <span className={styles.errorMessage}>Please place all the ships on the grid</span>
              </p>
            ) : null
        }
      </div>
    </div>
  );
};

export default PlayerActions;
