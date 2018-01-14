/* global window:true */
import {
    pendingTasksReducer, // The redux reducer
} from 'react-redux-spinner';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import homeReducer from '../pages/home/home.store';
import projectReducer from '../pages/project/project.store';
import teamReducer from '../pages/team/team.store';
import signinReducer from '../pages/signin/signin.store';

import myReducer from '../pages/my/my.store';
import loginReducer from '../pages/my/login/login.store';
import registerReducer from '../pages/my/register/register.store';
import infoReducer from '../pages/my/profile/profile.store';
import circleReducer from '../pages/my/circle/circle.store';

import sanlitunReducer from '../pages/sanlitun/starModel/starModel.store';
import insuranceReducer from '../pages/ensure/ensure.store';

import { userReducer } from './common';

const rootReducer = combineReducers({
  home: homeReducer,
  user: userReducer,
  pendingTasks: pendingTasksReducer,
  project: projectReducer,
  team: teamReducer,
  signin: signinReducer,
  my: myReducer,
  info: infoReducer,
  login: loginReducer,
  register: registerReducer,
  sanlitun: sanlitunReducer,
  insurance: insuranceReducer,
  circle: circleReducer,
});

const middleware = [thunk, promiseMiddleware()];

/* eslint-disable no-underscore-dangle */
export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware)),
);
/* eslint-enable no-underscore-dangle */
