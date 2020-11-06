import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end, // The action value if a "long" running task ended
} from 'react-redux-spinner';

import fetch from '../utils/fetch';
import { setToken, getToken } from '../utils/funcs';
import history from '../pages/history';
// 添加异步任务，会触发 loading
export const addAysncTask = () => ({ type: 'ADD_ASYNC_TASK', [pendingTask]: begin });

// 删除异步任务，当异步任务为 0 会隐藏 loading
export const removeAysncTask = () => ({ type: 'REMOVE_ASYNC_TASK', [pendingTask]: end });

export const USERINFO_FULFILLED = 'USERINFO_FULFILLED';
export const USERINFO_CLEAR = 'USERINFO_CLEAR';
export const USERINFO_UPDATED = 'USERINFO_UPDATED';

// 修改用户信息
export const updateUserInfo = userInfo => ({ type: 'USERINFO_UPDATED', payload: { userInfo } });

/**
 * 用户信息获取
 */
export const requestUserInfo = noRedirect => (dispatch) => {
  const token = getToken();

  // 用户信息请求为非强依赖请求，如果本地没有 token 即未登录则直接忽略即可
  if (!token) {
    console.log('用户未登录，忽略 requestUserInfo');
    return;
  }

  fetch('/user', {
    method: 'GET',
    noRedirect,
  }).then((json) => {
    // 获取到用户信息后单独处理（存储 token/用户信息）
    if (json) {
      dispatch({ type: USERINFO_FULFILLED, payload: json });
    }
  }).catch((e) => {
    console.log('requestUserInfo failed');
    console.log(e);
  });
};

/**
 * 用户
 * 
 */
if (localStorage.getItem("volunteer-userInfo")) {
  var storageData = JSON.parse(localStorage.getItem("volunteer-userInfo"));
}

export function userReducer(state = { isLogin: !!(getToken() || localStorage.getItem('appToken') && localStorage.getItem('appToken').length), ...storageData}, action) {
  const payload = action.payload;
  const data = payload && payload.data;
  switch (action.type) {
    case USERINFO_FULFILLED:
      if (payload.error_code) {
        return state;
      }

      if (data.token) {
        setToken(data.token);
      }
      if (data && data.id) {
        localStorage.setItem("volunteer-userInfo", JSON.stringify(data));
      }

      if (localStorage.getItem("volunteer-userInfo")) {
        var storageData = JSON.parse(localStorage.getItem("volunteer-userInfo"));
      }

      return { ...storageData,...action.payload.data, isLogin: true };
    case USERINFO_UPDATED:
      return {
        ...state,
        ...action.payload.userInfo,
      };
    case USERINFO_CLEAR:
      if (payload.error_code) {
        return state;
      }

      setToken(null);
      localStorage.removeItem("volunteer-userInfo");
      return {
        isLogin: false,
      };
    default:
      return state;
  }
}

