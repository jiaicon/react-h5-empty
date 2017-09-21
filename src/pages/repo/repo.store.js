import fetch from '../../utils/fetch';

export const getRepo = (owner, repo) => ({
  type: 'GET_REPO',
  meta: { id: `${owner}/${repo}` },
  payload: fetch(`/repos/${owner}/${repo}`, { method: 'GET' }),
});

export default (state = {
  id: '',
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'GET_REPO_PENDING':
      return {
        ...state,
        id: action.meta.id,
        fetching: true,
        failed: false,
      };
    case 'GET_REPO_FULFILLED':

      if (action.meta.id !== state.id) {
        return state;
      }

      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'GET_REPO_REJECTED':
      if (action.meta.id !== state.id) {
        return state;
      }

      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

