import {combineReducers} from 'redux';
import {
    pendingTasksReducer, // The redux reducer
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end // The action value if a "long" running task ended
} from 'react-redux-spinner'

import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import {compose, createStore, applyMiddleware} from 'redux'

import home from '../pages/home/home.store'
import repo from '../pages/repo/repo.store'


const rootReducer = combineReducers({
    home,
    repo,
    pendingTasks: pendingTasksReducer
});

const middleware = [thunk, promiseMiddleware()];

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware))
);