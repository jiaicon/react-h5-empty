/**
 * @file 手机号绑定/邮箱
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_HOST } from '../../../utils/config';
import history from '../../history';
import { } from './profile.store';
import './bind.css';

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`请填写${label}`);
    return true;
  }

  return false;
}
class BindInfo extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    const type = this.props.route.params.type;
    this.state = ({
      type,
      captchaUrl: `${API_HOST}/api/captcha`,
      buttonString: '获取验证码',
      timer: null,
      countDownTrigger: true,
    });
  }


  componentWillMount() {
    console.log(this.props.route);
    console.log(this.state.type);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

    // if (Cperson.fetching && !Nperson.fetching && !Nperson.failed) {
    //   history.replace('/my/profile/detail/user');
    // }
  }
  componentWillUnmount() {
    const timer = this.state.timer;
    clearInterval(timer);
    this.setState({
      buttonString: '获取验证码',
      timer: null,
    });
  }
  onTextChanged() {
    const phone = this.userphone.value.replace(/(^\s+)|(\s+$)/g, '');
    const verifyCode = this.usercode.value.replace(/(^\s+)|(\s+$)/g, '');
    const captcha = this.captcha.value.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      ...this.state,
      captcha,
      phone,
      verifyCode,
    });
  }
  onSubmit() {
    const phone = this.state.phone;
    const verifyCode = this.state.verifyCode;
    if (checkEmpty(phone, '手机号') || checkEmpty(verifyCode, '手机验证码')) {
      return;
    }
    const data = {};
    data.phone = phone;
    data.verify_code = verifyCode;
    // this.props.register(data);
  }
  onSend() {
    const phone = this.state.phone;
    const captcha = this.state.captcha;
    const countDownTrigger = this.state.countDownTrigger;
    const data = {};
    if (checkEmpty(phone, '手机号') || checkEmpty(captcha, '图片验证码')) {
      return;
    }
    if (phone && captcha) {
      if (countDownTrigger === true) {
        data.phone = phone;
        data.captcha_code = captcha;
        // this.props.requestVerifyCode(data);
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
  refreshCaptcha() {
    this.setState({
      ...this.state,
      captchaUrl: `${API_HOST}/api/captcha?t=${Date.now()}`,
    });
  }
  bindPhoneview() {
    return (
      <div className="page-profile-bind-info-container">
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">手机号</span>
          <input className="page-profile-bind-info-container-input" type="tel" ref={(c) => { this.userphone = c; }} onKeyUp={this.onTextChanged} maxLength="11" />
        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">图片码</span>
          <input className="page-profile-bind-info-container-input" ref={(c) => { this.captcha = c; }} type="text" onKeyUp={this.onTextChanged} />
          <img className="page-profile-bind-info-container-code" src={this.state.captchaUrl} onClick={this.refreshCaptcha} alt="" />
        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">验证码</span>
          <input className="page-profile-bind-info-container-input" type="number" ref={(c) => { this.usercode = c; }} onKeyUp={this.onTextChanged} />
          <div className="page-profile-bind-info-container-code" onClick={this.onSend}>{this.state.buttonString}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-submmit" onClick={this.onSubmit}>确认提交</div>
      </div>
    );
  }
  onTextMailChanged() {
    const mail = this.mail.value.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      ...this.state,
      mail,
    });
  }
  onMailSubmit() {
    const mail = this.state.mail;
    const data = {};
    if (mail && !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(mail)) {
      Alert.warning('请输入合法的邮箱地址');
      return;
    }
    console.log(11);
  }
  bindMailview() {
    return (
      <div className="page-profile-bind-info-container">
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">邮箱</span>
          <input className="page-profile-bind-info-container-input" type="email" ref={(c) => { this.mail = c; }} onKeyUp={this.onTextMailChanged} />

        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-submmit" onClick={this.onMailSubmit}>确认提交</div>
      </div>
    );
  }

  render() {
    // const data = this.state.data;
    return (
      <div className="page-profile-bind-container">
        {this.state.type == 'phone' ? this.bindPhoneview() : this.bindMailview()}
      </div>
    );
  }
}


BindInfo.title = '个人信息绑定';
BindInfo.propTypes = {

};

export default connect(
  state => ({

  }),
  dispatch => bindActionCreators({ }, dispatch),
)(BindInfo);