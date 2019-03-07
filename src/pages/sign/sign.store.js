import { combineReducers } from "redux";
import fetch from "../../utils/fetch";
export const clocking = data => ({
  type: "V2_CHECKIN_ING",
  payload: fetch(`/clock/${data.id}`, {
    method: 'POST',
      data: {...data},
    switchUrl: `${window.apiHost}/api/v2`
  })
});

const clockingReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case "V2_CHECKIN_ING_PENDING":
      return { ...state, fetching: true, failed: false };
    case "V2_CHECKIN_ING_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data
      };
    case "V2_CHECKIN_ING_REJECTED":
      return { ...state, failed: true, fetching: false };
    default:
      return state;
  }
};

export const requestClockInfo = id => ({
  type: "V2_CHECKIN_INFO",
  payload: fetch(`/clock/${id}/info`, {
    method: "GET",
    switchUrl: `${window.apiHost}/api/v2`
  })
});

const clockinfoReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case "V2_CHECKIN_INFO_PENDING":
      return { ...state, fetching: true, failed: false };
    case "V2_CHECKIN_INFO_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data
      };
    case "V2_CHECKIN_INFO_REJECTED":
      return { ...state, failed: true, fetching: false };
    default:
      return state;
  }
};

export const requestClockClassList = id => ({
  type: "V2_CHECKIN_CLASS_LIST",
  payload: fetch(`/project/${id}/clock`, {
    method: "GET",
    switchUrl: `${window.apiHost}/api/v2`
  })
});

const clockclasslistReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case "V2_CHECKIN_CLASS_LIST_PENDING":
      return { ...state, fetching: true, failed: false };
    case "V2_CHECKIN_CLASS_LIST_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data
      };
    case "V2_CHECKIN_CLASS_LIST_REJECTED":
      return { ...state, failed: true, fetching: false };
    default:
      return state;
  }
};

export const requestClockList = () => ({
  type: "V2_CHECKIN_LIST",
  payload: fetch("/user/project/clock", {
    method: "GET",
    switchUrl: `${window.apiHost}/api/v2`
  })
});

const clocklistReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case "V2_CHECKIN_LIST_PENDING":
      return { ...state, fetching: true, failed: false };
    case "V2_CHECKIN_LIST_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data
      };
    case "V2_CHECKIN_LIST_REJECTED":
      return { ...state, failed: true, fetching: false };
    default:
      return state;
  }
};

export const requestCheckinList = () => ({
  type: "CHECKIN_LIST",
  payload: fetch("/clock/in", { method: "GET" })
});

// TODO: 打卡成功是否将新打卡记录返回
export const checkin = (code, type) => ({
  type: "PROJECT_CHECKIN",
  payload: fetch("/clock/in", {
    data: {
      code,
      type: type === 1 ? "1" : "2"
    },
    successWords: "打卡成功"
  })
});
const requestCheckinListReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case "CHECKIN_LIST_PENDING":
      return {
        ...state,
        fetching: true,
        failed: false
      };
    case "CHECKIN_LIST_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data
      };
    case "CHECKIN_LIST_REJECTED":
      return {
        ...state,
        failed: true,
        fetching: false
      };
    default:
      return state;
  }
};
const checkinReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case "PROJECT_CHECKIN_PENDING":
      return {
        ...state,
        fetching: true,
        failed: false
      };
    case "PROJECT_CHECKIN_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data
      };
    case "PROJECT_CHECKIN_REJECTED":
      return {
        ...state,
        failed: true,
        fetching: false
      };
    default:
      return state;
  }
};
//申请补卡接口
export const projectCheckedSubmit = (data) => ({
    type: "PROJECT_CHECKED_SUBMIT",
    payload: fetch(`${window.apiHost}/api/v2/clock/${data.id}/apply`, {method: 'POST', data})
});
const projectCheckedSubmitReducer = (
    state = {
        fetching: false,
        failed: false,
        data: null
    },
    action
)=>{
    switch (action.type) {
        case "PROJECT_CHECKED_SUBMIT_PENDING":
            return {
                ...state,
                fetching: true,
                failed: false
            };
        case "PROJECT_CHECKED_SUBMIT_FULFILLED":
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload.data
            };
        case "PROJECT_CHECKED_SUBMIT_REJECTED":
            return {
                ...state,
                failed: true,
                fetching: false
            };
        default:
            return state;
    }
};
//获取能申请补签过的项目接口
export const projectCheckedApply = () => ({
    type: "PROJECT_CHECKED_Apply",
    payload: fetch(`${window.apiHost}/api/v2/clock/apply/project`, {method: 'GET'})
});
const projectCheckedApplyReducer = (
    state = {
        fetching: false,
        failed: false,
        data: null
    },
    action
)=>{
    switch (action.type) {
        case "PROJECT_CHECKED_Apply_PENDING":
            return {
                ...state,
                fetching: true,
                failed: false
            };
        case "PROJECT_CHECKED_Apply_FULFILLED":
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload.data.list
            };
        case "PROJECT_CHECKED_Apply_REJECTED":
            return {
                ...state,
                failed: true,
                fetching: false
            };
        default:
            return state;
    }
};
// 获取项目的所能补卡的班次接口
export const getProjectClockList = (id) => ({
    type: "GET_PRO_CLOCK_LIST",
    payload: fetch(`${window.apiHost}/api/v2/project/${id}/clock/list`, {method: 'GET'})
});
const getProjectClockListReducer = (
    state = {
        fetching: false,
        failed: false,
        list: null
    },
    action
)=>{
    switch (action.type) {
        case "GET_PRO_CLOCK_LIST_PENDING":
            return {
                ...state,
                fetching: true,
                failed: false
            };
        case "GET_PRO_CLOCK_LIST_FULFILLED":
            return {
                ...state,
                fetching: false,
                failed: false,
                list: action.payload.data&&action.payload.data.list
            };
        case "GET_PRO_CLOCK_LIST_REJECTED":
            return {
                ...state,
                failed: true,
                fetching: false
            };
        default:
            return state;
    }
};
const reducer = combineReducers({
  checkin: checkinReducer,
  ckeckinList: requestCheckinListReducer,
  clocklist: clocklistReducer,
  clockclasslist: clockclasslistReducer,
  clickinfo: clockinfoReducer,
  clocking: clockingReducer,
    projectCheckedSubmit: projectCheckedSubmitReducer,
    projectCheckedApply: projectCheckedApplyReducer,
    getProjectClockList: getProjectClockListReducer,
});
export default reducer;
