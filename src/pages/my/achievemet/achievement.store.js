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
                pending: true,
                failed: false,
                data: action.payload
            };
        case 'GET_ACHIEVEMENT_FULFILLED':
            return {
                ...state,
                pending: false,
                failed: false,
                data: action.payload
            };
        case 'GET_ACHIEVEMENT_REJECTED':
            return {
                ...state,
                pending: false,
                failed: true,
                data: action.payload
            };
        default:
            return state;
    }
};

const reducer =  combineReducers({
    achievementList: getAchievementRedux
});
export default reducer;
