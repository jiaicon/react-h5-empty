import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end, // The action value if a "long" running task ended
} from 'react-redux-spinner';

import fetch from '../utils/fetch';

// 添加异步任务，会触发 loading
export const addAysncTask = () => ({ type: 'ADD_ASYNC_TASK', [pendingTask]: begin });

// 删除异步任务，当异步任务为 0 会隐藏 loading
export const removeAysncTask = () => ({ type: 'REMOVE_ASYNC_TASK', [pendingTask]: end });

export const USERINFO_FULFILLED = 'USERINFO_FULFILLED';

/**
 * 用户信息获取
 */
export const requestUserInfo = () => (dispatch) => {
  const token = localStorage.getItem('TOKEN');

  // 用户信息请求为非强依赖请求，如果本地没有 token 即未登录则直接忽略即可
  if (!token) {
    console.log('用户未登录，忽略 requestUserInfo');
    return;
  }

  fetch('/user', {
    method: 'GET',
  }).then((json) => {
    // 获取到用户信息后单独处理（存储 token/用户信息）
    dispatch({ type: USERINFO_FULFILLED, payload: json });
  }).catch((e) => {
    console.log('requestUserInfo failed');
    console.log(e);
  });
};

/**
 * 用户信息存储
 */
export function userReducer(state = { isLogin: !!localStorage.getItem('TOKEN') }, action) {
  const payload = action.payload;
  const data = payload && payload.data;

  switch (action.type) {
    case USERINFO_FULFILLED:
      if (payload.error_code) {
        return state;
      }

      if (data.token) {
        localStorage.setItem('TOKEN', data.token);
      }

      return { ...action.payload.data, isLogin: true };
    default:
      return state;
  }
}

