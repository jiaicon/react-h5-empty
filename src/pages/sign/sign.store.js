import { combineReducers } from "redux";
import fetch from "../../utils/fetch";
export const clocking = data => ({
  type: "V2_CHECKIN_ING",
  payload: fetch(`/clock/${data.id}`, {
    method: "post",
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
const reducer = combineReducers({
  checkin: checkinReducer,
  ckeckinList: requestCheckinListReducer,
  clocklist: clocklistReducer,
  clockclasslist: clockclasslistReducer,
  clickinfo: clockinfoReducer,
  clocking: clockingReducer
});
export default reducer;
