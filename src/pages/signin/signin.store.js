import fetch from '../../utils/fetch';

export const requestCheckinList = () => ({
  type: 'CHECKIN_LIST',
  payload: fetch('/clock/in', { method: 'GET' }),
});

// TODO: 打卡成功是否将新打卡记录返回
export const checkin = code => ({
  type: 'PROJECT_CHECKIN',
  payload: fetch('/clock/in', {
    data: {
      code,
    },
    successWords: '打卡成功',
  }),
});

export default (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'CHECKIN_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'CHECKIN_LIST_FULFILLED':

      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'CHECKIN_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    case 'PROJECT_CHECKIN_FULFILLED':
      if (action.payload.error_code || !action.payload.data) {
        return state;
      }

      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

