import { useState } from 'react';
import Player from '../player/index';
import { PlayerIdentifiers } from '../../App.model';

const Game = () => {
  const [activePlayer, setActivePlayer] = useState(0);

  const move = () => {
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  return (
    <div>
      <Player id={PlayerIdentifiers.FIRST} />
      <Player id={PlayerIdentifiers.SECOND} />
      <button type="button" onClick={move}>Next</button>
    </div>
  );
};

export default Game;
