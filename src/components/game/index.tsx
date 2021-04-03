import { useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GameContext } from '../../GameStore';
import Player from '../player/index';
import { PlayerIdentifiers } from '../../App.model';
import PlayerActions from './PlayerActions';
import GameResult from './GameResult';

const Game = () => {
  const { state } = useContext(GameContext);
  const { FIRST, SECOND } = PlayerIdentifiers;
  const showGameResult = state.players[FIRST].winner || state.players[SECOND].winner;

  return (
    <div>
      {
        showGameResult ? (
          <DndProvider backend={HTML5Backend}>
            <GameResult />
          </DndProvider>
        ) : (
          <>
            <Player id={FIRST} />
            <Player id={SECOND} />
            <PlayerActions />
          </>
        )
      }
    </div>
  );
};

export default Game;
