import queryString from 'query-string';
import fetch from '../../utils/fetch';
import { combineReducers } from "redux";

export const saveDemandTabIndex = tabIndex => ({
  type: 'SWITCH_DEMAND_TAB',
  payload: { tabIndex },
});

const demandTabReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null,
  },
  action
) => {
  switch (action.type) {
    case "SWITCH_DEMAND_TAB":
      return {
        ...state,
        tabIndex: action.payload.tabIndex,
      };
    default:
      return state;
  }
};

const demandReducer = combineReducers({
  demandTab: demandTabReducer
});
export default demandReducer;
