/* global window:true */
import {
    pendingTasksReducer, // The redux reducer
} from 'react-redux-spinner';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import home from '../pages/home/home.store';

const rootReducer = combineReducers({
  home,
  pendingTasks: pendingTasksReducer,
});

const middleware = [thunk, promiseMiddleware()];

/* eslint-disable no-underscore-dangle */
export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware)),
);
/* eslint-enable no-underscore-dangle */
