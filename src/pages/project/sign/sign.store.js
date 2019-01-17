import queryString from "query-string";
import fetch from "../../../utils/fetch";
import Alert from "react-s-alert";
import { combineReducers } from "redux";
import history from "../../history";
export const payResultAction = data => ({
  type: "PROJECT_PAYRESEULT_DATA",
  payload: fetch(`/project/pay/result/${data.sn}`, { method: "GET" ,data})
});
const payResultReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null,
  },
  action
) => {
 
  switch (action.type) {
    case "PROJECT_PAYRESEULT_DATA_PENDING":
      return { ...state, fetching: true, failed: false };
    case "PROJECT_PAYRESEULT_DATA_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data ? action.payload.data:null
      };
    case "PROJECT_PAYRESEULT_DATA_REJECTED":
      return { ...state, failed: true, fetching: false };
    default:
      return state;
  }
};

export const joinPayProject = data => dispatch => {
  if (Object.keys(data.payment).length == 0) {
    dispatch({ type: "PROJECT_JOINPROJECT_DATA_PENDING" });
  }
  fetch(`/project/join/${data.id}`, {
    method: "POST",
    data
  })
    .then(json => {
      console.log(Object.keys(data.payment).length);
      if (!window.userAgent && json.data.wechatPayUrl) {
        // alert(JSON.stringify(json.data));
        let data = {
          wechatPayUrl: json.data.wechatPayUrl,
          sn: json.data.sn,
          project_id: json.data.project_id
        };
        localStorage.setItem("sndata", JSON.stringify(data));
        location.replace(`/project/receipt/${json.data.sn}?firstopen=true`);
        return;
      }
      if (window.userAgent && json.data.jsConfig) {
        // wx.config(json.data.jsConfig);
        //   http://kf.qq.com/faq/161221IbQRZN161221M3EviE.html
        // ios系统可以正常支付，android系统支付失败 timestamp字段值需要加上“”,传递数据必须为字符串类型。
        wx.ready(() => {
          wx.chooseWXPay({
            timestamp: `${json.data.payConfig.timestamp}`,
            nonceStr: json.data.payConfig.nonceStr,
            package: json.data.payConfig.package,
            signType: json.data.payConfig.signType,
            paySign: json.data.payConfig.paySign,
            success(res) {
              dispatch({ type: "PROJECT_PAY_JOIN_PENDING" });
              dispatch({ type: "PROJECT_PAY_JOIN_FULFILLED", data: json.data });

              Alert.success("支付成功");
            },
            fail(res) {
              Alert.warning("支付失败");
              console.log(res);
            },
            complete(res) {}
          });
        });
        dispatch({ type: "PROJECT_PAY_JOIN_FULFILLED", payload: json.data });
      } else {
        dispatch({ type: "PROJECT_PAY_JOIN_FULFILLED", payload: json.data });
      }
      if (Object.keys(data.payment).length == 0) {
        dispatch({
          type: "PROJECT_JOINPROJECT_DATA_FULFILLED",
          data: json.data
        });
      }
    })
    .catch(e => {
      dispatch({ type: "PROJECT_PAY_JOIN_REJECTED" });
      if (Object.keys(data.payment).length == 0) {
        dispatch({ type: "PROJECT_JOINPROJECT_DATA_REJECTED" });
      }
    });
};
const joinPayProjectReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case "PROJECT_PAY_JOIN_PENDING":
      return {
        ...state,
        fetching: true,
        failed: false
      };
    case "PROJECT_PAY_JOIN_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.data,
        projectId: action.payload.data.id
      };
    case "PROJECT_PAY_JOIN_REJECTED":
      return {
        ...state,
        fetching: false,
        failed: true
      };
    default:
      return state;
  }
};
export const joinProjectAction = data => ({
  type: "PROJECT_JOINPROJECT_DATA",
  payload: fetch(`/project/join/${data.id}`, { data })
});
const joinProjectReducer = (
  state = {
    fetching: false,
    failed: false,
    data: null,
    projectId: null
  },
  action
) => {
  switch (action.type) {
    case "PROJECT_JOINPROJECT_DATA_PENDING":
      return {
        ...state,
        fetching: true,
        failed: false
      };
    case "PROJECT_JOINPROJECT_DATA_FULFILLED":
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data
      };
    case "PROJECT_JOINPROJECT_DATA_REJECTED":
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
  joinPayProject: joinPayProjectReducer,
  joinProject: joinProjectReducer,
  payResult: payResultReducer
});
export default reducer;
