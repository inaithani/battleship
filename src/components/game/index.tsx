import { useContext } from 'react';
import Player from '../player/index';
import { GameContext } from '../../GameStore';
import { PlayerIdentifiers } from '../../App.model';
import { ActionKind } from '../../Actions';
import styles from './Game.module.scss';

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const isFirstPlayerActive = state.players[PlayerIdentifiers.FIRST].isActive;
  const isSecondPlayerActive = state.players[PlayerIdentifiers.SECOND].isActive;
  const { started } = state;

  const move = () => {
    const { FIRST, SECOND } = PlayerIdentifiers;
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
        id: PlayerIdentifiers.FIRST,
      },
    });
  };

  return (
    <div>
      <Player id={PlayerIdentifiers.FIRST} />
      <Player id={PlayerIdentifiers.SECOND} />

      <div className={styles.actionBar}>
        {
          !started ? (
            <button type="button" onClick={move}>
              Grid Setup for
              { isFirstPlayerActive ? ' First Player' : ' Second Player' }
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
      </div>
    </div>
  );
};

export default Game;
