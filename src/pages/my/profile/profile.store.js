
import { combineReducers } from 'redux';
import fetch from '../../../utils/fetch';
import { API_HOST } from '../../../utils/config';
// x修改手机号
export const updatePhone = data => ({
  type: 'USER_PHONE',
  payload: fetch(`${API_HOST}/api/v1/user/phone`, {
    data,
  }),
});
const updataPhoneReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'USER_PHONE_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'USER_PHONE_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'USER_PHONE_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

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
const a = function (id) {
  return ({

  })
}
export const addressDataAction = id => ({
  type: 'ADDRESS_DATA',
  payload: fetch(`${API_HOST}/api/city?parent_id=${id}`, { method: 'GET' }),
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
// 家庭成员信息
export const otherFamilyAction = id => ({
  type: 'otherFamily',
  payload: fetch(`/myfamily/${id}`, { method: 'GET' }),
});
const otherFamilReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'otherFamily_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'otherFamily_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'otherFamily_REJECTED':
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
  otherfamily: otherFamilReducer,
  updatePhone: updataPhoneReducer,
});
export default reducer;
