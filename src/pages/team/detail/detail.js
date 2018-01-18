/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import WXShare from '../../../components/share';
import './detail.css';
import Link from '../../../components/link/link';
import Tab from '../../../components/tab/tab';
import Projects from '../../../components/projects/projects';
import Image from '../../../components/image/image';
import Avatar from '../../../components/avatar/avatar';
import ShareTip from '../../../components/sharetip/sharetip';
import CommunityItem from '../../../components/community_item/index';
import { dateTextToDateText } from '../../../utils/funcs';

import history from '../../history';

import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';


import {
  requestTeamDetail,
  requestTeamProjectList,
  collectTeam,
  unCollectTeam,
  joinTeam,
  quitTeam,
  saveTabIndex,
} from './detail.store';

import { feelingAction, observeAction, unObserveAction, deleteFeelingAction } from '../../my/circle/circle.store';
import { userCenterAction } from '../../my/my.store';


class TeamDetailPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.slickSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
    };

    this.teamId = props.route.params.teamId;
    this.state = {
      showShareTip: false,
    };
    this.dialog = {
      title: '提示',
      buttons: [
        {
          type: 'default',
          label: '取消',
          onClick: () => this.setState({ ...this.state, showDialog: false }),
        },
        {
          type: 'primary',
          label: '确认',
          onClick: () => {
            this.setState({ ...this.state, showDialog: false });
            this.props.quitTeam(this.teamId);
          },
        },
      ],
    };
    this.dialogA = {
      title: '登录提示',
      buttons: [
        {
          type: 'default',
          label: '取消',
          onClick: () => this.setState({ ...this.state, showDialogA: false }),
        },
        {
          type: 'primary',
          label: '确认',
          onClick: () => {
            this.setState({ ...this.state, showDialogA: false });
            this.props.userCenterAction();
          },
        },
      ],
    };
  }
  componentWillMount() {
    this.props.requestTeamDetail(this.teamId);
    this.props.requestTeamProjectList(this.teamId);
    this.props.saveTabIndex(0);
    this.props.feelingAction({ type: 3, relation_id: this.teamId, page_size: 1000 });
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const newTeamId = nextProps.route.params.teamId;

    if (newTeamId !== this.teamId) {
      this.teamId = newTeamId;
      this.props.requestTeamDetail(this.teamId);
      this.props.requestTeamProjectList(this.teamId);
    }

    const detailData = nextProps.detail.team;

    if (detailData && detailData.id === parseInt(this.teamId, 10) && !this.wxRegistered) {
      document.title = detailData.name;
      wx.ready(() => {
        WXShare({
          title: detailData.name,
          desc: detailData.abstract,
          image: detailData.logo,
          success: () => this.hideShareTip(),
        });
      });

      this.wxRegistered = true;
    }
    const { deleteFeeling: LdeleteFeeling } = this.props;
    const { deleteFeeling: NdeleteFeeling } = nextProps;
    if (LdeleteFeeling.fetching && !NdeleteFeeling.fetching && !NdeleteFeeling.failed) {
      history.replace(`/team/detail/${this.teamId}`);
    }

    const { observe: Lobserve, unObserve: LunObserve } = this.props;
    const { observe: Nobserve, unObserve: NunObserve } = nextProps;
    if (Lobserve.fetching && !Nobserve.fetching && !Nobserve.failed) {
      this.props.feelingAction({ type: 3, relation_id: this.teamId, page_size: 1000 });
    }
    if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
      this.props.feelingAction({ type: 3, relation_id: this.teamId, page_size: 1000 });
    }
  }

  componentWillUnmount() {}

  onTabChange(idx) {
    this.props.saveTabIndex(idx);
  }

  handleFavoriteClick() {
    const { detail: { team: detailData } } = this.props;

    if (detailData.collection_status) {
      this.props.unCollectTeam(detailData.id);
    } else {
      this.props.collectTeam(detailData.id);
    }
  }

  hideShareTip() {
    this.setState({
      ...this.state,
      showShareTip: false,
    });
  }

  handleShareClick() { // eslint-disable-line
    this.setState({
      ...this.state,
      showShareTip: true,
    });
  }

  handleActionClick(action) {
    const { teamId } = this;
    const { detail: { team: detailData } } = this.props;

    return () => {
      if (action === 'join') {
        this.props.joinTeam(teamId, detailData);
      } else if (action === 'quit') {
        this.setState({ ...this.state, showDialog: true });
      }
    };
  }
  renderSlick() {
    const { detail: { team: detailData } } = this.props;
    if (!detailData || !detailData.team_photo) {
      return <Image className="team-photo" src={detailData.logo} alt="团队图片" defaultSrc="/images/default_banner.png" />;
    }

    return (<div className="slick-container">
      { detailData.team_photo && detailData.team_photo.length ?
        <Slick {...this.slickSettings}>
          {detailData.team_photo
              .map(item => (
                <Image src={item} className="team-photo" resize={{ width: 1500 }} />
                ))}
        </Slick> : null
      }
    </div>);
  }
  renderBasic() {
    const { detail: { team: detailData }, user: { isLogin } } = this.props;
    // join_status: [integer] -1未提交 0审核中 1通过 2驳回, 详情页下发，登陆后如加入团队才有此字段
    const joined = isLogin && (detailData.join_status === 1);
    const auditing = isLogin && (detailData.join_status === 0);
    let actionLabel = '';
    let actionClassName = '';
    let action = '';

    if (!joined && !auditing) {
      actionLabel = '我要加入';
      actionClassName = 'team-action-available';
      action = 'join';
    } else if (joined) {
      actionLabel = '我要退出';
      actionClassName = 'team-action-quit';
      action = 'quit';
    } else if (auditing) {
      actionLabel = '等待审核';
      actionClassName = 'team-action-auditing';
      action = '';
    }

    return (<div>
      <div className="header">
        {this.renderSlick()}
        <div className="header-addition">
          <div className="team-info">
            <Avatar src={detailData.logo} size={{ width: 30, radius: 4 }} />
            <span>{detailData.name}</span>
          </div>

        </div>
      </div>
      <div className="body">
        <div className="team-info-list">
          <div className="team-member">
            <div className="team-member-item">
              <div>
                <span>{
                  detailData.team_size >= 10000
                  ? (detailData.team_size / 10000).toFixed(2) : detailData.team_size}
                </span>
                {detailData.team_size >= 10000 ? '万' : ''}
              </div>
              <p>团队成员(人)</p>
            </div>
            <div className="line1px-v" />
            <div className="team-member-item">
              <div>
                <span>{
                  detailData.reward_time >= 10000
                  ? (detailData.reward_time / 10000).toFixed(2) : detailData.reward_time}
                </span>
                {detailData.reward_time >= 10000 ? '万' : ''}
              </div>
              <p>团队总时长(小时)</p>
            </div>
          </div>
          <ul>
            <li>
              <span>团队口号</span><span>{detailData.slogan}</span>
              <div className="line1px" />
            </li>
            <li>
              <span>团队类型</span><span>{detailData.type}</span>
              <div className="line1px" />
            </li>
            {
              detailData.parent && detailData.parent.name ?
                <li>
                  <span>上级团队</span>
                  <Link to={`/team/detail/${detailData.parent.id}`}>{detailData.parent.name}</Link>
                  <div className="line1px" />
                </li>
                : null
            }
            <li>
              <span>注册日期</span><span>{
                detailData.created_at ?
                dateTextToDateText(detailData.created_at.split(' ')[0]) : ''}</span>
              <div className="line1px" />
            </li>
            <li>
              <span>团队管理</span><span>{detailData.contact_name}</span>
              <div className="line1px" />
            </li>
            <li>
              <span>联系电话</span>
              <a href={`tel:${detailData.contact_phone}`}>{detailData.contact_phone}</a>
              <div className="line1px" />
            </li>
            <li>
              <span>团队地址</span><span>{`${detailData.province_name}${detailData.city_name}${detailData.county_name}${detailData.addr}`}</span>
            </li>
          </ul>
        </div>

        <div className="team-description">
          <div>团队简介</div>
          <p>
            {detailData.abstract}
          </p>
        </div>
        <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
        确定要退出项目吗？
        </Dialog>
        <Dialog type="ios" title={this.dialogA.title} buttons={this.dialogA.buttons} show={this.state.showDialogA}>
        只有登录的用户才能点赞和评论哦～
        </Dialog>
      </div>
      <div className="foot">
        <div className="line1px" />
        <Link to="" onClick={this.handleFavoriteClick} className="team-action team-action-favorite">
          <span className={classnames({ selected: detailData.collection_status })} />
          <span>收藏</span>
        </Link>
        <Link to="" onClick={this.handleShareClick} className="team-action team-action-share">
          <span />
          <span>分享</span>
        </Link>
        <Link to="" onClick={this.handleActionClick(action)} className={`team-action-main ${actionClassName}`}>
          {actionLabel}
        </Link>
      </div>
    </div>);
  }

  renderProjects() {
    const { detail: { projects } } = this.props;

    return (
      <div className="page-team-detail-render-project-container">
        <div className="page-team-detail-render-project-container-main">
          <Projects projects={projects ? projects.list : null} />
          <div className="takeup" />
        </div>
        <div className="tabs-container">
          <div className="line1px" />
          <ul className="tabs">
            <li>
              <Link to="/">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-home': true,
                  })}
                />
                <span>首页</span>
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-signin': true,
                  })}
                />
                <span>签到打卡</span>
              </Link>
            </li>
            <li>
              <Link to="/my">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-me': true,
                  })}
                />
                <span>个人中心</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  onPublish() {
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      history.push(`/my/circlepublish/3/${this.teamId}`);
    } else {
      this.setState({ ...this.state, showDialogA: true });
    }
  }
  delete(id) {
    this.props.deleteFeelingAction(id);
  }
  onParse(id) {
    this.props.observeAction(id);
  }
  unOnParse(id) {
    this.props.unObserveAction(id);
  }
  renderCommunity() {
    return (
      <div>
        {
          this.props.feeling.data && this.props.feeling.data.list && this.props.feeling.type == 'team' ? this.props.feeling.data.list.map(listData => (
            <CommunityItem
              data={listData} isDetailEntry={false} key={listData.id} routeData={this.props.route} isDescTrigger={false}
              onDeleteClick={this.delete} onParseClick={this.onParse} onUnParseClick={this.unOnParse}
            />
          )) : null

        }

        <div className="page-team-detail-community-link" onClick={this.onPublish} />
      </div>
    );
  }

  render() {
    const { detail: { team: detailData, tabIndex } } = this.props;
    const currentTeamId = parseInt(this.teamId, 10);
    const dataTeamId = detailData ? detailData.id : '';

    if (currentTeamId !== dataTeamId) {
      return null;
    }

    return (
      <div className="page-team-detail">
        <Tab
          tabs={[
            {
              label: '团队详情',
              component: this.renderBasic(),
            },
            {
              label: '团队项目',
              component: this.renderProjects(),
            },
            {
              label: '团队社区',
              component: this.renderCommunity(),
            },
          ]}
          onChange={this.onTabChange}
          selectedIndex={tabIndex}
        />
        {
          this.state.showShareTip ? <ShareTip onClick={this.hideShareTip} /> : null
        }
      </div>
    );
  }
}

