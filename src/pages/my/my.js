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
        <div className="page-my-top">
          <div className="page-my-header">
            <Link to="/my/setting">
              <div className="page-my-header-setting">
              设置
              </div>
            </Link>
            <div>
              <div className="page-my-header-messages-container">
                <span className="page-my-header-messages-red-point" />
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
          <div className="page-my-record-container">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">2</b>个</p>
              <p className="page-my-record-item-bottom">我的团队</p>
            </div>
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">2</b>个</p>
              <p className="page-my-record-item-bottom">我的项目</p>
            </div>
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">12</b>小时</p>
              <p className="page-my-record-item-bottom">志愿时长</p>
            </div>
          </div>
        </div>
        <div className="page-my-line" />
        <div className="page-my-item-container-padding">
          <ul className="page-my-item-container">
            <li>
              <Link to="/my/profile">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-data" />个人资料
                </div>
                <span className="page-my-item-big">&gt;</span>
              </Link>
            </li>
            <li>
              <Link to="/my/certificate">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-certificate" />我的证书
                </div>
                <span className="page-my-item-big">&gt;</span>
              </Link>
            </li>
            <li>
              <Link to="/my/family">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-family" />我的家庭
                </div>
                <span className="page-my-item-big">&gt;</span>
              </Link>
            </li>
            <li>
              <Link to="/my/collects">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-like" />我的收藏
                </div>
                <span className="page-my-item-big">&gt;</span>
              </Link>
            </li>
            <li>
              <Link to="/my/service">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-service" />服务中心
                </div>
                <span className="page-my-item-big">&gt;</span>
              </Link>
            </li>
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
