import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end, // The action value if a "long" running task ended
} from 'react-redux-spinner';

// 添加异步任务，会触发 loading
export const addAysncTask = () => ({ type: 'ADD_ASYNC_TASK', [pendingTask]: begin });

// 删除异步任务，当异步任务为 0 会隐藏 loading
export const removeAysncTask = () => ({ type: 'REMOVE_ASYNC_TASK', [pendingTask]: end });

/**
 * 用户信息存储
 */
export const USERINFO_FULFILLED = 'USERINFO_FULFILLED';
export function userReducer(state = {}, action) {
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

      return action.payload.data;
    default:
      return state;
  }
}

