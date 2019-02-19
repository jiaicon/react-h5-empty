import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';
import { API_HOST } from '../../utils/config';


export const firstStep = (data) => ({
     type: 'FIRST_STEP_SOURCE',
    payload: data
});
const firstStepReducer = (state = {
    fetching: false,
    failed: false,
    type: null,
    data: null,
}, action) => {
    switch (action.type) {
        case 'FIRST_STEP_SOURCE':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export const secondStep = (data) => ({
    type: 'SECOND_STEP_SOURCE',
    payload: data
});
const secondStepReducer = (state = {
    fetching: false,
    failed: false,
    type: null,
    data: null,
}, action) => {
    switch (action.type) {
        case 'SECOND_STEP_SOURCE':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export const thirdStep = (data) => ({
    type: 'THIRD_STEP_SOURCE',
    payload: data
});
const thirdStepReducer = (state = {
    fetching: false,
    failed: false,
    type: null,
    data: null,
}, action) => {
    switch (action.type) {
        case 'THIRD_STEP_SOURCE':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export const fourthStep = (data) => ({
    type: 'FOURTH_STEP_SOURCE',
    payload: data
});
const fourthStepReducer = (state = {
    fetching: false,
    failed: false,
    type: null,
    data: null,
}, action) => {
    switch (action.type) {
        case 'FOURTH_STEP_SOURCE':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};


export const fifthStep = (data) => ({
    type: 'FIFTH_STEP_SOURCE',
    payload: data
});
const fifthStepReducer = (state = {
    fetching: false,
    failed: false,
    type: null,
    data: null,
}, action) => {
    switch (action.type) {
        case 'FIFTH_STEP_SOURCE':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

//提交数据
export const fundingApplicationPost = data => ({
    type: 'FUNDING_APPLICATION_POST',
    payload: fetch('/support/create', { method: 'POST', data}),
});
const fundingApplicationPostReducer = (state = {
    fetching: false,
    failed: false,
    data: null,
}, action) => {
    switch (action.type) {
        case 'FUNDING_APPLICATION_POST_PENDING':
            return {
                ...state,
                fetching: true,
                failed: false,
            };
        case 'FUNDING_APPLICATION_POST_FULFILLED':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload.data,
            };
        case 'FUNDING_APPLICATION_POST_REJECTED':
            return {
                ...state,
                failed: true,
                fetching: false,
            };
        default:
            return state;
    }
};
const fundingApplicationReducer = combineReducers({
    firstStep: firstStepReducer,
    secondStep: secondStepReducer,
    thirdStep: thirdStepReducer,
    fourthStep: fourthStepReducer,
    fifthStep: fifthStepReducer,
    fundingApplicationPost: fundingApplicationPostReducer,
});
export default fundingApplicationReducer;