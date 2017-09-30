/**
 * @file 忘记
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './forget.css';

class Forget extends React.Component {

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
      <div className="page-forget">
        <div className="page-forget-top">修改密码</div>
        <div className="page-forget-item">
          <span className="page-forget-fonts">手机号</span>
          <input className="page-forget-input" type="number" maxLength="11" />
        </div>
        <div className="page-forget-item">
          <span className="page-forget-fonts">验证码</span>
          <input className="page-forget-input" type="number" />
          <div className="page-forget-code">获取验证码</div>
        </div>
        <div className="page-forget-item">
          <span className="page-forget-fonts">新密码</span>
          <input className="page-forget-input" type="password" />
        </div>

        <div className="page-forget-submmit">确认修改</div>
      </div>
    );
  }
}

Forget.title = '忘记密码';

Forget.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Forget);
