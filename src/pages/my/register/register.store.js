import fetch from '../../../utils/fetch';
import { USERINFO_FULFILLED } from '../../../stores/common';

export const REGISTER_PENDING = 'REGISTER_PENDING';
export const REGISTER_FULFILLED = 'REGISTER_FULFILLED';
export const REGISTER_REJECTED = 'REGISTER_REJECTED';


export const register = (username, phone, verifyCode, pwd, avatars) => (dispatch) => {
  dispatch({ type: REGISTER_PENDING });

  fetch('/register', {
    data: {
      username,
      pwd,
      phone,
      verify_code: verifyCode,
      avatars,
    },
  }).then((json) => {
    dispatch({ type: REGISTER_FULFILLED, payload: json.data });

    // 获取到用户信息后单独处理（存储 token/用户信息）
    dispatch({ type: USERINFO_FULFILLED, payload: json });
  }).catch((e) => {
    console.log(e);
    dispatch({ type: REGISTER_REJECTED });
  });
};

export default (state = {
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

