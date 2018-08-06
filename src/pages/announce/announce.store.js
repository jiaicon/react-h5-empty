
import { combineReducers, bindActionCreators } from 'redux';
import queryString from 'query-string';
import Alert from 'react-s-alert';
import fetch from '../../utils/fetch';
import { API_HOST } from '../../utils/config';

// 公告
// 我的消息详情
// TODO:
export const announceDetailAction = Id => ({
  type: 'ANNOUNCE_DATA_DETAIL',
  meta: {
    id: Id,
  },
  payload: fetch(`/news/${Id}`, { method: 'GET' }),
});
const announceDetailReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'ANNOUNCE_DATA_DETAIL_PENDING':
      return {
        ...state,
        fetching: true,
        fetchingId: action.meta.id,
        failed: false,
      };
    case 'ANNOUNCE_DATA_DETAIL_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetchingId: action.meta.id,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'ANNOUNCE_DATA_DETAIL_REJECTED':
      return {
        ...state,
        failed: true,
        fetchingId: action.meta.id,
        fetching: false,
      };
    default:
      return state;
  }
};

export const announceAction = data => ({
  type: 'ANNOUNCE_DATA',
  payload: fetch('/news/list', { method: 'GET', data, loading: !data.more }),
});
const announceReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};
  switch (action.type) {
    case 'ANNOUNCE_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'ANNOUNCE_DATA_FULFILLED':
      if (!more || !state.data) {
        data = payloadData;
      } else {
        data = {
          list: state.data.list.concat(payloadData.list),
          page: payloadData.page,
        };
      }

      return {
        ...state,
        fetching: false,
        failed: false,
        data,
      };
    case 'ANNOUNCE_DATA_REJECTED':
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
  announce: announceReducer,
  announceDetail: announceDetailReducer,
});
export default reducer;
