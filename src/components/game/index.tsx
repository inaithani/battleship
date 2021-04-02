import { useState } from 'react';
import Player from '../player/index';

const Game = () => {
  const [activePlayer, setActivePlayer] = useState(0);

  const move = () => {
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  return (
    <div>
      <Player id={0} isActive={activePlayer === 0} />
      <Player id={1} isActive={activePlayer === 1} />
      <button type="button" onClick={move}>Next</button>
    </div>
  );
};

export default Game;
