/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
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

import {
  requestTeamDetail,
  requestTeamProjectList,
  collectTeam,
  unCollectTeam,
  joinTeam,
  quitTeam,
  saveTabIndex,
} from './detail.store';

class TeamDetailPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.teamId = props.route.params.teamId;
    this.state = {
      showShareTip: false,
    };
  }

  componentWillMount() {
    this.props.requestTeamDetail(this.teamId);
    this.props.requestTeamProjectList(this.teamId);
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

    if (nextProps.detail && nextProps.detail.team && !this.wxRegistered) {
      const detailData = nextProps.detail.team;

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

    return () => {
      if (action === 'join') {
        this.props.joinTeam(teamId);
      } else if (action === 'quit' && window.confirm('确定要退出吗？')) {
        this.props.quitTeam(teamId);
      }
    };
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
      actionLabel = '我要报名';
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
        <Image className="team-photo" src={detailData.logo} alt="团队图片" defaultSrc="/images/default_banner.png" />
        <div className="header-addition">
          <div className="team-info">
            <Avatar src={detailData.logo} size={{ width: 30, radius: 4 }} />
            <span>{detailData.name}</span>
          </div>
          <div className="team-number">
          团队编号：{detailData.identifier}
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
              <span>注册日期</span><span>{detailData.created_at}</span>
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

    return <Projects projects={projects ? projects.list : null} />;
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
              label: '基本信息',
              component: this.renderBasic(),
            },
            {
              label: '团队项目',
              component: this.renderProjects(),
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
  }),
  dispatch => bindActionCreators({
    requestTeamDetail,
    requestTeamProjectList,
    collectTeam,
    unCollectTeam,
    joinTeam,
    quitTeam,
    saveTabIndex,
  }, dispatch),
)(TeamDetailPage);
