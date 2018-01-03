
import { combineReducers } from 'redux';
import queryString from 'query-string';
import fetch from '../../../utils/fetch';

// 项目认领提交信息
export const improveClaim = data => ({
  type: 'IMPROVECLAIM_DATA',
  meta: {
    id: `${data.id}`,

  },
  payload: fetch(`/claim/${data.id}`, { method: 'POST',
    data: { team_name: `${data.name}`,
      contact_name: `${data.people}`,
      contact_phone: `${data.phone} `,
      contact_email: `${data.email} ` } }),
});
const ImproveClaimReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'IMPROVECLAIM_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'IMPROVECLAIM_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'IMPROVECLAIM_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 项目认领详情
export const requestClaimDetail = (projectId) => {
  const params = queryString.parse(location.search);
  const preview = params.preview;
  const data = {};

  if (preview === '1') {
    data.preview = 1;
  }

  return {
    type: 'CLAIM_DETAIL',
    meta: {
      id: projectId,
    },
    payload: fetch(`/claim/${projectId}`, { method: 'GET', data }),
  };
};
const ClaimDetailReducer = (state = {
  fetching: false,
  failed: false,
  fetchingId: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'CLAIM_DETAIL_PENDING':
      return {
        ...state,
        fetching: true,
        fetchingId: action.meta.id,
        failed: false,
      };
    case 'CLAIM_DETAIL_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetchingId: action.meta.id,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'CLAIM_DETAIL_REJECTED':
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
// 搜素项目认领
export const requestSearch = data => ({
  type: 'CLAIM_LIST_SEARCH',
  meta: {
    more: data.more,
    keyword: data.name,
  },
  payload: fetch('/claim', { method: 'GET', data, loading: !data.more }),
});

const SearchListReducer = (state = {
  fetching: false,
  failed: false,
  keyword: null,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};

  switch (action.type) {
    case 'CLAIM_LIST_SEARCH_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'CLAIM_LIST_SEARCH_FULFILLED':
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
        keyword: action.meta.keyword,
      };
    case 'CLAIM_LIST_SEARCH_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
        keyword: action.meta.keyword,
      };
    default:
      return state;
  }
};

// 项目认领列表
export const requestClaimProjectList = data => ({
  type: 'CLAIM_LIST',
  meta: {
    more: data.more,
  },
  payload: fetch('/claim', { method: 'GET', data, loading: !data.more }),
});

const ClaimListReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};

  switch (action.type) {
    case 'CLAIM_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'CLAIM_LIST_FULFILLED':
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
    case 'CLAIM_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
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
  claimList: ClaimListReducer,
  search: SearchListReducer,
  detail: ClaimDetailReducer,
  improve: ImproveClaimReducer,
});
export default reducer;
