/**
 * @file 注册
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './register.css';

class Register extends React.Component {

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
      <div className="page-register">
        <div className="page-register-photo">
          <image className="page-register-photo-img" src="" alt="头像" />
        </div>
        <div className="page-register-photo-fonts">上传头像(选填)</div>
        <div className="page-register-item">
          <span className="page-register-fonts">用户名</span>
          <input className="page-register-input" type="text" />
        </div>
        <div className="page-register-item">
          <span className="page-register-fonts">手机号</span>
          <input className="page-register-input" type="number" />
        </div>
        <div className="page-register-item">
          <span className="page-register-fonts">验证码</span>
          <input className="page-register-input" type="number" />
          <div className="page-register-code">获取验证码</div>
        </div>
        <div className="page-register-item">
          <span className="page-register-fonts">设置密码</span>
          <input className="page-register-input" type="password" />
        </div>
        <div className="page-register-submmit">确认提交</div>
        <div className="page-register-agree">
          我已阅读并授权<span className="page-register-agreement">《志多星用户协议》</span>
        </div>
      </div>
    );
  }
}

Register.title = '注册';

Register.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Register);
