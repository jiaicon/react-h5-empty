import fetch from '../../../utils/fetch';

export const requestProjectDetail = projectId => ({
  type: 'PROJECT_DETAIL',
  meta: {
    id: projectId,
  },
  payload: fetch(`/project/${projectId}`, { method: 'GET' }),
});

export default (state = {
  fetching: false,
  failed: false,
  fetchingId: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PROJECT_DETAIL_PENDING':
      return {
        ...state,
        fetching: true,
        fetchingId: action.meta.id,
        failed: false,
      };
    case 'PROJECT_DETAIL_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetchingId: action.meta.id,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'PROJECT_DETAIL_REJECTED':
      return {
        ...state,
        failed: true,
        fetchingId: action.meta.id,
        fetching: false,
      };
    default:
      return state;
  }
};

