import Alert from 'react-s-alert';
import { API_PREFIX } from './config';
import { addAysncTask, removeAysncTask } from '../stores/common';
import store from '../stores';
import history from '../pages/history';
import { getLocation } from './funcs';


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
  const headers = options.headers || {};
  const location = localStorage.location ? JSON.parse(localStorage.location) : null;
  options.headers = {
    ...headers,
    // 授权 token
    'X-auth-token': window.token || '',
    // 机构代码
    'X-org-code': window.ortCode || 'XKdwpfgegW',
    // 经纬度 经度-纬度
    'X-location': location ?
      `${location.lng}-${location.lat}` : '116.314820-40.065560',
    'X-unique-key': window.uniqueKey || 'demo',
  };
  // 自定义头必须设置 mode 为 cors
  options.mode = 'cors';

  // 处理 data，仅支持一层结构，支持上传数组数据，例如{url:['1','2']} 会转换为 url[]=1&&url[]=2
  const data = options.data || {};
  const keys = Object.keys(data);
  const params = [];

  keys.forEach((key) => {
    const value = data[key];

    if (value !== undefined) {
      if (!Array.isArray(value)) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      } else {
        value.forEach(v => params.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`));
      }
    }
  });

  if (options.method === 'POST') {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    options.body = params.join('&');
  } else {
    url = `${url}?${params.join('&')}`;
  }

  if (options.loading) {
    store.dispatch(addAysncTask());
  }

  if (!options.credentials) {
    options.credentials = 'include';
    // 临时调试用
    // options.credentials = 'same-origin';
  }

  console.log('开始请求-', url, options);

  return new Promise((resolve, reject) => {
    getLocation(() => {
      fetch(url, options)
      .then(response => response.json())
      .then((json) => {
        if (options.loading) {
          store.dispatch(removeAysncTask());
        }

        if (('error_code' in json) && json.error_code === 0) {
          if (options.successWords) {
            Alert.success(options.successWords);
          }
          console.log('请求成功-', url, json);
          resolve(json);
        } else if (json.error_code === 9999) {
          history.replace('/my/entry');
        } else {
          console.log('请求返回失败-', url, json);
          Alert.error(`请求失败: ${json.error_message}`);

          reject(json);
        }
      })
      .catch((error) => {
        if (options.loading) {
          store.dispatch(removeAysncTask());
        }

        Alert.error(`请求发送失败：${error}`);
        console.log('请求失败-', url, error);
        reject(error);
      });
    }, () => Alert.error('定位失败，请确认同意微信定位授权'));
  });

  // TODO: 如果没有经纬度信息则需要调用微信 JSSDK 获取经纬度之后再发起请求，对调用者透明
  // return fetch(url, options)
  //           .then(response => response.json())
  //           .then((json) => {
  //             store.dispatch(removeAysncTask());

  //             if (('error_code' in json) && json.error_code === 0) {
  //               if (options.successWords) {
  //                 Alert.success(options.successWords);
  //                 console.log('请求成功-', json);
  //               }
  //               return json;
  //             }

  //             console.log('请求返回失败-', json);
  //             Alert.error('请求发送失败');

  //             return Promise.reject(json);
  //           })
  //           .catch((error) => {
  //             // store.dispatch(removeAysncTask());
  //             Alert.error(`请求发送失败：${error}`);
  //             console.log('请求失败-', error);
  //           });
}
