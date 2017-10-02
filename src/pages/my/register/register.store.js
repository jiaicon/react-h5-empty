import Alert from 'react-s-alert';
import { combineReducers } from 'redux';
import fetch from '../../../utils/fetch';
import { USERINFO_FULFILLED } from '../../../stores/common';


export const REGISTER_PENDING = 'REGISTER_PENDING';
export const REGISTER_FULFILLED = 'REGISTER_FULFILLED';
export const REGISTER_REJECTED = 'REGISTER_REJECTED';


// TODO:
export const CODE_PENDING = 'CODE_PENDING';
export const CODE_FULFILLED = 'CODE_FULFILLED';
export const CODE_REJECTED = 'CODE_REJECTED';

export const requestVerifyCode = phone => (dispatch) => {
  dispatch({ type: CODE_PENDING });
  fetch('/verifycode', {
    data: { phone },
  }).then((json) => {
    Alert.success('发送成功');
    dispatch({ type: CODE_FULFILLED, payload: json.data });
  }).catch(() => {
    dispatch({ type: CODE_REJECTED });
  });
};


export const register = data => (dispatch) => {
  dispatch({ type: REGISTER_PENDING });

  fetch('/register', {
    data,
  }).then((json) => {
    dispatch({ type: REGISTER_FULFILLED, payload: json.data });

    // 获取到用户信息后单独处理（存储 token/用户信息）
    dispatch({ type: USERINFO_FULFILLED, payload: json });
  }).catch((e) => {
    console.log(e);
    dispatch({ type: REGISTER_REJECTED });
  });
};

// 注册
const registerReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case REGISTER_PENDING:
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
const codeReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case CODE_PENDING:
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case CODE_FULFILLED:
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case CODE_REJECTED:
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
  codeReducer,
  registerReducer,

});
export default reducer;
