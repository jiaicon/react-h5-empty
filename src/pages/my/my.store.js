
import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';

// 获取team数据
export const teamAction = () => ({
  type: 'TEAM_DATA',
  payload: fetch('/user/team', { method: 'GET', noRedirect: true }),
});
const teamReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'TEAM_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'TEAM_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'TEAM_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 获取项目数据

export const projectAction = num => ({
  type: 'PROJECT_DATA',
  meta: {
    state: num,
  },
  payload: fetch('/user/project', { method: 'GET', noRedirect: true }),
});

const projectReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PROJECT_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PROJECT_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'PROJECT_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 获取志愿时长

export const rewardTimeAction = () => ({
  type: 'REWARDTIME_DATA',
  payload: fetch('/user/reward/time', { method: 'GET' }),
});
const rewardTimeReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'REWARDTIME_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'REWARDTIME_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'REWARDTIME_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 搜索团队
export const searchAction = keyword => ({
  type: 'SEARCH_DATA',
  meta: {
    keyword,
  },
  payload: fetch(`/search/repositories?q=${keyword}`, { method: 'GET' }),
});
const searchTeamReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'SEARCHTEAM_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
        keyword: action.meta.keyword,
      };
    case 'SEARCHTEAM_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
        keyword: action.meta.keyword,
      };
    case 'SEARCHTEAM_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
        keyword: action.meta.keyword,
      };
    default:
      return state;
  }
};
// 请求家庭成员
export const familyAction = () => ({
  type: 'FAMILY_DATA',
  payload: fetch('/myfamily', { method: 'GET' }),
});
const familyReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'FAMILY_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'FAMILY_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'FAMILY_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 我的消息
export const messagesAction = () => ({
  type: 'MESSAGES_DATA',
  payload: fetch('/message', { method: 'GET' }),
});
const messagesReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'MESSAGES_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'MESSAGES_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'MESSAGES_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 提交个人信息，头像，口号，擅长
export const correctUserInfo = data => ({
  type: 'USERINFO_DATA',
  meta: {
    data,
  },
  payload: fetch('user', { method: 'POST' }),
});
const correctUserInfoReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'USERINFO_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'USERINFO_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
        keyword: action.meta.keyword,
      };
    case 'USERINFO_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 个人中心首页
export const userCenterAction = () => ({
  type: 'USER_CENTER_DATA',
  payload: fetch('/user/center', { method: 'GET' }),
});
const userCenterReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'USER_CENTER_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'USER_CENTER_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'USER_CENTER_DATA_REJECTED':
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
  usercenter: userCenterReducer,
  team: teamReducer,
  project: projectReducer,
  reward: rewardTimeReducer,
  search: searchTeamReducer,
  messages: messagesReducer,
  correct: correctUserInfoReducer,
  family: familyReducer,
});
export default reducer;
