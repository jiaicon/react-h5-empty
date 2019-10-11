import queryString from 'query-string';
import fetch from '../../utils/fetch';
import { combineReducers } from "redux";

export const saveDemandTabIndex = tabIndex => ({
  type: 'SWITCH_DEMAND_TAB',
  payload: { tabIndex },
});

const demandTabReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null,
  },
  action
) => {
  switch (action.type) {
    case "SWITCH_DEMAND_TAB":
      return {
        ...state,
        tabIndex: action.payload.tabIndex,
      };
    default:
      return state;
  }
};
// 提交求助表单
export const demandSubmit = data => ({
  type: 'DEMAND_SUBMIT',
  payload: fetch('/demand', {method: 'POST', data, switchUrl: `${window.apiHost}/api/v2`}),
});

const demandSubmitReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'DEMAND_SUBMIT_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'DEMAND_SUBMIT_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'DEMAND_SUBMIT_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 获取群众需求
export const allDemandList = data => ({
  type: 'DEMAND_LIST_ALL',
  meta: {
    more: data.more,
  },
  payload: fetch('/demand/all', {method: 'GET', data, switchUrl: `${window.apiHost}/api/v2`, loading: !data.more}),
});

const allDemandListReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};
  switch (action.type) {
    case 'DEMAND_LIST_ALL_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'DEMAND_LIST_ALL_FULFILLED':
      if (!more || !state.data) {
        data = payloadData;
      } else {
        data = {
          ...payloadData,
          list: state.data.list.concat(payloadData.list),
        };
      }
      return {
        ...state,
        fetching: false,
        failed: false,
        data,
      };
    case 'DEMAND_LIST_ALL_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 获取个人提交的需求
export const ownDemandList = () => ({
  type: 'DEMAND_LIST_OWN',
  payload: fetch('/demand', {method: 'GET', switchUrl: `${window.apiHost}/api/v2`}),
});

const ownDemandListReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'DEMAND_LIST_OWN_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'DEMAND_LIST_OWN_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'DEMAND_LIST_OWN_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 详情
export const demandInfo = (id) => ({
  type: 'DEMAND_INFO',
  payload: fetch(`/demand/${id}`, {method: 'GET', switchUrl: `${window.apiHost}/api/v2`}),
});

const demandInfoReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'DEMAND_INFO_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'DEMAND_INFO_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'DEMAND_INFO_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
const demandReducer = combineReducers({
  demandTab: demandTabReducer,
  demandSubmit: demandSubmitReducer,
  allDemandList: allDemandListReducer,
  ownDemandList: ownDemandListReducer,
  demandInfo: demandInfoReducer,
});
export default demandReducer;
