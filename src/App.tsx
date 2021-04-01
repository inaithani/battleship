import { DndProvider } from 'react-dnd';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridWrapper from './components/grid/index';
import Ship from './components/ship/index';
import { getBaseGridState } from './utils/index';
import { DefaultGridDimesions, IGridStateUpdateObjects } from './App.model';
import styles from './App.module.scss';

function App() {
  const [gridState, setGridState] = useState(
    getBaseGridState(DefaultGridDimesions.Rows, DefaultGridDimesions.Columns),
  );

  const updateGridState = (gridStateUpdateObjects: IGridStateUpdateObjects) => {
    const newState = [...gridState];

    gridStateUpdateObjects.forEach((gridStateUpdateObject) => {
      const {
        state,
        rowIndex,
        columnIndex,
        isTarget = false,
      } = gridStateUpdateObject;
      newState[rowIndex][columnIndex] = {
        isTarget,
        state,
      };
    });

    setGridState(newState);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <h2>Battleship</h2>
        <div className={styles.playerView}>
          <Ship updateGridState={updateGridState} length={1} orientation="vertical" />
          <p>---</p>
          <Ship updateGridState={updateGridState} length={3} orientation="vertical" />
          <p>----</p>
          <Ship updateGridState={updateGridState} length={5} orientation="horizontal" />
          <p>----</p>
          <GridWrapper gridState={gridState} updateGridState={updateGridState} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
