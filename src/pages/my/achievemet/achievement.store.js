import { combineReducers } from 'redux';
import fetch from './../../../utils/fetch';
import { API_HOST } from './../../../utils/config';

export const getAchievement = ()=>({
    type: 'GET_ACHIEVEMENT',
    payload: fetch(`${API_HOST}/api/v1/achieve`, {method: 'GET'})
});
const getAchievementRedux = (state={
    fetching: false,
    failed: false,
    data: null,
}, action)=>{
    switch(action.type) {
        case 'GET_ACHIEVEMENT_PENDING':
            return {
                ...state,
                fetching: true,
                failed: false,
                data: action.payload
            };
        case 'GET_ACHIEVEMENT_FULFILLED':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload&&action.payload.data
            };
        case 'GET_ACHIEVEMENT_REJECTED':
            return {
                ...state,
                fetching: false,
                failed: true,
                data: action.payload
            };
        default:
            return state;
    }
};

export const getAchievementHas = ()=>({
    type: 'GET_ACHIEVEMENT_HAS',
    payload: fetch(`${API_HOST}/api/v1/user/achievement`, {method: 'GET'})
});
const getAchievementHasRedux = (state={
    fetching: false,
    failed: false,
    data: null,
}, action)=>{
    switch(action.type) {
        case 'GET_ACHIEVEMENT_HAS_PENDING':
            return {
                ...state,
                fetching: true,
                failed: false,
                data: action.payload
            };
        case 'GET_ACHIEVEMENT_HAS_FULFILLED':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload&&action.payload.data
            };
        case 'GET_ACHIEVEMENT_HAS_REJECTED':
            return {
                ...state,
                fetching: false,
                failed: true,
                data: action.payload
            };
        default:
            return state;
    }
};

const reducer =  combineReducers({
    achievementList: getAchievementRedux,
    achievementHasList: getAchievementHasRedux
});
export default reducer;
