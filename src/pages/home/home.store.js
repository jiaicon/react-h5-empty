import fetch from '../../utils/fetch';

export const requestHomeData = () => ({
  type: 'HOME_DATA',
  payload: fetch('/index', { method: 'GET' }),
});

export const saveCity = city => ({
  type: 'CITY_DATA_FULFILLED',
  payload: { city },
});

export default (state = {
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

