import { combineReducers } from 'redux';

import projectDetailReducer from './detail/detail.store';
import projectListReducer from './list/list.store';
import projectSearchReducer from './search/search.store';


export default combineReducers({
  detail: projectDetailReducer,
  list: projectListReducer,
  search: projectSearchReducer,
});
