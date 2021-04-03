import { useContext } from 'react';
import classNames from 'classnames';
import { DefaultGridDimesions, IShipTracker, PlayerIdentifiers } from '../../App.model';
import Ship from '../ship/index';
import styles from './Player.module.scss';
import ShipCell from '../ship/ShipCell';
import { GameContext } from '../../GameStore';
import shipsSchema from '../../utils/ships.data';
import { Orientation } from '../ship/Ship.model';

const ShipDisabled = ({ length, orientation } : { length: number, orientation: Orientation }) => {
  const { CellSize } = DefaultGridDimesions;
  const width = orientation === 'horizontal' ? CellSize * length : CellSize;
  const height = orientation === 'horizontal' ? CellSize : 'auto';
  const shipClasses = classNames({ [styles[`ship${orientation}`]]: true });
  const cellArray = [...Array(length).fill(0, 0, length)];
  return (
    <div className={shipClasses} style={{ width, height }}>
      {
        cellArray.map((el, index) => <ShipCell disabled key={`${orientation}-${el + index}`} />)
      }
    </div>
  );
};

const renderShipsHelper = (
  orientation: Orientation,
  shipTracker: IShipTracker,
  id: PlayerIdentifiers,
) => (
  <div className={styles.shipsContainer}>
    {
      shipsSchema[orientation].map((ship) => {
        if (typeof shipTracker[ship.id] === 'undefined') {
          return (
            <Ship
              playerId={id}
              id={ship.id}
              key={ship.id}
              length={ship.length}
              orientation={orientation}
            />
          );
        }
        return <ShipDisabled key={ship.id} length={ship.length} orientation={orientation} />;
      })
    }
  </div>
);

const ShipsContainer = ({ id }: { id: PlayerIdentifiers }) => {
  const { state } = useContext(GameContext);
  const { shipTracker } = state.players[id];
  return (
    <>
      <p>Drag the ships on to the grid to place them</p>
      {
        renderShipsHelper('horizontal', shipTracker, id)
      }
      {
        renderShipsHelper('vertical', shipTracker, id)
      }
      {
        renderShipsHelper('none', shipTracker, id)
      }
    </>
  );
};

export default ShipsContainer;
