import { combineReducers } from 'redux';

import teamDetailReducer from './detail/detail.store';
import teamListReducer from './list/list.store';
import teamSearchReducer from './search/search.store';


export default combineReducers({
  detail: teamDetailReducer,
  list: teamListReducer,
  search: teamSearchReducer,
});
