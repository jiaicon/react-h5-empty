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

  const reducer = combineReducers({
    project: projectReducer,

  });
  export default reducer;