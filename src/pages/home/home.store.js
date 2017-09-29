import fetch from '../../utils/fetch';

export const requestHomeData = () => ({
  type: 'HOME_DATA',
  payload: fetch('/index', { method: 'GET' }),
});

export default (state = {
  fetching: false,
  failed: false,
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
        data: action.payload.data,
      };
    case 'HOME_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

