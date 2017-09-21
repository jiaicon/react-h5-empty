import {API_PREFIX} from './config'
import Alert from 'react-s-alert';
import {addAysncTask, removeAysncTask} from '../stores/common'
import store from '../stores'


export default function request(url, options) {
    if (url.indexOf('http') !== 0) {
        url = API_PREFIX + url;
    }

    if (!options.method) {
        options.method = 'POST';
    }

    if (options.loading !== false) {
      options.loading = true;
    }
    
    if (options.method === 'POST') {
        // 处理 data，仅支持一层结构，支持上传数组数据，例如{url:['1','2']} 会转换为 url[]=1&&url[]=2
        let data = options.data || {}
        let keys = Object.keys(data)
        let fd = new FormData()

        keys.forEach(key=>{
            let value = data[key]

            if (!Array.isArray(value)) {
                fd.append(key, value)
            }
            else {
                value.forEach(v=>fd.append(`${key}[]`, v));
            }
        });

        if (options.token !== false && window.token) {
            fd.append('token', window.token)
        }

        options.body = fd
    }

    if (options.loading) {
        store.dispatch(addAysncTask())
    }

    if (options.credentials) {
        options.credentials = 'include'
    }

    return fetch(url, options)
            .then(response => response.json())
            .then(json => {
                if (('error_code' in json) && json.error_code !== 0) {
                    Alert.warning(`操作失败：${json.error_message || '未知错误'}`)
                }

                store.dispatch(removeAysncTask())
                return json
            })
            .catch(error => {
                store.dispatch(removeAysncTask())
                Alert.error(`请求发送失败：${error}`)
            })
}