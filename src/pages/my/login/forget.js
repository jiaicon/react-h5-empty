/**
 * @file 忘记
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import history from '../../history';
import './forget.css';
import { forgetAction, againVerifyCode } from './login.store';

class Forget extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      buttonString: '获取',
      timer: null,
      countDownTrigger: true,
    };
  }

  componentWillMount() {
  
 

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { code: cCode, forget: cForget } = this.props;
    const { code: nCode, forget: nForget } = nextProps;

    if (cCode.fetching && !cCode.failed && !nCode.fetching && !nCode.failed) {
      this.onStartCountDown();
      this.setState({
        countDownTrigger: false,
      });
    }

    if (cForget.fetching && !cForget.failed && !nForget.fetching && !nForget.failed) {
      window.location.replace('/my');
      // history.replace('/my');
    }
  }

  componentWillUnmount() {
    const timer = this.state.timer;
    clearInterval(timer);
    this.setState({
      buttonString: '获取',
      timer: null,
    });
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
          buttonString: '获取',
          timer: null,
          countDownTrigger: true,
        });
      }
    }, 1000);
  }
  onTextChanged() {
    const phone = this.phone.value;
    const verifyCode = this.verifyCode.value;
    const pwd = this.pwd.value;
    this.setState({
      ...this.state,
      phone,
      verifyCode,
      pwd,
    });
  }
  onSend() {
    const phone = this.state.phone;
    const countDownTrigger = this.state.countDownTrigger;
    const data = {};
    if (phone && !/^\d{11}$/.test(phone)) {
      Alert.warning('请输入合法的手机号');
      return;
    } else if (!phone) {
      Alert.warning('请输入手机号');
      return;
    }
    data.phone = phone;
    if (countDownTrigger) {
      this.props.againVerifyCode(data);
    }
  }
  onSubmit() {
    const phone = this.state.phone;
    const verifyCode = this.state.verifyCode;
    const pwd = this.state.pwd;
    const data = {
      phone,
      verify_code: verifyCode,
      pwd,
    };
    this.props.forgetAction(data);
  }
  render() {
    const { user } = this.props;
    const buttonString = this.state.buttonString;
    return <div className="page-forget">
        <div className="page-forget-top">
          {user.have_pwd === 0 ? "设置密码" : null}
          {user.have_pwd === 1 ? "修改密码" : null}
        </div>
        <div className="page-forget-item">
          <label htmlFor="phone">
            <span className="page-forget-fonts">手机号</span>
            <input className="page-forget-input" type="number" id="phone" maxLength="11" ref={c => {
                this.phone = c;
              }} onChange={this.onTextChanged} />
          </label>
        </div>
        <div className="page-forget-item">
          <label htmlFor="verifyCode">
            <span className="page-forget-fonts">验证码</span>
            <input className="page-forget-input" id="verifyCode" type="number" ref={c => {
                this.verifyCode = c;
              }} onChange={this.onTextChanged} />
          </label>
          <div className="page-forget-code" onClick={this.onSend}>
            {buttonString}
          </div>
        </div>
        <div className="page-forget-item">
          <label htmlFor="password">
            <span className="page-forget-fonts">新密码</span>
            <input className="page-forget-input" id="password" type="password" ref={c => {
                this.pwd = c;
              }} onChange={this.onTextChanged} />
          </label>
        </div>

        <div className="page-forget-submmit" onClick={this.onSubmit}>
          {user.have_pwd === 0 ? "确认设置" : null}
          {user.have_pwd === 1 ? "确认修改" : null}
        </div>
      </div>;
  }
}

Forget.title = '密码管理';

Forget.propTypes = {
  againVerifyCode: PropTypes.func,
  forgetAction: PropTypes.func,
  code: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({

    }),
  }),
  forget: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({

    }),
  }),
};

export default connect(
  state => ({
    user: state.user,
    code: state.login.code,
    forget: state.login.forget,
  }),
  dispatch => bindActionCreators({ againVerifyCode, forgetAction }, dispatch),
)(Forget);
