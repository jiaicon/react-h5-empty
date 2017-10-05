/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WXShare from '../../../components/share';
import { parseTimeStringToDateString } from '../../../utils/funcs';
import './detail.css';
import Link from '../../../components/link/link';
import { requestProjectDetail } from './detail.store';

class ProjectDetailPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.projectId;
  }

  componentWillMount() {
    this.props.requestProjectDetail(this.projectId);
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
    let actionLabel = '';
    let actionClassName = '';

    if (detailData.activity_status === 3) {
      actionLabel = '已结束';
      actionClassName = 'project-action-end';
    } else if (!joined && fulled) {
      actionLabel = '已满员';
      actionClassName = 'project-action-full';
    } else if (!joined) {
      actionLabel = '我要报名';
      actionClassName = 'project-action-available';
    } else if (joined) {
      actionLabel = '我要退出';
      actionClassName = 'project-action-quit';
    }

    return (
      <div className="page-project-detail">
        <div className="header">
          <img className="project-photo" src={detailData.photo} alt="项目图片" />
          <div className="header-addition">
            <div className="team-info">
              <img src={detailData.team.logo} alt="头像" />
              <span>{detailData.team.name}</span>
            </div>
            <div className="project-number">
              项目编号：{detailData.identifier}
            </div>
          </div>
        </div>
        <div className="body">
          <div className="project-name">
            {detailData.name}
          </div>
          <div className="project-category">
            #&nbsp;{detailData.category.service_category_name}
          </div>
          <div className="project-detail-list">
            <ul>
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">发布日期</div>
                <div className="detail-content">{detailData.publish_date}</div>
              </li>
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">服务对象</div>
                <div className="detail-content">{detailData.service_object.service_object_name}</div>
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
                <div>志愿者保险、专业培训</div>
                <div>志愿者保险、专业培训</div>
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
          <Link to="/" className="project-action project-action-favorite">
            <span className="selected" />
            <span>收藏</span>
          </Link>
          <Link to="/" className="project-action project-action-share">
            <span />
            <span>分享</span>
          </Link>
          <Link to="/" className={`project-action-main ${actionClassName}`}>
            {actionLabel}
          </Link>
        </div>
      </div>
    );
  }
}

ProjectDetailPage.propTypes = {
  requestProjectDetail: PropTypes.func,
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
  dispatch => bindActionCreators({ requestProjectDetail }, dispatch),
)(ProjectDetailPage);
