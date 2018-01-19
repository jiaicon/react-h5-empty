/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

// import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import WXShare from '../../../components/share';
import { parseTimeStringToDateString } from '../../../utils/funcs';
import './detail.css';
import Link from '../../../components/link/link';
import Image from '../../../components/image/image';
import Avatar from '../../../components/avatar/avatar';
import Tab from '../../../components/tab/tab';
import CommunityItem from '../../../components/community_item/index';
import ShareTip from '../../../components/sharetip/sharetip';
import { feelingAction, observeAction, unObserveAction, deleteFeelingAction } from '../../my/circle/circle.store';
import {
  requestProjectDetail,
  collectProject,
  unCollectProject,
  joinProject,
  quitProject,
  saveTabIndex,
} from './detail.store';
import history from '../../history';
import { userCenterAction } from '../../my/my.store';

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
            this.props.quitProject(this.projectId);
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
    this.props.requestProjectDetail(this.projectId);
    this.props.saveTabIndex(0);
    this.props.feelingAction({ type: 2, relation_id: this.projectId, page_size: 1000 });
  }
  onTabChange(idx) {
    this.props.saveTabIndex(idx);
  }
  componentWillReceiveProps(nextProps) {
    const detailData = nextProps.detail.data;
    if (detailData
        && detailData.id === parseInt(this.projectId, 10)
        && !this.wxRegistered) {
      document.title = detailData.name;
      wx.ready(() => {
        WXShare({
          title: detailData.name,
          desc: detailData.content,
          image: detailData.photo && detailData.photo[0],
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
      this.props.requestProjectDetail(this.projectId);
      this.props.feelingAction({ type: 2, relation_id: this.projectId, page_size: 1000 });
    }
    if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
      this.props.requestProjectDetail(this.projectId);
      this.props.feelingAction({ type: 2, relation_id: this.projectId, page_size: 1000 });
    }
  }

  componentWillUnmount() {
    // document.title = '标题';
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
      // const { user: { isLogin, id_number: idNumber } } = this.props;

      if (action === 'join') {
        // 未实名认证需要跳实名认证页面
        // if (isLogin && !idNumber) {
        //   Alert.warning('请先完成实名认证');
        //   history.push(`/my/profile/verify/project/${this.projectId}`);
        //   return;
        // }

        this.props.joinProject(projectId);
      } else if (action === 'quit') {
        this.setState({ ...this.state, showDialog: true });
      }
    };
  }

  renderSlick() {
    const { detail: { data: detailData } } = this.props;
    if (!detailData.photo || !detailData.photo.length) {
      return <div className="slick-container slick-container-empty" />;
    }

    return (<div className="slick-container">
      <Slick {...this.slickSettings}>
        {detailData.photo
              .map((item, index) => (
                <Image key={index} src={item} className="image" defaultSrc="/images/default_banner.png" />
              ))}
      </Slick>
    </div>);
  }
  renderBasic() {
    const { detail: { data: detailData }, user: { isLogin }, tabIndex } = this.props;
    const currentProjectId = parseInt(this.projectId, 10);
    const dataProjectId = detailData ? detailData.id : '';

    if (currentProjectId !== dataProjectId) {
      return null;
    }

    const content = detailData.content;
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
      <div>
        <div className="header">
          {this.renderSlick()}
          <Link to={`/team/detail/${detailData.team.id}`} className="header-addition">
            <div className="team-info">
              <Avatar src={detailData.team.logo} size={{ width: 30, radius: 4 }} />
              <span style={{ marginLeft: '10px' }}>{detailData.team.name}</span>
            </div>
            <img src="/images/my/more.png" />

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
                <div className="line1px-v" />
                <div className="detail-title">联系人姓名</div>
                <div className="detail-content">{detailData.contact_name}</div>
              </li>
              {
            detailData.contact_phone_public ?
              <li>
                <div className="item-point" />
                <div className="line1px-v" />
                <div className="detail-title">联系人电话</div>
                <a href={`tel:${detailData.contact_phone}`} className="detail-content">{detailData.contact_phone}</a>
              </li>
          : null
          }
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
                {detailData.volunteer_security ? detailData.volunteer_security : '无'}
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
            <p
              dangerouslySetInnerHTML={{
                __html: content ?
                  content.replace(/(\n+)/g, '<br/>') : '暂无介绍' }}
            />
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
        <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
        确定要退出项目吗？
        </Dialog>

      </div>
    );
  }
  onPublish() {
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      history.replace(`/my/circlepublish/2/${this.projectId}`);
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
        {this.props.feeling.data && this.props.feeling.data.list &&
          this.props.feeling.type == 'project' ? this.props.feeling.data.list.map(listData => (
            <CommunityItem
              data={listData} isDetailEntry={false} key={listData.id} routeData={this.props.route} isDescTrigger={false}
              onDeleteClick={this.delete} onParseClick={this.onParse} onUnParseClick={this.unOnParse}
            />
          )) : null

        }

        <div className="page-project-detail-community-link" onClick={this.onPublish} />
        <Dialog type="ios" title={this.dialogA.title} buttons={this.dialogA.buttons} show={this.state.showDialogA}>
        只有登录的用户才能点赞和评论哦～
        </Dialog>
      </div>
    );
  }
  render() {
    const { detail: { data: detailData }, user: { isLogin }, tabIndex } = this.props;
    const currentProjectId = parseInt(this.projectId, 10);
    const dataProjectId = detailData ? detailData.id : '';

    if (currentProjectId !== dataProjectId) {
      return null;
    }

    const content = detailData.content;


    return (
      <div className="page-project-detail">
        <Tab
          tabs={[
            {
              label: '项目详情',
              component: this.renderBasic(),
            },
            {
              label: '项目社区',
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
    feeling: state.circle.feeling,
    observe: state.circle.observe,
    unObserve: state.circle.unObserve,
    deleteFeeling: state.circle.deleteFeeling,
  }),
  dispatch => bindActionCreators({
    requestProjectDetail,
    collectProject,
    unCollectProject,
    joinProject,
    quitProject,
    saveTabIndex,
    feelingAction,
    observeAction,
    unObserveAction,
    userCenterAction,
    deleteFeelingAction,

  }, dispatch),
)(ProjectDetailPage);
