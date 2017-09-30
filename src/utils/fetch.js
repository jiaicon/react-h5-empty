import Alert from 'react-s-alert';
import { API_PREFIX } from './config';
import { addAysncTask, removeAysncTask } from '../stores/common';
import store from '../stores';


export default function request(requestUrl, requestOptions = {}) {
  let url = requestUrl;
  const options = { ...requestOptions };

  if (url.indexOf('http') !== 0) {
    url = API_PREFIX + url;
  }

  if (!options.method) {
    options.method = 'POST';
  }

  if (options.loading !== false) {
    options.loading = true;
  }

  // 添加默认请求头
  // 先注释，否则 PREFLIGHT 的 OPTIONS 请求返回会失败导致请求失败
  // 需要服务端进行设置，参考https://stackoverflow.com/questions/40900977/custom-request-headers-not-being-sent-with-a-javascript-fetch-request
  // const headers = options.headers || {};
  // options.headers = {
  //   ...headers,
  //   // 授权 token
  //   'X-auth-token': localStorage.TOKEN || '1',
  //   // 机构代码
  //   'X-org-code': localStorage.ORGCODE || '2',
  //   // 经纬度 经度-纬度
  //   'X-location': localStorage.LOCATIOIN || '3',
  // };
  // 自定义头必须设置 mode 为 cors
  // options.mode = 'cors';

  if (options.method === 'POST') {
    // 处理 data，仅支持一层结构，支持上传数组数据，例如{url:['1','2']} 会转换为 url[]=1&&url[]=2
    const data = options.data || {};
    const keys = Object.keys(data);
    const fd = new FormData();

    keys.forEach((key) => {
      const value = data[key];

      if (!Array.isArray(value)) {
        fd.append(key, value);
      } else {
        value.forEach(v => fd.append(`${key}[]`, v));
      }
    });

    if (options.token !== false && window.token) {
      fd.append('token', window.token);
    }

    options.body = fd;
  }

  if (options.loading) {
    store.dispatch(addAysncTask());
  }

  if (!options.credentials) {
    // options.credentials = 'include';
    // 临时调试用
    options.credentials = 'same-origin';
  }

  console.log('开始请求-', options);

  // TODO: 如果没有经纬度信息则需要调用微信 JSSDK 获取经纬度之后再发起请求，对调用者透明
  return fetch(url, options)
            .then(response => response.json())
            .then((json) => {
              if (('error_code' in json) && json.error_code !== 0) {
                Alert.warning(`操作失败：${json.error_message || '未知错误'}`);
              }

              store.dispatch(removeAysncTask());
              console.log('请求成功-', json);
              return json;
            })
            .catch((error) => {
              store.dispatch(removeAysncTask());
              Alert.error(`请求发送失败：${error}`);
              console.log('请求失败-', error);
            });
}
