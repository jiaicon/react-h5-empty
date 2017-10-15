
import { combineReducers } from 'redux';
import fetch from '../../../utils/fetch';
// 实名
export const checkUser = data => ({
  type: 'CHECK',
  payload: fetch('/user/check', {
    data,
  }),
});


const checkUserReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'CHECK_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'CHECK_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'CHECK_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 注册
const registerReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 完善个人信息
export const imporvePersonInfo = data => ({
  type: 'PERSON_INFO',
  payload: fetch('/user', {
    data,
  }),
});
const personInfoReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PERSON_INFO_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PERSON_INFO_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'PERSON_INFO_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 3级
export const addressDataAction = id => ({
  type: 'ADDRESS_DATA',
  payload: fetch(`http://alpha.api.volunteer.tmallwo.com/api/city?parent_id=${id}`, { method: 'GET' }),
});

const addressReducer = (state = {
  fetching: false,
  failed: false,
  data: {
    province: null,
    city: null,
    county: null,
  },
}, action) => {
  const addressData = action.payload && action.payload.data;
  // 1 - province 2 - city 3 - county
  const level = addressData && addressData.list && addressData.list.length
                ? addressData.list[0].level : -1;
  let levelKey;

  switch (level) {
    case 1:
      levelKey = 'province';
      break;
    case 2:
      levelKey = 'city';
      break;
    case 3:
      levelKey = 'county';
      break;
    default:
      levelKey = '';
  }
  switch (action.type) {
    case 'ADDRESS_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'ADDRESS_DATA_FULFILLED':

      return {
        ...state,
        fetching: false,
        failed: false,
        data: {
          ...state.data,
          [levelKey]: addressData.list,
        },
      };
    case 'ADDRESS_DATA_REJECTED':
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
  person: personInfoReducer,
  checkUser: checkUserReducer,
  address: addressReducer,
  register: registerReducer,
});
export default reducer;