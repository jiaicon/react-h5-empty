/* global window:true */
import {
    pendingTasksReducer, // The redux reducer
} from 'react-redux-spinner';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import homeReducer from '../pages/home/home.store';
import loginReducer from '../pages/my/login/login.store';
import registerReducer from '../pages/my/register/register.store';
import myReducer from '../pages/my/my.store';
import { userReducer } from './common';

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  register: registerReducer,
  user: userReducer,
  pendingTasks: pendingTasksReducer,
  my: myReducer,
});

const middleware = [thunk, promiseMiddleware()];

/* eslint-disable no-underscore-dangle */
export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware)),
);
/* eslint-enable no-underscore-dangle */
