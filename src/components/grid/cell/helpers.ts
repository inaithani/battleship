import { Dispatch } from 'react';
import { ActionKind, Action } from '../../../Actions';
import { GameState, IShipLocation, PlayerIdentifiers } from '../../../App.model';

export const dispatchUpdateShipTracker = (
  dispatch: Dispatch<Action>,
  id: PlayerIdentifiers,
  locations: IShipLocation[],
  shipId: string,
  rowIndex: number,
  columnIndex: number,
) => {
  if (Array.isArray(locations) && locations.length) {
    let sunken = true;
    const newLocations = [...locations];

    for (let i = 0; i < newLocations.length; i += 1) {
      const { row, column } = newLocations[i];
      if (row === rowIndex && column === columnIndex) {
        newLocations[i].hit = true;
      }

      if (!newLocations[i].hit) {
        sunken = false;
      }
    }

    dispatch({
      type: ActionKind.UpdateShipTracker,
      payload: {
        locations: newLocations,
        sunken,
        id,
        shipId,
      },
    });
  }
};

export const fire = (
  state: GameState,
  dispatch: Dispatch<Action>,
  id: PlayerIdentifiers,
  rowIndex: number,
  columnIndex: number,
) => {
  const currentCellState = { ...state.players[id].gridState[rowIndex][columnIndex] };
  const { locations } = { ...state.players[id].shipTracker[currentCellState.shipId] };
  currentCellState.state = currentCellState.state === 1 ? 2 : 3;

  dispatch({
    type: ActionKind.SetCellHitMissState,
    payload: {
      id,
      rowIndex,
      columnIndex,
      cellState: currentCellState,
    },
  });

  dispatchUpdateShipTracker(
    dispatch,
    id,
    locations,
    currentCellState.shipId,
    rowIndex,
    columnIndex,
  );
};
