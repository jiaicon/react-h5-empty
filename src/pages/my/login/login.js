/**
 * @file 登录
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../history';
import Link from '../../../components/link/link';
import './login.css';
import { loginAction } from './login.store';


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
    console.log(this.props.login);
    console.log(nextProps.login);
    if (cLogin.fetching && !nLogin.fetching && !nLogin.failed) {
      history.push('/my');
    }
  }

  componentWillUnmount() {}

  onTextChanged=() => {
    const username = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
    const pwd = this.pwd.value.replace(/(^\s+)|(\s+$)/g, '');
    console.log(pwd);
    this.setState({
      username,
      pwd,
    });
  }
  submit=() => {
    const username = this.state.username;
    const pwd = this.state.pwd;
    const data = {};
    data.username = username;
    data.pwd = pwd;
    this.props.loginAction(data);
  }
  render() {
    return (
      <div className="page-login">
        <div className="page-login-header" />
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
      birthday: PropTypes.number,
      identifier: PropTypes.string,
      slogan: PropTypes.string,
      reward_time: PropTypes.number,
      id_number: PropTypes.number,
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
