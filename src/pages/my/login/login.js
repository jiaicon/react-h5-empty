/**
 * @file 登录
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../history';
import Link from '../../../components/link/link';
import './login.css';
import { loginAction } from './login.store';
import Avatar from '../../../components/avatar/avatar';


class Login extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { login: cLogin } = this.props;
    const { login: nLogin } = nextProps;
    if (cLogin.fetching && !nLogin.fetching && !nLogin.failed) {
      let target = '/my';
      const { from } = nLogin;

      // 如果登录状态设置了来源（例如从签到页跳转而来）则登录成功后需要跳转回去
      if (from) {
        target = from;
      }
      history.replace(target);
    }
  }

  componentWillUnmount() {}

  onTextChanged() {
    const username = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
    const pwd = this.pwd.value.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      username,
      pwd,
    });
  }
  submit() {
    const username = this.state.username;
    const pwd = this.state.pwd;
    const data = {};
    data.username = username;
    if (pwd.length <= 5 || pwd.length >= 19) {
      Alert.warning('密码范围6-20位数字字母组成');
      return;
    }
    data.pwd = pwd;
    this.props.loginAction(data);
  }
  render() {
    return (
      <div className="page-login">
        <Avatar size={{ width: 80 }} defaultSrc="/images/my/logo.png" />

        <div className="page-login-item">
          <input type="text" ref={(c) => { this.username = c; }} onKeyUp={this.onTextChanged} placeholder="用户名或手机号" className="page-login-item-input" />
        </div>
        <div className="page-login-item">
          <input type="password" ref={(c) => { this.pwd = c; }} onKeyUp={this.onTextChanged} placeholder="输入密码" className="page-login-item-input" />
        </div>
        <div className="page-login-forget">
          <Link to="/my/forget">
            <span className="page-login-forget-item">忘记密码</span>
          </Link>
        </div>
        <div className="page-login-entry " onClick={this.submit}>登录</div>
      </div>
    );
  }
}

Login.title = '登录';

Login.propTypes = {
  loginAction: PropTypes.func,
  login: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    from: PropTypes.string,
    data: PropTypes.shape({
      // TODO:接收回来
      token: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string,
      phone: PropTypes.string,
      avatars: PropTypes.string,
      real_name: PropTypes.string,
      nation: PropTypes.string,
      sex: PropTypes.number,
      birthday: PropTypes.string,
      identifier: PropTypes.string,
      slogan: PropTypes.string,
      reward_time: PropTypes.string,
      id_number: PropTypes.string,
      province_id: PropTypes.number,
      province_name: PropTypes.string,
      city_id: PropTypes.number,
      city_name: PropTypes.string,
      county_id: PropTypes.number,
      county_name: PropTypes.string,
      addr: PropTypes.string,
      family_id: PropTypes.number,
      join_family_time: PropTypes.string,
      good_at: PropTypes.arrayOf(PropTypes.shape({

      })),
    }),
  }),


};

export default connect(
  state => ({
    login: state.login.login,
  }),
  dispatch => bindActionCreators({ loginAction }, dispatch),
)(Login);
