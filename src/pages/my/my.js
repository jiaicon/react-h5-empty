/**
 * @file 个人中心入口页面
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../components/link/link';
import WXShare from '../../components/share';
import './my.css';

class MyPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-profile">
        <h1>个人中心</h1>
        <div>头像,昵称,志愿口号</div>
        <div>团队，项目，时长</div>
        <div>
          <ul className="">
            <li><Link to="/">个人资料</Link></li>
            <li><Link to="/signin">我的证书</Link></li>
            <li><Link to="/my">我的家庭</Link></li>
            <li><Link to="/">我的收藏</Link></li>
            <li><Link to="/signin">服务中心</Link></li>
            <li><Link to="/my">设置(修改密码,退出登录)</Link></li>
          </ul>
        </div>

      </div>
    );
  }
}


MyPage.title = '个人中心';

MyPage.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(MyPage);
