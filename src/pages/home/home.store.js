import fetch from '../../utils/fetch';
import { combineReducers } from 'redux';
import { API_HOST } from '../../utils/config';

export const requestHomeData = () => ({
  type: 'HOME_DATA',
  payload: fetch('/index', { method: 'GET' }),
});

export const saveCity = city => ({
  type: 'CITY_DATA_FULFILLED',
  payload: { city },
});

const homeReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'HOME_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'HOME_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'HOME_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    case 'CITY_DATA_FULFILLED':
      return {
        ...state,
        city: action.payload.city,
      };
    default:
      return state;
  }
};
//城市
export const getCity = () => ({
    type: 'GET_CITY',
    payload: fetch(`${API_HOST}/api/city`, { method: 'GET' }),
});
const getCityReducer = (state = {
    fetching: false,
    failed: false,
    data: null,
}, action) => {
    switch (action.type) {
        case 'GET_CITY_PENDING':
            return {
                ...state,
                fetching: true,
                failed: false,
            };
        case 'GET_CITY_FULFILLED':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload.data,
            };
        case 'GET_CITY_REJECTED':
            return {
                ...state,
                failed: true,
                fetching: false,
            };
        default:
            return state;
    }
};
// 省下的市接口
export const getAreaProvince = name => ({
    type: 'AREA_PROVINCE',
    payload: fetch(`${API_HOST}/api/area/province`, { method: 'GET', data: { name } }),
});

const getAreaProvinceReducer = (state = {
    fetching: false,
    failed: false,
    data: null,
}, action) => {
    switch (action.type) {
        case 'AREA_PROVINCE_PENDING':
            return {
                ...state,
                fetching: true,
                failed: false,
            };
        case 'AREA_PROVINCE_FULFILLED':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload.data,
            };
        case 'AREA_PROVINCE_REJECTED':
            return {
                ...state,
                failed: true,
                fetching: false,
            };
        default:
            return state;
    }
};

// 城市下区域接口 【3.0新增】
export const getAreaCity = name => ({
  type: 'AREACITY_DATA',
  payload: fetch(`${API_HOST}/api/area/city`, { method: 'GET', data: { name } }),
});

const getAreaCityReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'AREACITY_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'AREACITY_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'AREACITY_DATA_REJECTED':
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
  home: homeReducer,
  getAreaCity: getAreaCityReducer,
  getCity: getCityReducer,
  getAreaProvince: getAreaProvinceReducer,
});
export default reducer;
