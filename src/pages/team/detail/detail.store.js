import fetch from '../../../utils/fetch';

/**
 * 团队详情 Action
 * @param {string} teamId
 */
export const requestTeamDetail = teamId => ({
  type: 'TEAM_DETAIL',
  meta: {
    id: teamId,
  },
  payload: fetch(`/team/${teamId}`, { method: 'GET' }),
});

/**
 * 团队项目
 */
export const requestTeamProjectList = teamId => ({
  type: 'TEAM_PROJECT_LIST',
  payload: fetch('/project', { method: 'GET', data: { team_id: teamId, page_size: 1000 } }),
});


/**
 * 团队收藏 Action
 */
export const collectTeam = teamId => ({
  type: 'TEAM_COLLECT',
  payload: fetch('/user/collection', {
    data: {
      id: teamId,
      type: 1, // 0-项目, 1-团队
    },
    successWords: '收藏成功',
  }),
});

export const unCollectTeam = teamId => ({
  type: 'TEAM_UNCOLLECT',
  payload: fetch('/user/uncollection', {
    data: {
      id: teamId,
      type: 1, // 0-项目, 1-团队
    },
    successWords: '取消收藏成功',
  }),
});

/**
 * 团队加入/退出 Action
 */
export const joinTeam = (teamId, detailData) => ({
  type: 'TEAM_JOIN',
  meta: {
    joinType: detailData.join_type,
  },
  payload: fetch(`/team/join/${teamId}`, {
    data: {
      id: teamId,
      type: 1, // 0-退出, 1-加入
    },
    successWords: detailData.join_type === 1 ? '您已加入该团队' : '已成功申请，请耐心等待审核',
  }),
});

export const quitTeam = teamId => ({
  type: 'TEAM_QUIT',
  payload: fetch(`/team/join/${teamId}`, {
    data: {
      id: teamId,
      type: 0, // 0-退出, 1-加入
    },
    successWords: '退出成功',
  }),
});

/**
 * 切换 TAB 记录 TAB 状态，在后退操作后需要记录
 */

export const saveTeamTabIndex = (tabTeamIndex, lastTeamId) => ({
  type: 'SWITCH_TEAM_TAB',
  payload: { tabTeamIndex, lastTeamId },
});


export default (state = {
  fetching: false,
  failed: false,
  fetchingId: null,
  tabTeamIndex: 0,
  lastTeamId: 0,
  team: null,
  projects: null,
}, action) => {
  switch (action.type) {
    case 'TEAM_DETAIL_PENDING':
      return {
        ...state,
        fetching: true,
        fetchingId: action.meta.id,
        failed: false,
      };
    case 'TEAM_DETAIL_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetchingId: action.meta.id,
        failed: false,
        team: action.payload && action.payload.data,
      };
    case 'TEAM_DETAIL_REJECTED':
      return {
        ...state,
        failed: true,
        fetchingId: action.meta.id,
        fetching: false,
      };
    case 'TEAM_PROJECT_LIST_FULFILLED':
      return {
        ...state,
        projects: action.payload && action.payload.data,
      };
    case 'TEAM_COLLECT_FULFILLED':
      return {
        ...state,
        team: {
          ...state.team,
          collection_status: 1,
        },
      };
    case 'TEAM_UNCOLLECT_FULFILLED':
      return {
        ...state,
        team: {
          ...state.team,
          collection_status: 0,
        },
      };
    case 'TEAM_JOIN_FULFILLED':
      return {
        ...state,
        team: {
          ...state.team,
          team_size: action.meta.joinType === 1 ? state.team.team_size + 1 : state.team.team_size,
          // -1未加入 0审核中 1通过 2驳回
          join_status: action.meta.joinType === 1 ? 1 : 0,
        },
      };
    case 'TEAM_QUIT_FULFILLED':
      return {
        ...state,
        team: {
          ...state.team,
          team_size: state.team.team_size - 1,
          // -1未加入 0审核中 1通过 2驳回
          join_status: -1,
        },
      };
    case 'SWITCH_TEAM_TAB':
      return {
        ...state,
        tabTeamIndex: action.payload.tabTeamIndex,
        lastTeamId: action.payload.lastTeamId,
      };
    default:
      return state;
  }
};

