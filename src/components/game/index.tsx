import { useContext } from 'react';
import Player from '../player/index';
import { GameContext } from '../../GameStore';
import { PlayerIdentifiers } from '../../App.model';
import { ActionKind } from '../../Actions';
import styles from './Game.module.scss';
import { toggleIsFireEnabled, toggleNextTurnButton } from '../../utils/index';

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const { FIRST, SECOND } = PlayerIdentifiers;
  const isFirstPlayerActive = state.players[FIRST].isActive;
  const isSecondPlayerActive = state.players[SECOND].isActive;
  const { started, showNextTurnButton, currentTurn } = state;

  const moveSetupScreen = () => {
    const id = isFirstPlayerActive ? SECOND : FIRST;
    dispatch({
      type: ActionKind.SetActivePlayer,
      payload: {
        id,
      },
    });
  };

  const startGame = () => {
    dispatch({
      type: ActionKind.StartGame,
      payload: {},
    });

    dispatch({
      type: ActionKind.SetActivePlayer,
      payload: {
        id: FIRST,
      },
    });

    toggleIsFireEnabled(dispatch, SECOND, true);
  };

  const turnChange = () => {
    dispatch({
      type: ActionKind.SetActivePlayer,
      payload: {
        id: state.currentTurn,
      },
    });

    let enableFireFor = FIRST;

    if (currentTurn === FIRST) {
      enableFireFor = SECOND;
    } else {
      enableFireFor = FIRST;
    }

    toggleNextTurnButton(dispatch, false);
    toggleIsFireEnabled(dispatch, enableFireFor, true);
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
            <button className={styles.start} onClick={startGame} type="button">
              Start Game
            </button>
          ) : null
        }
        {
          showNextTurnButton ? (
            <button className={styles.nextTurn} onClick={turnChange} type="button">
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
