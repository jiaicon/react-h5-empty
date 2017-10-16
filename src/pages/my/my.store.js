
import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';
// 收藏数据

export const collectAction = num => ({
  type: 'COLLECT_DATA',
  meta: {
    type: num === 0 ? 'project' : 'team',
  },
  payload: fetch('/user/collection', { method: 'GET', data: { type: num } }),
});
const collectReducer = (state = {
  fetching: false,
  failed: false,
  type: 'team',
  data: null,
}, action) => {
  switch (action.type) {
    case 'COLLECT_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'COLLECT_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        type: action.meta.type,
        data: action.payload.data,
      };
    case 'COLLECT_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 获取team数据
export const teamAction = () => ({
  type: 'TEAM_DATA',
  payload: fetch('/user/team', { method: 'GET' }),
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
  payload: fetch('/user/project', { method: 'GET', data: { status: num } }),
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

// 搜索团队
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
// 增加家庭成员
export const addFamilyAction = data => ({
  type: 'ADDFAMILY_DATA',
  payload: fetch('/myfamily', { data }, { method: 'POST' }),
});
const addFamilyReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'ADDFAMILY_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'ADDFAMILY_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'ADDFAMILY_DATA_REJECTED':
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
  payload: fetch('/user', { method: 'POST' }),
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


// 补录时长项目列表get
export const projectapplyAction = () => ({
  type: 'PROJECTAPPLY_DATA',
  payload: fetch('/user/apply', { method: 'GET' }),
});
const projectapplyReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PROJECTAPPLY_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PROJECTAPPLY_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'PROJECTAPPLY_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};


// project_id: [integer] 项目id 【必填】
// reward_time: [float] 补录时长 【必填】
// content: [string] 申请内容【必填】
// attachment: [array] 申请附件【非必填】
export const postapplyAction = data => ({
  type: 'POSTAPPLY_DATA',
  payload: fetch('/user/apply', { data }, { method: 'POST' }),
});
const postApplyReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'POSTAPPLY_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'POSTAPPLY_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'POSTAPPLY_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 补录时长申请列表get
export const applyAction = () => ({
  type: 'APPLY_DATA',
  payload: fetch('/user/apply', { method: 'GET' }),
});
const applyReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'APPLY_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'APPLY_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'APPLY_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 删除家庭成员
export const deleteFamilyAction = id => ({
  type: 'DELETE_DATA',
  payload: fetch(`/myfamily/${id}`, { method: 'DELETE' }),
});
const deleteFamilyReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'DELETE_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'DELETE_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'DELETE_DATA_REJECTED':
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
  addFamily: addFamilyReducer,
  collect: collectReducer,
  apply: applyReducer,
  postapply: postApplyReducer,
  projectapply: projectapplyReducer,
  deletefamily: deleteFamilyReducer,
});
export default reducer;
