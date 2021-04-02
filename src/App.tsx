import Game from './components/game/index';
import GameStore from './GameStore';

function App() {
  return (
    <GameStore>
      <Game />
    </GameStore>
  );
}

export default App;
