import Alert from "react-s-alert";
import { API_PREFIX } from "./config";
import { addAysncTask, removeAysncTask } from "../stores/common";
import { storeLoginSource } from "../pages/my/login/login.store";
import store from "../stores";
import history, { USING_HISTORY_HASH } from "../pages/history";
import { getToken,getCookie } from "./funcs";

function encodeUnicode(str) {
  const res = [];
  for (let i = 0; i < str.length; i++) {
    res[i] = `00${str.charCodeAt(i).toString(16)}`.slice(-4);
  }
  return `\\u${res.join("\\u")}`;
}

function isPlainObject(o) {
  return typeof o == "object" && o.constructor == Object;
}

/**
 *
 * @param {string} requestUrl
 * @param {object} requestOptions
 *    @param {string}   method
 *    @param {object}   headers
 *    @param {boolean}  loading       是否显示默认 loading
 *    @param {boolean}  noRedirect    接口返回未登录(token失效)是否自动跳转登录页
 *    @param {string}   successWords  接口调用成功后的提示语
 */
export default function request(requestUrl, requestOptions = {}) {
  console.log(requestOptions);
  let url = requestUrl;
  let { switchUrl } = requestOptions;
  const options = {
    ...requestOptions
  };

  if (url.indexOf("http") !== 0 && !switchUrl) {
    url = API_PREFIX + url;
  }else if (switchUrl) {
    url = switchUrl + url;
  }
  if (!options.method) {
    options.method = "POST";
  }

  if (options.loading !== false) {
    options.loading = true;
  }

  // 添加默认请求头 先注释，否则 PREFLIGHT 的 OPTIONS 请求返回会失败导致请求失败
  // 需要服务端进行设置，参考https://stackoverflow.com/questions/40900977/custom-request-heade
  // r s-not-being-sent-with-a-javascript-fetch-request
  const headers = options.headers || {};
  const location = getCookie("location") ? JSON.parse(getCookie("location")) : null;
  const city = getCookie("provinceAndCityName") ? JSON.parse(getCookie("provinceAndCityName")).city : null;
   
  let headersObj = {
    ...headers,
    "X-auth-token": getToken() || "",
    "X-org-code": window.orgCode,
    "X-location": location
      ? `${
      location.lng // 授权 token // 机构代码 // 经纬度 经度-纬度
      }-${location.lat}`
      : "116.403847-39.915526",
    "X-unique-key": window.uniqueKey || "demo",
    "X-city": `${encodeURI(city)}`
  }
  if (!location) {
    delete headersObj["X-location"];
  }
  options.headers = headersObj;
  // 自定义头必须设置 mode 为 cors
  options.mode = "cors";

  // 处理 data，value 支持基本类型之外还支持数组以及单层结构的 plain object 对于数组数据，例如{url:['1','2']} 会转换为
  // url[]=1&&url[]=2 对于对象数据，例如 {url:{protocol: 'http', query:'a'}} 会转化为
  // url[protocol]=http&&url[query]=a
  const data = options.data || {};
  const keys = Object.keys(data);
  const params = [];
  keys.forEach(key => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => {
          return params.push(
            `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`
          );
        });
      } else if (isPlainObject(value)) {
        for (let k in value) {
          if (value.hasOwnProperty(k)) {
            params.push(
              `${encodeURIComponent(key)}[${encodeURIComponent(
                k
              )}]=${encodeURIComponent(value[k])}`
            );
          }
        }
      } else {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  });
  if (options.method === "POST") {
    options.headers["Content-Type"] = "application/x-www-form-urlencoded";
    options.body = params.join("&");
  } else {
      console.log(params)
    url = `${url}${params&&params.length ? '?'+params.join("&"):''}`;
  }

  if (options.loading) {
    store.dispatch(addAysncTask());
  }

  if (!options.credentials) {
    options.credentials = "include";
    // 临时调试用 options.credentials = 'same-origin';
  }

  console.log("开始请求-", url, options);

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => response.json())
      .then(json => {
        if (options.loading) {
          store.dispatch(removeAysncTask());
        }

        if ("error_code" in json && json.error_code === 0) {
          if (options.successWords) {
            Alert.success(options.successWords);
          }
          console.log("请求成功-", url, json);
          resolve(json);
        } else if (json.error_code === 9999 && options.noRedirect !== true) {
          let from = window.location.pathname;
          store.dispatch(storeLoginSource(from));
          history.replace("/my/login");
        } else {
          console.log("请求返回失败-", url, json);

          if (options.noRedirect !== true) {
            Alert.error(`请求失败: ${json.error_message}`);
          }

          reject(json);
        }
      })
      .catch(error => {
        if (options.loading) {
          store.dispatch(removeAysncTask());
        }

        Alert.error(`请求发送失败：${error}`);
        console.log("请求失败-", url, error);
        reject(error);
      });
  });


}
