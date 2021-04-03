import { v4 as uuidv4 } from 'uuid';
import { IShipSchema } from '../components/ship/Ship.model';

const shipsSchema: IShipSchema = {
  horizontal: [{
    length: 4,
    id: uuidv4(),
  }, {
    length: 3,
    id: uuidv4(),
  }, {
    length: 2,
    id: uuidv4(),
  }],
  vertical: [{
    length: 4,
    id: uuidv4(),
  }, {
    length: 3,
    id: uuidv4(),
  }, {
    length: 2,
    id: uuidv4(),
  }],
  none: [{
    length: 1,
    id: uuidv4(),
  }, {
    length: 1,
    id: uuidv4(),
  }],
};

export default shipsSchema;
