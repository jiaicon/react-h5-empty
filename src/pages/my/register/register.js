/**
 * @file 注册
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Link from '../../../components/link/link';
import history from '../../history';
import { requestVerifyCode, register } from './register.store';

import './register.css';
import Image from '../../../components/image/image';

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`请填写${label}`);
    return true;
  }

  return false;
}

// captchaUrl: `${window.apiHost}/api/captcha/app?t=${Date.now()}`,
class Register extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      captchaUrl: 'http://alpha.api.volunteer.tmallwo.com/api/captcha',
      buttonString: '获取验证码',
      timer: null,
      countDownTrigger: true,
    };
  }
  refreshCaptcha=() => {
    this.setState({
      ...this.state,
      captchaUrl: `http://alpha.api.volunteer.tmallwo.com/api/captcha?t=${Date.now()}`,
    });
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { code: cCode, regis: cRegis } = this.props;
    const { code: nCode, regis: nRegis } = nextProps;
    const countDownTrigger = this.state.countDownTrigger;

    if (cCode.fetching && !nCode.fetching && !nCode.failed) {
      this.setState({
        countDownTrigger: false,
      });
      this.onStartCountDown();
    }
    if (cRegis.fetching && !nRegis.fetching && !nRegis.failed) {
      history.push('/my/login');
    }
  }

  componentWillUnmount() {
    const timer = this.state.timer;
    clearInterval(timer);
    this.setState({
      buttonString: '获取验证码',
      timer: null,
    });
  }
  onSubmit =() => {
    const name = this.state.name;
    const phone = this.state.phone;
    const verifyCode = this.state.verifyCode;
    const password = this.state.password;
    const agreement = this.state.agreement;
    const photo = this.state.photo;
    if (checkEmpty(name, '姓名') || checkEmpty(phone, '手机号') || checkEmpty(verifyCode, '手机验证码') || checkEmpty(password, '密码')) {
      return;
    }
    if (!agreement) {
      Alert.warning('请确认已阅读《志多星协议》');
      return;
    }
    if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)) {
      Alert.warning('请输入正确的用户名');
      return;
    }
    if (password.length <= 5) {
      Alert.warning('密码最少6位');
      return;
    }
    const data = {};
    data.username = name;
    data.pwd = password;
    data.phone = phone;
    data.verify_code = verifyCode;
    if (photo) {
      data.avatars = photo;
    }
    this.props.register(data);
  }
  onSend=() => {
    const phone = this.state.phone;
    const captcha = this.state.captcha;
    const countDownTrigger = this.state.countDownTrigger;
    const data = {};
    console.log(this.props);
    if (phone && captcha) {
      if (countDownTrigger === true) {
        data.phone = phone;
        data.captcha_code = captcha;
        this.props.requestVerifyCode(data);
      } else {
        Alert.warning('同一时间内不能多次点击');
        
      }
    } else if (!phone) {
      Alert.warning('请输入手机号');
    } else {
      Alert.warning('请输入验证码');
    }
  }

  onStartCountDown() {
    const buttonString = this.state.buttonString;
    const countDownTrigger = this.state.countDownTrigger;
    let timer = this.state.timer;
    let num = 60;
    const that = this;
    this.setState({
      ...this.state,
      buttonString: num,
      countDownTrigger: false,
    });
    timer = setInterval(() => {
      num--;
      that.setState({
        buttonString: num,
        timer,
      });
      if (num === 0) {
        clearInterval(timer);
        that.setState({
          ...this.state,
          buttonString: '发送',
          timer: null,
          countDownTrigger: true,
        });
      }
    }, 1000);
  }
  onTextChanged =() => {
    const name = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
    const phone = this.userphone.value.replace(/(^\s+)|(\s+$)/g, '');
    const verifyCode = this.usercode.value.replace(/(^\s+)|(\s+$)/g, '');
    const captcha = this.captcha.value.replace(/(^\s+)|(\s+$)/g, '');
    const password = this.userpassword.value.replace(/(^\s+)|(\s+$)/g, '');
    const agreement = this.checkbox.checked;
    console.log(phone);
    this.setState({
      ...this.state,
      agreement,
      captcha,
      name,
      phone,
      verifyCode,
      password,
    });
  }
  // 上传照片
  onFileSelect=(evt) => {
    const file = evt.target.files[0];
    console.log(file);
    if (file) {
      const fd = new FormData();
      fd.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);

          if (!res.error_code) {
            this.setState({
              ...this.state,
              photo: res.data.url,
            });
            this.photo = res.data.url;
          } else {
            Alert.warning(`图片上传失败：${res.error_message}`);
          }
        }
      };
      // xhr.open('POST', `${window.apiHost}/api/imgupload`, true);
      xhr.open('POST', 'http://alpha.api.volunteer.tmallwo.com/api/imgupload', true);
      xhr.send(fd);
    }
  }

  render() {
    return (
      <div className="page-register">
        <div className="page-register-photo">
          <div className="page-register-photo-container">
            <Image src={this.state.photo} className="page-register-photo-img" />

            <input ref={(c) => { this.uploader = c; }} onChange={this.onFileSelect} type="file" accept="image/jpeg,image/png,image/gif" className="page-register-uploader-btn" />
          </div>
        </div>
        <div className="page-register-photo-fonts">上传头像(选填)</div>
        <ul>
          <li>
            <div className="page-register-item">
              <span className="page-register-fonts">用户名</span>
              <input className="page-register-input" type="text" ref={(c) => { this.username = c; }} onKeyUp={this.onTextChanged} />
            </div>
            <div className="line1px" />
          </li>
          <li>
            <div className="page-register-item">
              <span className="page-register-fonts">手机号</span>
              <input className="page-register-input" type="tel" ref={(c) => { this.userphone = c; }} onKeyUp={this.onTextChanged} maxLength="11" />
            </div>
            <div className="line1px" />
          </li>
          <li>
            <div className="page-register-item">
              <span className="page-register-fonts">图片码</span>
              <input className="page-register-input" ref={(c) => { this.captcha = c; }} type="text" onKeyUp={this.onTextChanged} />
              <img className="page-register-code" src={this.state.captchaUrl} onClick={this.refreshCaptcha} />
            </div>
            <div className="line1px" />
          </li>
          <li>
            <div className="page-register-item">
              <span className="page-register-fonts">验证码</span>
              <input className="page-register-input" type="number" ref={(c) => { this.usercode = c; }} onKeyUp={this.onTextChanged} />
              <div className="page-register-code" onClick={this.onSend}>{this.state.buttonString}</div>
            </div>
            <div className="line1px" />
          </li>
          <li>
            <div className="page-register-item">
              <span className="page-register-fonts">设置密码</span>
              <input className="page-register-input" type="password" ref={(c) => { this.userpassword = c; }} onKeyUp={this.onTextChanged} maxLength="20" minLength="6" />
            </div>
            <div className="line1px" />
          </li>
        </ul>
        <div className="page-register-submmit" onClick={this.onSubmit}>确认提交</div>
        <div className="page-register-agree">
          <input type="checkbox" onClick={this.onTextChanged} className="page-register-checkbox" ref={(c) => { this.checkbox = c; }} />
          我已阅读并授权
          <Link to="/my/agree">
            <span className="page-register-agreement">《志多星用户协议》</span>
          </Link>
        </div>
      </div>
    );
  }
}

Register.title = '注册';

Register.propTypes = {
  requestVerifyCode: PropTypes.func,
  register: PropTypes.func,
  code: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
      // TODO:

    }),
  }),
  regis: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
      // TODO:
      id: PropTypes.number,
      token: PropTypes.string,
    }),
  }),

};
export default connect(
  state => ({
    code: state.register.code,
    regis: state.register.register,
  }),
  dispatch => bindActionCreators({ requestVerifyCode, register }, dispatch),
)(Register);
