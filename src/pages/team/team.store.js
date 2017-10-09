import { combineReducers } from 'redux';

// import projectDetailReducer from './detail/detail.store';
import teamListReducer from './list/list.store';
import teamSearchReducer from './search/search.store';


export default combineReducers({
  // detail: projectDetailReducer,
  list: teamListReducer,
  search: teamSearchReducer,
});
