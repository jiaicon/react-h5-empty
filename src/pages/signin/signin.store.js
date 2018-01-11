

import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';


export const requestCheckinList = () => ({
  type: 'CHECKIN_LIST',
  payload: fetch('/clock/in', { method: 'GET' }),
});

// TODO: 打卡成功是否将新打卡记录返回
export const checkin = (code, type) => ({
  type: 'PROJECT_CHECKIN',
  payload: fetch('/clock/in', {
    data: {
      code,
      type: type === 1 ? '1' : '2',
    },
    successWords: '打卡成功',
  }),
});
const requestCheckinListReducer = (state = {
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
    default:
      return state;
  }
};
const checkinReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PROJECT_CHECKIN_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PROJECT_CHECKIN_FULFILLED':

      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'PROJECT_CHECKIN_REJECTED':
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
  checkin: checkinReducer,
  ckeckinList: requestCheckinListReducer,
});
export default reducer;

// export default (state = {
//   fetching: false,
//   failed: false,
//   data: null,
// }, action) => {
//   switch (action.type) {
//     case 'CHECKIN_LIST_PENDING':
//       return {
//         ...state,
//         fetching: true,
//         failed: false,
//       };
//     case 'CHECKIN_LIST_FULFILLED':

//       return {
//         ...state,
//         fetching: false,
//         failed: false,
//         data: action.payload && action.payload.data,
//       };
//     case 'CHECKIN_LIST_REJECTED':
//       return {
//         ...state,
//         failed: true,
//         fetching: false,
//       };
//     case 'PROJECT_CHECKIN_FULFILLED':
//       if (action.payload.error_code || !action.payload.data) {
//         return state;
//       }

//       return {
//         ...state,
//         data: action.payload.data,
//       };
//     default:
//       return state;
//   }
// };

