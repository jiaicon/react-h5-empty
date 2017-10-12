import { combineReducers } from 'redux';
import Alert from 'react-s-alert';
import fetch from '../../../utils/fetch';
import { USERINFO_FULFILLED } from '../../../stores/common';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';


export const loginAction = data => (dispatch) => {
  dispatch({ type: LOGIN_PENDING });

  fetch('/login', {
    data,
  }).then((json) => {
    dispatch({ type: LOGIN_FULFILLED, payload: json.data });

    // 获取到用户信息后单独处理（存储 token/用户信息）
    dispatch({ type: USERINFO_FULFILLED, payload: json });
  }).catch((e) => {
    console.log(e);
    dispatch({ type: LOGIN_REJECTED });
  });
};

const loginReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 忘记密码，修改密码
export const forgetAction = data => ({
  type: 'FORGET',
  payload: fetch('/reset/pwd', {
    data,
    successWords: '修改成功',
  }),
});


const forgetReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'FORGET_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'FORGET_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'FORGET_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 获取验证码
export const againVerifyCode = data => ({
  type: 'CODE',
  payload: fetch('http://alpha.api.volunteer.tmallwo.com/api/phone/verifycode', {
    data,
    successWords: '发送成功',
  }),
});


const againReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'CODE_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'CODE_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'CODE_REJECTED':
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
  forget: forgetReducer,
  login: loginReducer,
  code: againReducer,
});
export default reducer;

