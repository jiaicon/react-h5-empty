import queryString from 'query-string';
import fetch from '../../../utils/fetch';


export const joinPayProject = data => (dispatch) => {
    // type: 'PROJECT_PAY_JOIN',
    // payload: 
    fetch(`/project/join/${data.id}`, {
      data,
    }).then((json) => {
        alert(JSON.stringify('json.data'))
        if (json.data.jsConfig) {
            wx.config(json.data.jsConfig);
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
                  dispatch({ type: 'PROJECT_PAY_JOIN_PENDING' });
                  dispatch({ type: 'PROJECT_PAY_JOIN_FULFILLED', data: json.data });
                  Alert.success('支付成功');
              
                },
                fail(res) {
                  Alert.warning('支付失败');
                  console.log(res);
                },
                complete(res) {
  
                },
              });
            });
            dispatch({ type: 'PROJECT_PAY_JOIN_FULFILLED', payload: json.data });
          }else{
            dispatch({ type: 'PROJECT_PAY_JOIN_FULFILLED', payload: json.data });
          }
      }).catch((e) => {
        dispatch({ type: 'PROJECT_PAY_JOIN_REJECTED' });
      })
    
}

  export default (state = {
    fetching: false,
    failed: false,
    data: null,
    projectId: null,
  }, action) => {
    switch (action.type) {
        case 'PROJECT_PAY_JOIN_PENDING':
        return {
          ...state,
          fetching: true,
          failed: false,
        };
      case 'PROJECT_PAY_JOIN_FULFILLED':
        return {
          ...state,
          fetching: false,
          failed: false,
          data: action.data,
          projectId:action.payload.data.id,
        };
      case 'PROJECT_PAY_JOIN_REJECTED':
        return {
          ...state,
          fetching: false,
          failed: true,
        };
      default:
        return state;
    }
  };