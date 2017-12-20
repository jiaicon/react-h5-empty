
import { combineReducers } from 'redux';
import fetch from '../../../utils/fetch';
// 星级榜样列表接口

export const starModelAction = () => ({
  type: 'STARMODEL_DATA',
  payload: fetch('/goodexample', { method: 'GET' }),
});
const starModelReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'STARMODEL_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'STARMODEL_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'STARMODEL_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 星级榜样详情

export const starDetailAction = num => ({
  type: 'STARDETAIL_DATA',
  payload: fetch(`/goodexample/${num}`, { method: 'GET' }),
});
const starDetailReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'STARDETAIL_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'STARDETAIL_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'STARDETAIL_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  starModel: starModelReducer,
  starDetail: starDetailReducer,
});
export default reducer;
