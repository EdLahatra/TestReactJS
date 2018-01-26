import { FETCH_LIST_ALL, GET_CURRENT_ITEM, ON_SEARCH_ITEM } from '../actions/list';

const defaultState = {
  data: [],
  current: [],
};

const list = (state = defaultState, action) => {
  switch (action.type) {
    case ON_SEARCH_ITEM:
      return {
        ...state,
        data: action.data,
      };
    case FETCH_LIST_ALL:
      return {
        ...state,
        data: action.data,
      };
    case GET_CURRENT_ITEM:
      return {
        ...state,
        current: action.data,
      };
    default:
      return state;
  }
};

export default list;