TeamDetailPage.propTypes = {
  requestTeamDetail: PropTypes.func,
  requestTeamProjectList: PropTypes.func,
  collectTeam: PropTypes.func,
  unCollectTeam: PropTypes.func,
  joinTeam: PropTypes.func,
  quitTeam: PropTypes.func,
  saveTabIndex: PropTypes.func,
  detail: PropTypes.shape({
    fetchingId: PropTypes.string,
    tabIndex: PropTypes.number,
    team: PropTypes.shape({}),
    projects: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number,
      }),
    }),
  }),
  user: PropTypes.shape({
    isLogin: PropTypes.bool,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      teamId: PropTypes.string,
    }),
  }),
};

TeamDetailPage.title = '团队详情';

export default connect(
  state => ({
    detail: state.team.detail,
    user: state.user,
    feeling: state.circle.feeling,
    observe: state.circle.observe,
    unObserve: state.circle.unObserve,
    deleteFeeling: state.circle.deleteFeeling,
  }),
  dispatch => bindActionCreators({
    requestTeamDetail,
    requestTeamProjectList,
    collectTeam,
    unCollectTeam,
    joinTeam,
    quitTeam,
    saveTabIndex,
    feelingAction,
    observeAction,
    unObserveAction,
    userCenterAction,
    deleteFeelingAction,
  }, dispatch),
)(TeamDetailPage);
