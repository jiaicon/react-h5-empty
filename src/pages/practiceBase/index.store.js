import fetch from '../../utils/fetch';
import { combineReducers } from "redux";

export const requestPracticeBaseList = data => ({
  type: 'PRACTICE_BASE_LIST',
  payload: fetch('/practice_base', { method: 'GET', data }),
});

const requestPracticeBaseListReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PRACTICE_BASE_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PRACTICE_BASE_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'PRACTICE_BASE_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};


export const requestPracticeBaseInfo = (id) => ({
  type: 'PRACTICE_BASE_INFO',
  payload: fetch(`/practice_base/${id}`, { method: 'GET' }),
});

const requestPracticeBaseInfoReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PRACTICE_BASE_INFO_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PRACTICE_BASE_INFO_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'PRACTICE_BASE_INFO_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const requestPracticeBaseCategoryList = () => ({
  type: 'PRACTICE_BASE_CATEGORY_LIST',
  payload: fetch('/practice_base_category', { method: 'GET' }),
});

const requestPracticeBaseCategoryReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PRACTICE_BASE_CATEGORY_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PRACTICE_BASE_CATEGORY_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data && action.payload.data.map(v => {
          return { ...v, title: v.name }
        }) || [],
      };
    case 'PRACTICE_BASE_CATEGORY_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};


const practiceBaseReducer = combineReducers({
  list: requestPracticeBaseListReducer,
  detail: requestPracticeBaseInfoReducer,
  category: requestPracticeBaseCategoryReducer,
});
export default practiceBaseReducer;