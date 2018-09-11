import fetch from '../../utils/fetch';
import { combineReducers } from 'redux';

export const changeOrdersAction =(id) => ({
  type: 'CHANGE_ORDER_DATA',

  payload: fetch(`/goods/change/${id}`, { method: 'GET'}),
});

export const  changeOrdersReducer =  (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {

  switch (action.type) {
    case 'CHANGE_ORDER_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'CHANGE_ORDER_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data,
      };
    case 'CHANGE_ORDER_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
}

export const sureOrdersAction =(id) => ({
  type: 'SURE_ORDER_DATA',

  payload: fetch(`/order/collect/${id}`, { method: 'GET'}),
});

export const  sureOrdersReducer =  (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {

  switch (action.type) {
    case 'SURE_ORDER_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'SURE_ORDER_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data,
      };
    case 'SURE_ORDER_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
export const ordersAction =() => ({
  type: 'ORDER_DATA',

  payload: fetch('/order/myorders', { method: 'GET'}),
});

export const  ordersReducer =  (state = {
  fetching: false,
  failed: false,
  data: null,
  
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};

  switch (action.type) {
    case 'ORDER_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'ORDER_DATA_FULFILLED':
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
    case 'ORDER_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const bannerAction =() => ({
  type: 'BANNER_DATA',

  payload: fetch('/banner/0', { method: 'GET'}),
});

export const  bannerReducer =  (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};

  switch (action.type) {
    case 'BANNER_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'BANNER_DATA_FULFILLED':
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
    case 'BANNER_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const requestGoodsList = data => ({
    type: 'SHOP_GOODS_LIST',
    meta: {
      more: data.more,
    },
    payload: fetch('/goods/list', { method: 'GET', data, loading: !data.more }),
  });
  
  export const goodsListReducer = (state = {
    fetching: false,
    failed: false,
    data: null,
  }, action) => {
    let data;
    const { more } = action.meta || {};
    const { data: payloadData } = action.payload || {};
  
    switch (action.type) {
      case 'SHOP_GOODS_LIST_PENDING':
        return {
          ...state,
          fetching: true,
          failed: false,
        };
      case 'SHOP_GOODS_LIST_FULFILLED':
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
      case 'SHOP_GOODS_LIST_REJECTED':
        return {
          ...state,
          failed: true,
          fetching: false,
        };
      default:
        return state;
    }
  };


  export const requestGoodsDetail = (id) => {
    return {
      type: 'SHOP_DETAIL_DETAIL',
      meta: {
        id,
      },
      payload: fetch(`/goods/${id}`, { method: 'GET' }),
    };
  };
  export const goodsDetailReducer = (state = {
    fetching: false,
    failed: false,
    data: null,
    fetchingId: null,
  }, action) => {
    switch (action.type) {
      case 'SHOP_DETAIL_DETAIL_PENDING':
        return {
          ...state,
          fetching: true,
          fetchingId: action.meta.id,
          failed: false,
        };
      case 'SHOP_DETAIL_DETAIL_FULFILLED':
        
        return {
            fetching: false,
            fetchingId: action.meta.id,
            failed: false,
            data: action.payload && action.payload.data,
        };
      case 'SHOP_DETAIL_DETAIL_REJECTED':
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
export default combineReducers({
    banner: bannerReducer,
    goodsList:goodsListReducer,
    detail:goodsDetailReducer,
    orderList:ordersReducer,
    sureOrder:sureOrdersReducer,
    changeOrder:changeOrdersReducer,
  });