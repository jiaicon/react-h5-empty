/**
 * @file 个人设置
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './setting.css';
import { logoutAction } from '../login/login.store';

class Setting extends React.Component {

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
      <div className="page-setting">
        <Link to="/my/forget">
          <div className="page-setting-forget">
            <div className="page-setting-fonts">修改密码</div>
            <div className="page-setting-icon" />
          </div>

        </Link>
        <a className="page-setting-quit" onClick={this.props.logoutAction}>退出登录</a>
      </div>
    );
  }
}


Setting.title = '个人中心';

Setting.propTypes = {
  logoutAction: React.PropTypes.func,
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({ logoutAction }, dispatch),
)(Setting);
