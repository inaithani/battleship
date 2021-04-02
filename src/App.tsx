import Game from './components/game/index';
import GameStore from './GameStore';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <GameStore>
        <Game />
      </GameStore>
    </div>
  );
}

export default App;
