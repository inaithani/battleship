import GridWrapper from './components/grid';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <h2>Battleship</h2>
      <div className={styles.playerView}>
        <GridWrapper />
      </div>      
    </div>
  );
}

export default App;
