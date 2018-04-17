/**
 * @file 注册
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Link from '../../../components/link/link';
import history from '../../history';
import { requestVerifyCode, register } from './register.store';


import Avatar from '../../../components/avatar/avatar';
import { API_HOST } from '../../../utils/config';

import './register.css';
import uploadToWX from '../../../utils/wxupload';


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
    //realRegister: 1  实名注册， 0  非实名注册
    this.realRegister = window.orgInfo.real_name_register;
    this.state = {
      captchaUrl: `${API_HOST}/api/captcha`,
      buttonString: '获取验证码',
      timer: null,
      countDownTrigger: true,
    };
  }

  componentWillMount() {

  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { code: cCode, regis: cRegis } = this.props;
    const { code: nCode, regis: nRegis } = nextProps;

    if (cCode.fetching && !nCode.fetching && !nCode.failed) {
      this.setState({
        countDownTrigger: false,
      });
      this.onStartCountDown();
    }
    if(this.realRegister && cRegis.fetching && !nRegis.fetching && !nRegis.failed) {
      history.replace('/my/profile/verify');
    }else if(!this.realRegister && cRegis.fetching && !nRegis.fetching && !nRegis.failed) {
      history.replace('/my/login');
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
  onSubmit() {
    // realRegister 机构实名 1 要求  0 否
    let name,photo;
    if (!this.realRegister) {   //非实名
      name = this.state.name;
      photo = this.state.photo;
    }
    const phone = this.state.phone;
    const verifyCode = this.state.verifyCode;
    const password = this.state.password;
    if (!this.realRegister) {
      if (checkEmpty(name, '姓名')) {
        return;
      }
    }
    if (checkEmpty(phone, '手机号') || checkEmpty(verifyCode, '手机验证码') || checkEmpty(password, '密码')) {
      return;
    }
    if (!this.realRegister && !/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)) {
      Alert.warning('请输入正确的账号');
      return;
    }
    if (password.length <= 5) {
      Alert.warning('密码最少6位');
      return;
    }
    const data = {};
    if (!this.realRegister) {
      data.username = name;
    }

    data.pwd = password;
    data.phone = phone;
    data.verify_code = verifyCode;
    if (photo!=undefined && photo != '') {
      console.log('photo: '+photo);
      data.avatars = photo;
    }
    this.props.register(data);
  }
  onSend() {
    const phone = this.state.phone;
    const captcha = this.state.captcha;
    const countDownTrigger = this.state.countDownTrigger;
    const data = {};
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
    let timer = this.state.timer;
    let num = 60;
    const that = this;
    this.setState({
      ...this.state,
      buttonString: num,
      countDownTrigger: false,
    });
    timer = setInterval(() => {
      num -= 1;
      that.setState({
        buttonString: num,
        timer,
      });
      if (num === 0) {
        clearInterval(timer);
        that.setState({
          ...this.state,
          buttonString: '获取验证码',
          timer: null,
          countDownTrigger: true,
        });
      }
    }, 1000);
  }
  onTextChanged() {
    let name = '';
    if(!this.realRegister) {
      name = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
      this.setState({
        name
      })
    }
    const phone = this.userphone.value.replace(/(^\s+)|(\s+$)/g, '');
    const verifyCode = this.usercode.value.replace(/(^\s+)|(\s+$)/g, '');
    const captcha = this.captcha.value.replace(/(^\s+)|(\s+$)/g, '');
    const password = this.userpassword.value.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      ...this.state,

      captcha,
      phone,
      verifyCode,
      password
    });
  }
  // 上传照片
  onAvatarClick() {
    uploadToWX({
      success: (urls) => {
        this.setState({
          ...this.state,
          photo: urls[0],
        });
        this.photo = urls[0];
      },
    });
  }
  refreshCaptcha() {
    this.setState({
      ...this.state,
      captchaUrl: `${API_HOST}/api/captcha?t=${Date.now()}`,
    });
  }
  render() {
    return (
      <div className="page-register">
        {
          this.realRegister && this.realRegister === 1 ?  null:
          <div className="page-register-photo">
            <div className="page-register-photo-container" onClick={this.onAvatarClick}>
              <Avatar src={this.state.photo} size={{ width: 80 }} defaultSrc="/images/my/register.png" />
            </div>
          </div>
        }
        {
          this.realRegister && this.realRegister === 1 ?  '':
            <div className="page-register-photo-fonts">上传头像(选填)</div>
        }

        <ul className={this.realRegister?'realRegisterUl': ''}>
          {this.realRegister
            ? null :
            <li>
              <div className="page-register-item">
                <span className="page-register-fonts">昵称</span>
                <input className="page-register-input" type="text" ref={(c) => { this.username = c; }} onKeyUp={this.onTextChanged} />
              </div>
              <div className="line1px" />
            </li>
          }
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
              <img className="page-register-code" src={this.state.captchaUrl} onClick={this.refreshCaptcha} alt="" />
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
        <div className="page-register-submmit" onClick={this.onSubmit}>注册</div>
        <Link to="/my/login">
          <div className="page-register-login">已有账号，前往登录</div>
        </Link>
        <div className="page-register-agree">
          提交代表已阅读
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
    }),
  }),
  regis: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
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
