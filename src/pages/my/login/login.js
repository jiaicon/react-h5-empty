/**
 * @file 登录
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-login">
        <div className="page-login-header" />
        <div className="page-login-item">
          <input type="text" placeholder="用户名或手机号" className="page-login-item-input" />
        </div>
        <div className="page-login-item">
          <input type="text" placeholder="输入密码" className="page-login-item-input" />
        </div>
        <div className="page-login-forget">
          <Link to="/my/forget">
            <span className="page-login-forget-item">忘记密码</span>
          </Link>
        </div>
        <div className="page-login-entry ">登录</div>
      </div>
    );
  }
}

Login.title = '登录';

Login.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Login);
