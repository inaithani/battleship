import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Ship from './components/ship/index';
import GridWrapper from './components/grid/index';
import styles from './App.module.scss';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <h2>Battleship</h2>
        <div className={styles.playerView}>
          <Ship length={3} orientation="vertical" />
          <p>----</p>
          <Ship length={3} orientation="horizontal" />
          <p>----</p>
          <GridWrapper />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
