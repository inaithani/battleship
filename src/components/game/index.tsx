import { useContext } from 'react';
import Player from '../player/index';
import { GameContext } from '../../GameStore';
import { PlayerIdentifiers } from '../../App.model';
import { ActionKind } from '../../Actions';
import styles from './Game.module.scss';

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const isFirstPlayerActive = state[PlayerIdentifiers.FIRST].isActive;
  const isSecondPlayerActive = state[PlayerIdentifiers.SECOND].isActive;
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

  };

  return (
    <div>
      <Player id={PlayerIdentifiers.FIRST} />
      <Player id={PlayerIdentifiers.SECOND} />

      <div className={styles.actionBar}>
        <button type="button" onClick={move}>
          Grid Setup for
          { isFirstPlayerActive ? ' First Player' : ' Second Player' }
        </button>
        {
          isSecondPlayerActive ? (
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
