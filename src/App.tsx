import { DndProvider } from 'react-dnd';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridWrapper from './components/grid/index';
import Ship from './components/ship/index';
import { getBaseGridState } from './utils/index';
import { DefaultGridDimesions, CellState } from './App.model';
import styles from './App.module.scss';

function App() {
  const [gridState, setGridState] = useState(
    getBaseGridState(DefaultGridDimesions.Rows, DefaultGridDimesions.Columns),
  );

  const updateGridState = (cellState: CellState, rowIndex: number, columnIndex: number) => {
    const newState = [...gridState];
    newState[rowIndex][columnIndex] = 1;
    setGridState(newState);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <h2>Battleship</h2>
        <div className={styles.playerView}>
          <Ship updateGridState={updateGridState} length={3} orientation="vertical" />
          <p>----</p>
          <Ship updateGridState={updateGridState} length={3} orientation="horizontal" />
          <p>----</p>
          <GridWrapper gridState={gridState} updateGridState={updateGridState} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
