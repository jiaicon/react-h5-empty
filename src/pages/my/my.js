/**
 * @file 个人中心入口页面
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserInfo } from '../../stores/common';
import { teamAction, rewardTimeAction, projectAction, messagesAction } from './my.store';
import Link from '../../components/link/link';
import './my.css';
import Image from '../../components/image/image';

class MyPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestUserInfo();
    this.props.teamAction();
    this.props.projectAction();
    this.props.rewardTimeAction();
    this.props.messagesAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {}
  renderPageMymessagesTemplate() {
    return (
      <div className="page-my-header-messages-container">
        <span className="page-my-header-messages-red-point" />
      </div>
    );
  }
  renderPageMyphotoTemplate() {
    const { user } = this.props;
    return (
      <div className="page-my-photo-container">
        <Image src={user.avatars} className="page-my-photo" />

        <div className="page-my-user-info">
          <p className="page-my-user-info-nick">{user.username ? user.username : '未设置昵称'}</p>
          <p className="page-my-user-info-signature">{user.slogan ? user.slogan : '未设置口号'}</p>
        </div>
      </div>
    );
  }
  renderPageMyRecordTemplate() {
    const { user } = this.props;
    // TODO:志愿时长。项目，团队
    const { team } = this.props;
    const { reward } = this.props;

    return (
      <div className="page-my-record-container">
        {
        !user.isLogin ?
          <Link to="/my/login">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{team.data == null ? 0 : team.data.list.length }</b>个</p>
              <p className="page-my-record-item-bottom">我的团队</p>
            </div>
          </Link> :
          <Link to="/my/teams">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{team.data == null ? 0 : team.data.list.length }</b>个</p>
              <p className="page-my-record-item-bottom">我的团队</p>
            </div>
          </Link>
      }
        {
        !user.isLogin ?
          <Link to="/my/login">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{reward.data == null ? 0 : reward.data.join_project_count}</b>个</p>
              <p className="page-my-record-item-bottom">我的项目</p>
            </div>
          </Link> :
          <Link to="/my/projects">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{reward.data == null ? 0 : reward.data.join_project_count}</b>个</p>
              <p className="page-my-record-item-bottom">我的项目</p>
            </div>
          </Link>
      }
        {
        !user.isLogin ?
          <Link to="/my/login">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{reward.data == null ? 0 : reward.data.reward_time}</b>小时</p>
              <p className="page-my-record-item-bottom">志愿时长</p>
            </div>
          </Link> :
          <Link to="/my/duration">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top"><b className="page-my-record-item-num">{reward.data == null ? 0 : reward.data.reward_time}</b>小时</p>
              <p className="page-my-record-item-bottom">志愿时长</p>
            </div>
          </Link>
      }

      </div>
    );
  }
  renderPageMyTop=() => {
    const { user } = this.props;
    return (
      <div>
        <div className="page-my-header">
          {
            !user.isLogin ?
              <Link to="/my/login">
                <div className="page-my-header-setting" />
              </Link> :
              <Link to="/my/setting">
                <div className="page-my-header-setting" />
              </Link>
          }
          {
            !user.isLogin ?
              <Link to="/my/login">
                {this.renderPageMymessagesTemplat()}
              </Link> :
              <Link to="/my/messages">
                {this.renderPageMymessagesTemplate()}
              </Link>
          }
        </div>
        {
          !user.isLogin ?
            <Link to="/my/login">
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
  renderPageMyContainer=() => {
    const { user } = this.props;
    return (
      <ul className="page-my-item-container">
        <li>
          {
        !user.isLogin ?
          <div>
            <Link to="/my/login">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-data" />个人资料
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
          :
          <div>
            <Link to="/my/profile">
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
            <Link to="/my/login">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-certificate" />我的证书
              </div>
              <span className="page-my-item-big" />
            </Link>
            <div className="line1px" />
          </div>
          :
          <div>
            <Link to="/my/certificate">
              <div className="page-my-item-box">
                <i className="page-my-item-icon page-my-item-icon-certificate" />我的证书
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
            <Link to="/my/login">
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
            <Link to="/my/login">
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
          <Link to="/my/login">
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
            <Link to="/my/login">
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
    const user = this.props;
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
  requestUserInfo: PropTypes.func,
  teamAction: PropTypes.func,
  rewardTimeAction: PropTypes.func,
  projectAction: PropTypes.func,
  messagesAction: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
  team: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({

        })),
        PropTypes.array,
      ]),
    }),

  }),
  project: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({

        })),
        PropTypes.array,
      ]),
    }),

  }),
  reward: PropTypes.shape({
    data: PropTypes.shape({
      join_project_count: PropTypes.number,
      reward_time: PropTypes.number,
      project: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({

        })),

      ]),

    }),
  }),
};

export default connect(
  state => ({
    user: state.user,
    team: state.my.team,
    project: state.my.project,
    reward: state.my.reward,
    messages: state.my.messages,
  }),
  dispatch => bindActionCreators({
    requestUserInfo,
    teamAction,
    rewardTimeAction,
    projectAction,
    messagesAction },
    dispatch),
)(MyPage);
