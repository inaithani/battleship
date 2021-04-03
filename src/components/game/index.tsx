import { useContext } from 'react';
import Player from '../player/index';
import { GameContext } from '../../GameStore';
import { PlayerIdentifiers } from '../../App.model';
import styles from './Game.module.scss';
import {
  startGame,
  turnChange,
  nextPlayerGameSetup,
} from '../../utils/index';

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const { FIRST, SECOND } = PlayerIdentifiers;
  const isFirstPlayerActive = state.players[FIRST].isActive;
  const isSecondPlayerActive = state.players[SECOND].isActive;
  const { started, showNextTurnButton, currentTurn } = state;

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
    <div>
      <Player id={FIRST} />
      <Player id={SECOND} />

      <div className={styles.actionBar}>
        {
          !started ? (
            <button type="button" onClick={moveSetupScreen}>
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
            <button className={styles.start} onClick={start} type="button">
              Start Game
            </button>
          ) : null
        }
        {
          showNextTurnButton ? (
            <button className={styles.nextTurn} onClick={nextTurn} type="button">
              Next Turn (
              { currentTurn === FIRST ? 'First PLayer' : 'Second Player' }
              )&nbsp;&#8594;
            </button>
          ) : null
        }
      </div>
    </div>
  );
};

export default Game;
