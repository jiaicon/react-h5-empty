import fetch from '../../../utils/fetch';
import { USERINFO_FULFILLED } from '../../../stores/common';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';


export const loginAction = (username, pwd) => (dispatch) => {
  dispatch({ type: LOGIN_PENDING });

  fetch('/login', {
    data: {
      username,
      pwd,
    },
  }).then((json) => {
    dispatch({ type: LOGIN_FULFILLED, payload: json.data });

    // 获取到用户信息后单独处理（存储 token/用户信息）
    dispatch({ type: USERINFO_FULFILLED, payload: json });
  }).catch((e) => {
    console.log(e);
    dispatch({ type: LOGIN_REJECTED });
  });
};

export default (state = {
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

