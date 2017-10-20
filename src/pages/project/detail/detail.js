/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import WXShare from '../../../components/share';
import { parseTimeStringToDateString } from '../../../utils/funcs';
import './detail.css';
import Link from '../../../components/link/link';
import Image from '../../../components/image/image';
import ShareTip from '../../../components/sharetip/sharetip';

import {
  requestProjectDetail,
  collectProject,
  unCollectProject,
  joinProject,
  quitProject,
} from './detail.store';

class ProjectDetailPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.projectId;
    this.state = {
      showShareTip: false,
    };

    this.slickSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
    };
  }

  componentWillMount() {
    this.props.requestProjectDetail(this.projectId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detail && nextProps.detail.data && !this.wxRegistered) {
      const detailData = nextProps.detail.data;

      wx.ready(() => {
        WXShare({
          title: detailData.name,
          desc: detailData.content,
          image: detailData.photo,
          success: () => this.hideShareTip(),
        });
      });

      this.wxRegistered = true;
    }
  }

  componentWillUnmount() {

  }

  handleFavoriteClick() {
    const { detail: { data: detailData } } = this.props;

    if (detailData.collection_status) {
      this.props.unCollectProject(detailData.id);
    } else {
      this.props.collectProject(detailData.id);
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
    const { projectId } = this;

    return () => {
      if (action === 'join') {
        this.props.joinProject(projectId);
      } else if (action === 'quit' && window.confirm('确定要退出吗？')) {
        this.props.quitProject(projectId);
      }
    };
  }

  renderSlick() {
    const { detail: { data: detailData } } = this.props;
    if (!detailData.photo || !detailData.photo.length) {
      return <div className="slick-container" />;
    }

    return (<div className="slick-container">
      <Slick {...this.slickSettings}>
        {detailData.photo
              .map((item, index) => (
                <Image key={index} src={item} defaultSrc="/images/default_banner.png" />
              ))}
      </Slick>
    </div>);
  }

  render() {
    const { detail: { data: detailData }, user: { isLogin } } = this.props;
    const currentProjectId = parseInt(this.projectId, 10);
    const dataProjectId = detailData ? detailData.id : '';

    if (currentProjectId !== dataProjectId) {
      return null;
    }

    // join_status: [integer] 0审核中 1通过 2驳回, 详情页下发，登陆后如加入项目才有此字段
    // activity_status: [integer] 活动状态 1 招募中，2进行中 3已结束
    const joined = isLogin && (detailData.join_status === 0 || detailData.join_status === 1);
    const fulled = detailData.join_people_count === detailData.people_count;
    const serviceCategories = detailData.category.map(category => category.service_category_name);
    const serviceObjects = detailData.service_object.map(obj => obj.service_object_name);

    let actionLabel = '';
    let actionClassName = '';
    let action = '';

    if (detailData.activity_status === 3) {
      actionLabel = '已结束';
      actionClassName = 'project-action-end';
    } else if (!joined && fulled) {
      actionLabel = '已满员';
      actionClassName = 'project-action-full';
    } else if (!joined && detailData.activity_status === 2) {
      actionLabel = '进行中';
      actionClassName = 'project-action-full';
    } else if (!joined) {
      actionLabel = '我要报名';
      actionClassName = 'project-action-available';
      action = 'join';
    } else if (joined && detailData.join_status === 0) {
      actionLabel = '等待审核';
      actionClassName = 'project-action-audit';
    } else if (joined) {
      actionLabel = '我要退出';
      actionClassName = 'project-action-quit';
      action = 'quit';
    }

    return (
      <div className="page-project-detail">
        <div className="header">
          {this.renderSlick()}
          <Link to={`/team/detail/${detailData.team.id}`} className="header-addition">
            <div className="team-info">
              <Image src={detailData.team.logo} alt="头像" />
              <span>{detailData.team.name}</span>
            </div>
            <div className="project-number">
              项目编号：{detailData.identifier}
            </div>
          </Link>
        </div>
        <div className="body">
          <div className="project-name">
            {detailData.name}
          </div>
          <div className="project-category">
            #&nbsp;{serviceCategories.join('、')}
          </div>
          <div className="project-detail-list">
            <ul>
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">发布日期</div>
                <div className="detail-content">{detailData.created_at}</div>
              </li>
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">服务对象</div>
                <div className="detail-content">{serviceObjects.join('、')}</div>
              </li>
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">招募截止</div>
                <div className="detail-content">{detailData.join_end}</div>
              </li>
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">项目日期</div>
                <div className="detail-content">{parseTimeStringToDateString(detailData.begin)}-{parseTimeStringToDateString(detailData.end)}</div>
              </li>
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">志愿时长</div>
                <div className="detail-content">{detailData.reward_time} 小时</div>
              </li>
              <li>
                <div className="item-point" />
                <div className="detail-title">项目地址</div>
                <div className="detail-content">{detailData.province_name}{detailData.city_name}{detailData.county_name}{detailData.addr}</div>
              </li>
            </ul>
            <div className="project-guard">
              <img src="/images/icon_safeguard.png" alt="保障" />
              <span>志愿保障</span>
              <div className="line1px-v" />
              <div className="guard-detail">
                <div>{detailData.volunteer_security}</div>
              </div>
            </div>
          </div>
          <div className="project-report">
            <span>已报名人数</span>
            <div>
              <span>{detailData.join_people_count}</span>
              /
              <span>{detailData.people_count}</span>
            </div>
          </div>
          <div className="project-description">
            <div>项目介绍</div>
            <p>
              {detailData.content}
            </p>
          </div>
        </div>
        <div className="foot">
          <div className="line1px" />
          <Link to="" onClick={this.handleFavoriteClick} className="project-action project-action-favorite">
            <span className={classnames({ selected: detailData.collection_status })} />
            <span>收藏</span>
          </Link>
          <Link to="" onClick={this.handleShareClick} className="project-action project-action-share">
            <span />
            <span>分享</span>
          </Link>
          <Link to="" onClick={this.handleActionClick(action)} className={`project-action-main ${actionClassName}`}>
            {actionLabel}
          </Link>
        </div>
        {
          this.state.showShareTip ? <ShareTip onClick={this.hideShareTip} /> : null
        }
      </div>
    );
  }
}

ProjectDetailPage.propTypes = {
  requestProjectDetail: PropTypes.func,
  collectProject: PropTypes.func,
  unCollectProject: PropTypes.func,
  joinProject: PropTypes.func,
  quitProject: PropTypes.func,
  detail: PropTypes.shape({
    fetchingId: PropTypes.string,
    data: PropTypes.shape({}),
  }),
  user: PropTypes.shape({
    isLogin: PropTypes.bool,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
};

ProjectDetailPage.title = '项目详情';

export default connect(
  state => ({
    detail: state.project.detail,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestProjectDetail,
    collectProject,
    unCollectProject,
    joinProject,
    quitProject,
  }, dispatch),
)(ProjectDetailPage);
