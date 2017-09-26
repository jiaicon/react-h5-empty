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
      <div className="page-my">
        <div className="page-my-header">
          <img className="page-my-header-setting" src="/images/my/my_header_setting.png" alt="setting" />
          <div>
            <div className="page-my-header-messages-container">
              <span className="page-my-header-messages-red-point">.</span>
            </div>
          </div>
        </div>
        <div className="page-my-photo-container">
          <div className="page-my-photo-background">
            <img src="/images/my/0.jpg" alt="images" className="page-my-photo" />
          </div>
          <div className="page-my-user-info">
            <p className="page-my-user-info-nick">用户昵称</p>
            <p className="page-my-user-info-signature">努力做好每一个活动</p>
          </div>
        </div>
        <div>团队，项目，时长</div>
        <div>
          <ul className="page-my-item-container">
            <li><Link to="/my/profile">个人资料</Link></li>
            <li><Link to="/my/certificate">我的证书</Link></li>
            <li><Link to="/my/family">我的家庭</Link></li>
            <li><Link to="/my/collects">我的收藏</Link></li>
            <li><Link to="/my/service">服务中心</Link></li>
            <li><Link to="/my/setting">设置(修改密码,退出登录)</Link></li>
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
