import { combineReducers } from 'redux';
import list from './list';

const reducers = combineReducers({
  log: (_, action) => {
    // eslint-disable-next-line no-console
    console.log(action);
    return {};
  },
  list,
});

export default reducers;
