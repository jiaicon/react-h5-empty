/**
 * @file 个人设置
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './setting.css';

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
            <div> 修改密码</div>
            <div className="page-setting-icon" />
          </div>

        </Link>
        <div className="page-setting-quit">退出登录</div>


      </div>
    );
  }
}


Setting.title = '个人中心';

Setting.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Setting);
