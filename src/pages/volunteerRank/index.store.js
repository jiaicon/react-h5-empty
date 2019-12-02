import queryString from 'query-string';
import fetch from '../../utils/fetch';
import { combineReducers } from "redux";

export const saveRankTabIndex = tabIndex => ({
  type: 'SWITCH_RANK_TAB',
  payload: { tabIndex },
});
const rankTabReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null,
    tabIndex: 0,
  },
  action
) => {
  switch (action.type) {
    case "SWITCH_RANK_TAB":
      return {
        ...state,
        tabIndex: action.payload.tabIndex,
      };
    default:
      return state;
  }
};

export const volunteerRankYearList = () => ({
  type: 'VOLUNTEER_RANK_YEAR_LIST',
  payload: fetch('/volunteer_rank_year', {method: 'GET', switchUrl: `${window.apiHost}/api/v2`}),
});

const volunteerRankYearListReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'VOLUNTEER_RANK_YEAR_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'VOLUNTEER_RANK_YEAR_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'VOLUNTEER_RANK_YEAR_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const volunteerRankAllList = () => ({
  type: 'VOLUNTEER_RANK_ALL_LIST',
  payload: fetch('/volunteer_rank_all', {method: 'GET', switchUrl: `${window.apiHost}/api/v2`}),
});

const volunteerRankAllListReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'VOLUNTEER_RANK_ALL_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'VOLUNTEER_RANK_ALL_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'VOLUNTEER_RANK_ALL_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};


export const volunteerInfo = (id) => ({
  type: 'VOLUNTEER_INFO',
  payload: fetch(`/volunteer_info/${id}`, {method: 'GET', switchUrl: `${window.apiHost}/api/v2`}),
});

const volunteerInfoReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'VOLUNTEER_INFO_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'VOLUNTEER_INFO_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'VOLUNTEER_INFO_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const volunteerAchieve = (id) => ({
  type: 'VOLUNTEER_ACHIEVE',
  payload: fetch(`/volunteer_achieve/${id}`, {method: 'GET', switchUrl: `${window.apiHost}/api/v2`}),
});

const volunteerAchieveReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'VOLUNTEER_ACHIEVE_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'VOLUNTEER_ACHIEVE_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'VOLUNTEER_ACHIEVE_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
const rankReducer = combineReducers({
  rankReducerTab: rankTabReducer,
  volunteerRankYearList: volunteerRankYearListReducer,
  volunteerRankAllList: volunteerRankAllListReducer,
  volunteerInfo: volunteerInfoReducer,
  volunteerAchieve: volunteerAchieveReducer,
});
export default rankReducer;
