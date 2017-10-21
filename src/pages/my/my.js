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

import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';
import history from '../history';

import { userCenterAction } from './my.store';
import { requestUserInfo } from '../../stores/common';
import Link from '../../components/link/link';
import './my.css';
import Avatar from '../../components/avatar/avatar';

class MyPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      showDialog: false,
    };
    this.dialog = {
      title: '提示',
      buttons: [
        {
          type: 'default',
          label: '取消',
          onClick: () => {
            this.setState({ ...this.state, showDialog: false });
            history.replace('/my');
          },
        },
        {
          type: 'primary',
          label: '确认',
          onClick: () => {
            this.setState({ ...this.state, showDialog: false });
            history.push('/my/profile/detail/user');
          },
        },
      ],
    };
  }

  componentWillMount() {
    this.props.requestUserInfo();
    this.props.userCenterAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}
  hasntIdnumber() {
    const { user } = this.props;
    if (user.id_number) {
      history.push('my/certificate');
    } else {
      this.setState({ ...this.state, showDialog: true });
    }
  }
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

  renderPageMyphotoTemplate() {
    const { user } = this.props;
    return (
      <div className="page-my-photo-container">
        <Avatar src={user.avatars ? user.avatars : ''} size={{ width: 80, radius: 8 }} defaultSrc="/images/my/register.png" />
        <div className="page-my-user-info">
          <p className="page-my-user-info-nick">{user.username ? user.username : '未设置昵称'}</p>
          <p className="page-my-user-info-signature">{user.slogan ? user.slogan : '未设置口号'}</p>
        </div>
      </div>
    );
  }
  renderPageMyRecordTemplate() {
    const { user } = this.props;
    return (
      <div className="page-my-record-container">
        {
        !user.isLogin ?
          <Link to="/my/entry">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.team_count}</b>个</p>
              <p className="page-my-record-item-bottom">我的团队</p>
            </div>
          </Link> :
          <Link to="/my/teams">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.team_count }</b>个</p>
              <p className="page-my-record-item-bottom">我的团队</p>
            </div>
          </Link>
      }
        {
        !user.isLogin ?
          <Link to="/my/entry">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.project_count}</b>个</p>
              <p className="page-my-record-item-bottom">我的项目</p>
            </div>
          </Link> :
          <Link to="/my/projects">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.project_count}</b>个</p>
              <p className="page-my-record-item-bottom">我的项目</p>
            </div>
          </Link>
      }
        {
        !user.isLogin ?
          <Link to="/my/entry">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.user.reward_time}</b>小时</p>
              <p className="page-my-record-item-bottom">志愿时长</p>
            </div>
          </Link> :
          <Link to="/my/duration">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.user.reward_time}</b>小时</p>
              <p className="page-my-record-item-bottom">志愿时长</p>
            </div>
          </Link>
      }

      </div>
    );
  }
  renderPageMyTop() {
    const { user } = this.props;
    return (
      <div>
        <div className="page-my-header">
          {
            !user.isLogin ?
              <Link to="/my/entry">
                <div className="page-my-header-setting" />
              </Link> :
              <Link to="/my/setting">
                <div className="page-my-header-setting" />
              </Link>
          }
          {
            !user.isLogin ?
              <Link to="/my/entry">
                {this.renderPageMymessagesTemplate()}
              </Link> :
              <Link to="/my/messages">
                {this.renderPageMymessagesTemplate()}
              </Link>
          }
        </div>
        {
          !user.isLogin ?
            <Link to="/my/entry">
              {this.renderPageMyphotoTemplate()}
            </Link> :
            <div>
              {this.renderPageMyphotoTemplate()}
            </div>
        }
        {this.renderPageMyRecordTemplate()}
      </div>
    );
  }
  renderPageMyContainer() {
    const { user } = this.props;
    return (
      <ul className="page-my-item-container">
        <li>
          {
        !user.isLogin ?
          <div>
            <Link to="/my/entry">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-data" />个人资料
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
          :
          <div>
            <Link to="/my/profile/detail/user">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-data" />个人资料
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        }
        </li>
        <li>
          {
        !user.isLogin ?
          <div>
            <Link to="/my/entry">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-certificate" />我的证书
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
          :
          <div onClick={this.hasntIdnumber}>
            <a>
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-certificate" />我的证书
              </div>
              <span className="page-my-item-big" />
            </a>
            <div className="line1px" />
          </div>
        }
        </li>
        <li>
          {
        !user.isLogin ?
          <div>
            <Link to="/my/entry">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-family" />我的家庭
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
          :
          <div>
            <Link to="/my/family">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-family" />我的家庭
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        }
        </li>
        <li>
          {
        !user.isLogin ?
          <div>
            <Link to="/my/entry">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-like" />我的收藏
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
          :
          <div>
            <Link to="/my/collects">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-like" />我的收藏
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
        }
        </li>
        <li>
          {
      !user.isLogin ?
        <div>
          <Link to="/my/entry">
            <div className="page-my-item-box">
              <i className="page-my-item-icon page-my-item-icon-applys" />补录时长
            </div>
            <span className="page-my-item-big" />
          </Link>
          <div className="line1px" />
        </div>
        :
        <div>
          <Link to="/my/duration/applys">
            <div className="page-my-item-box">
              <i className="page-my-item-icon page-my-item-icon-applys" />补录时长
            </div>
            <span className="page-my-item-big" />
          </Link>
          <div className="line1px" />
        </div>
      }
        </li>
        <li>
          {
        !user.isLogin ?
          <div>
            <Link to="/my/entry">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-service" />服务中心
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
          :
          <div>
            <Link to="/my/service">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-service" />服务中心
              </div>
              <span className="page-my-item-big" />
            </Link>
          </div>
        }
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
          <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
          您还未实名注册，请先完成实名认证，获取个人志愿证书
          </Dialog>
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
