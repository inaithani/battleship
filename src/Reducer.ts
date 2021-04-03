import { GameState, PlayerIdentifiers, StateValue } from './App.model';
import {
  Action,
  ActionKind,
  IUpdateCellAction,
  IInitShipTrackerAction,
  IUpdateShipTracker,
} from './Actions';

const Reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case ActionKind.UpdateShipLocation: {
      const newState = { ...state };
      const {
        rowIndex,
        columnIndex,
        cellState,
        id,
        shipId,
      }: IUpdateCellAction = action.payload;
      newState.players[id].gridState[rowIndex][columnIndex] = cellState;
      newState.players[id].shipTracker[shipId].locations.push({
        column: columnIndex,
        row: rowIndex,
        hit: cellState.state === StateValue.CELL_HIT,
      });
      return newState;
    }

    case ActionKind.SetCellHitMissState: {
      const newState = { ...state };
      const {
        id,
        rowIndex,
        columnIndex,
        cellState,
      } = action.payload;

      newState.players[id].gridState[rowIndex][columnIndex] = cellState;
      return newState;
    }

    case ActionKind.SetActivePlayer: {
      const newState = { ...state };
      const { id } = action.payload;

      newState.players[PlayerIdentifiers.FIRST].isActive = false;
      newState.players[PlayerIdentifiers.SECOND].isActive = false;
      newState.players[id].isActive = true;

      return newState;
    }

    case ActionKind.SetCurrentTurn: {
      const newState = { ...state };
      const { id } = action.payload;

      newState.currentTurn = id;

      return newState;
    }

    case ActionKind.ToggleNextTurnButton: {
      const newState = { ...state };
      const { showNextTurnButton } = action.payload;

      newState.showNextTurnButton = showNextTurnButton;

      return newState;
    }

    case ActionKind.ToggleIsGridEnabled: {
      const newState = { ...state };
      const { id, isFireEnabled } = action.payload;

      newState.players[id].isFireEnabled = isFireEnabled;

      return newState;
    }

    case ActionKind.StartGame: {
      const newState = { ...state };
      newState.started = true;

      return newState;
    }

    case ActionKind.InitializeShipTraker: {
      const newState = { ...state };
      const { id, shipId }: IInitShipTrackerAction = action.payload;

      newState.players[id].shipTracker[shipId] = {
        sunken: false,
        locations: [],
      };

      return newState;
    }

    case ActionKind.UpdateShipTracker: {
      const newState = { ...state };
      const {
        locations,
        sunken,
        id,
        shipId,
      }: IUpdateShipTracker = action.payload;
      newState.players[id].shipTracker[shipId].locations = locations;
      newState.players[id].shipTracker[shipId].sunken = sunken;

      return newState;
    }

    case ActionKind.ClearShipLocation: {
      const newState = { ...state };
      const {
        rowIndex,
        columnIndex,
        id,
      } = action.payload;
      newState.players[id].gridState[rowIndex][columnIndex] = {
        isTarget: false,
        ship: null,
        shipId: '',
        state: 0,
      };
      return newState;
    }

    case ActionKind.CheckPlayerVictory: {
      const newState = { ...state };
      const {
        winner,
        id,
      } = action.payload;
      newState.players[id].winner = winner;
      return newState;
    }

    default: return state;
  }
};

export default Reducer;
