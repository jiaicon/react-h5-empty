import { combineReducers } from 'redux';

import projectDetailReducer from './detail/detail.store';

export default combineReducers({
  detail: projectDetailReducer,
});
