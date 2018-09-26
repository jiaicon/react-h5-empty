/**
 * @file 个人中心入口页面
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../history';

import { userCenterAction } from './my.store';
import { requestUserInfo } from '../../stores/common';
import Link from '../../components/link/link';
import Star from '../../components/star/star';
import './my.css';
import Avatar from '../../components/avatar/avatar';

// 机构码
const orgCode = window.orgCode;
const scoreName = window.orgInfo.score_name;

class MyPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestUserInfo();
    this.props.userCenterAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  renderPageMymessagesTemplate() {
    return (
      <div className="page-my-header-messages-container">
        {this.props.usercenter.data === null ?
          <span /> :
          <span
            className={classnames({
              'page-my-header-messages-red-point': this.props.usercenter.data.msg_count >= 1,
            })
          }
          />
        }
      </div>
    );
  }
  onPreview(e) {
    var key = e.target.getAttribute("data-key");
    var arr =[];
    arr.push(key);
    wx.ready(() => {
      wx.previewImage({
        current: key, // 当前显示图片的http链接
        urls: arr, // 需要预览的图片http链接列表
      });
    });
  }
  renderPageMyphotoTemplate() {
    const { user } = this.props;
    return (
      <div className="page-my-photo-container">
        <Avatar src={user.avatars ? user.avatars : ''} 
        data-key={user.avatars||''} size={{ width: 80, radius: 8 }} 
        defaultSrc="/images/my/register.png"  onClick={this.onPreview}/>
        <div className="page-my-user-info">
          <p className="page-my-user-info-nick">{user.real_name || user.username || '未设置昵称'}</p>
          <p className="page-my-user-info-signature">{ user.slogan || '未设置口号'}</p>
          <div className="page-my-user-info-star">
          {
            user.stars? <Star size={{width:15,height:14,score:user.stars}} isBlockEmptyStar/>:null
          }
       
          </div>
        </div>
      </div>
    );
  }
  renderPageMyRecordTemplate() {
    const { user } = this.props;
    return (
      <div className="page-my-record-container">

        <Link to="/my/teams">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.team_count }</b>个</p>
            <p className="page-my-record-item-bottom">我的团队</p>
          </div>
        </Link>

        <Link to="/my/projects">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.project_count}</b>个</p>
            <p className="page-my-record-item-bottom">我的项目</p>
          </div>
        </Link>
        <Link to="/my/duration">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.user.reward_time}</b>小时</p>
            <p className="page-my-record-item-bottom">志愿时长</p>
          </div>
        </Link>
        {/* <!-- 积分入口 --> */}
        <Link to="/my/point">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.user.score}</b> {scoreName || '星币'}</p>
            <p className="page-my-record-item-bottom">志愿{scoreName ||  '星币'}</p>
          </div>
        </Link>
      </div>
    );
  }
  renderPageMyTop() {
    const { user } = this.props;
    return (
      <div>
        {/*<div className="page-my-header">*/}

          {/*<Link to="/my/setting">*/}
            {/*<div className="page-my-header-setting" />*/}
          {/*</Link>*/}

          {/*<Link to="/my/messages">*/}
            {/*{this.renderPageMymessagesTemplate()}*/}
          {/*</Link>*/}

        {/*</div>*/}

        <div>
          {this.renderPageMyphotoTemplate()}
        </div>
        {this.renderPageMyRecordTemplate()}
      </div>
    );
  }
  renderPageMyContainer() {
    const { user } = this.props;
    return (
      <ul className="page-my-item-container">
        <li>
          <div>
            <Link to="/my/circle">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-circle" >
                  {this.props.usercenter.data === null ?
                    <span /> :
                    <span
                      className={classnames({
                        'page-my-item-icon-circle-red-point': this.props.usercenter.data.comment_count >= 1,
                      })
                  }
                    />
                }

                </i>我的志愿圈
          </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>

        <li>
          <div>
            <Link to="/my/messages">
              <div className="page-my-item-box">
                  {this.renderPageMymessagesTemplate()}
                我的消息
                {/*<i className="page-my-item-icon page-my-item-icon-news" />我的消息*/}
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>

        <li>
          <div>
            <Link to="/my/profile/detail/user">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-data" />个人资料
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>
        <li>
          <div onClick={this.hasntIdnumber}>
            <Link to="/my/certificate">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-certificate" />我的证书
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>
        <li>
          <div>
            <Link to="/my/family">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-family" />我的家庭
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>
        <li>
          <div>
            <Link to="/my/collects">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-like" />我的收藏
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>
        <li>
          <div>
            <Link to="/my/duration/applys">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-applys" />补录时长
            </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>
        {
          orgCode === 'wMvbmOeYAl' ?
            <li /> :
            <li>
              <div>
                <Link to="/my/service">
                  <div className="page-my-item-box">
                    <i className="page-my-item-icon page-my-item-icon-service" />服务中心
               </div>
                  <span className="page-my-item-big" />
                </Link>
              </div>
            </li>
        }
        <li>
          <div>
            <Link to="/my/setting">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-setting" />设置
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        </li>
      </ul>
    );
  }
  render() {
    return (
      <div className="page-my">
        <div className="page-my-top">
          {this.renderPageMyTop()}
        </div>
        <div className="page-my-line" />
        <div className="page-my-item-container-padding" >
          {this.renderPageMyContainer()}

        </div>

      </div>
    );
  }
}


MyPage.title = '个人中心';

MyPage.propTypes = {
  userCenterAction: PropTypes.func,
  requestUserInfo: PropTypes.func,
  user: PropTypes.shape({
    data: PropTypes.shape({
      isLogin: PropTypes.bool,
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
      id_number: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
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
  usercenter: PropTypes.shape({
    data: PropTypes.shape({
      msg_count: PropTypes.number,
      project_count: PropTypes.number,
      team_count: PropTypes.number,
      user: PropTypes.shape({
        addr: PropTypes.string,
        avatars: PropTypes.string,
        birthday: PropTypes.string,
        province_id: PropTypes.number,
        province_name: PropTypes.string,
        city_id: PropTypes.number,
        city_name: PropTypes.string,
        county_id: PropTypes.number,
        county_name: PropTypes.string,
        token: PropTypes.string,
        good_at: PropTypes.arrayOf(PropTypes.shape({

        })),
        family_id: PropTypes.number,
        id: PropTypes.number,
        id_number: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        identifier: PropTypes.string,
        join_family_time: PropTypes.string,
        nation: PropTypes.string,
        phone: PropTypes.string,
        real_name: PropTypes.string,
        reward_time: PropTypes.string,
        sex: PropTypes.number,
        slogan: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  }),

};

export default connect(
  state => ({
    usercenter: state.my.usercenter,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    userCenterAction,
    requestUserInfo },
    dispatch),
)(MyPage);
