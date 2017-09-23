import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end, // The action value if a "long" running task ended
} from 'react-redux-spinner';

// 添加异步任务，会触发 loading
export const addAysncTask = () => ({ type: 'ADD_ASYNC_TASK', [pendingTask]: begin });

// 删除异步任务，当异步任务为 0 会隐藏 loading
export const removeAysncTask = () => ({ type: 'REMOVE_ASYNC_TASK', [pendingTask]: end });

