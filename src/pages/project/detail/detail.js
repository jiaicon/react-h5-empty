/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
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
  saveProjectTabIndex,
} from './detail.store';
import { requestUserInfo } from '../../../stores/common';
import history from '../../history';
import { userCenterAction } from '../../my/my.store';
import {storeLoginSource} from '../../my/login/login.store';

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
      title: '退出报名',
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
            this.props.storeLoginSource(`/project/detail/${this.projectId}`)
            history.replace('/my/entry')
          },
        },
      ],
    };
  }

  componentWillMount() {
    const { detail: { data: detailData, tabIndex, lastProjectId }, user } = this.props;
    if (user.isLogin) {
      this.props.requestUserInfo();
    }
    this.props.feelingAction({ type: 2, relation_id: this.projectId, page_size: 1000 });
    this.props.requestProjectDetail(this.projectId);
    if (lastProjectId === 0) {
      this.props.saveProjectTabIndex(0, this.projectId);
    } else if (lastProjectId !== this.projectId) {
      this.props.saveProjectTabIndex(0, this.projectId);
    } else if (lastProjectId === this.projectId) {
      this.props.saveProjectTabIndex(tabIndex, this.projectId);
    }
  }


  onTabChange(idx) {
    this.props.saveProjectTabIndex(idx);
  }
  componentWillReceiveProps(nextProps) {
    const newProjectId = nextProps.route.params.projectId;
    if (newProjectId !== this.projectId) {
      this.projectId = newProjectId;
      this.props.requestProjectDetail(this.projectId);
    }
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
      window.location.replace(`/project/detail/${this.projectId}`);
    }

    const { observe: Lobserve, unObserve: LunObserve } = this.props;
    const { observe: Nobserve, unObserve: NunObserve } = nextProps;
    if (Lobserve.fetching && !Nobserve.fetching && !Nobserve.failed) {
      this.props.feelingAction({ type: 2, relation_id: this.projectId, page_size: 1000 });
    }
    if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
      this.props.feelingAction({ type: 2, relation_id: this.projectId, page_size: 1000 });
    }
  }
  componentWillDidmount() {

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

  handleShareClick() { 
    // eslint-disable-line
    this.setState({
      ...this.state,
      showShareTip: true,
    });
  }
  handleActionClickSitch(action,projectId,customConfig,paymentConfig){

    if (action === 'join') {
      if (projectId == 1035) {
        window.location.href = 'http://lxi.me/17i1a';
        return;
      } else if (projectId == 1043) {
        window.location.href = 'http://lxi.me/4hwr6';
        return;
      }
      if(!customConfig && !paymentConfig){
        this.props.joinProject(projectId);
      }else if(customConfig || paymentConfig){
        // window.location.replace(`/project/signup/${projectId}`)
        window.location.href=`/project/signup/${projectId}`;
        // history.replace(`/project/signup/${projectId}`)
      }
    } else if (action === 'quit') {
      this.setState({ ...this.state, showDialog: true });
    }
  }
  handleActionClick(action) {
    const { projectId } = this;
    const realRegister =  window.orgInfo.real_name_register;
    const { user , detail: { data: detailData } } = this.props;
    const customConfig =detailData.custom_config || null;
    const paymentConfig =detailData.custom_payment_config || null;

    return () => {
       // in_blacklist 黑名单 0不在，1在
      // realRegister 机构实名 1 要求  0 否
      
      if (!user.isLogin) {
        this.props.storeLoginSource(`/project/detail/${this.projectId}`)
        history.replace('/my/entry')
        // this.props.userCenterAction();
    
      } else if (user.isLogin && !user.in_blacklist) {
        // 不要求实名
        if (realRegister == 0) {
          this.handleActionClickSitch(action,projectId,customConfig,paymentConfig);
        // 要求实名切用户未实名过，通过ID判断
        } else if (realRegister == 1 && user.isLogin && !user.id_number) {
          this.props.storeLoginSource(`/project/detail/${this.projectId}`)
          window.location.replace(`/my/profile/verify`);
        } else if (realRegister == 1 && user.isLogin && user.id_number) {

          this.handleActionClickSitch(action,projectId,customConfig,paymentConfig)
        }
      } else if (user.isLogin && user.in_blacklist) {
        Alert.warning('您已被添加到黑名单，请联系客服');
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
    const { detail: { data: detailData, tabIndex }, user: { isLogin } } = this.props;
    const currentProjectId = parseInt(this.projectId, 10);
    const dataProjectId = detailData ? detailData.id : '';

    if (currentProjectId !== dataProjectId) {
      return null;
    }

    const content = detailData.content;
    // join_status: [integer] 0审核中 1通过 2驳回, 详情页下发，登陆后如加入项目才有此字段
    // activity_status: [integer] 活动状态 1 招募中，2进行中 3已结束
    const joined = isLogin && (detailData.join_status === 0 || detailData.join_status === 1 );
    const fulled = detailData.join_people_count === detailData.people_count;
    const serviceCategories = detailData.category.map(category => category.service_category_name);
    const serviceObjects = detailData.service_object.map(obj => obj.service_object_name);

    let actionLabel = '';
    let actionClassName = '';
    let action = '';
    if (detailData.activity_status === 3 || detailData.project_status === 5) {
      actionLabel = '已结束';
      actionClassName = 'project-action-end';
    }  else if (!joined && fulled) {
      actionLabel = '已满员';
      actionClassName = 'project-action-full';
    } else if (!joined && detailData.activity_status === 2) {
      actionLabel = '进行中';
      actionClassName = 'project-action-full';
    } else if (!joined) {
      actionLabel = '我要报名';
      actionClassName = 'project-action-available';
      action = 'join';
    } else if (isLogin && detailData.join_status === 0) {
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
                <div className="detail-content">{detailData.addr}</div>
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
          <div className="project-description-backhome">
            <Link to="/"/>
          </div>
          <div className="project-description-takeup"/>
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
      window.location.replace(`/my/circlepublish/2/${this.projectId}`);
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
        {this.props.feeling.data && this.props.feeling.data.list && this.props.feeling.data.list.length > 0 &&
          this.props.feeling.type == 'project' ? this.props.feeling.data.list.map(listData => (
            <CommunityItem
              data={listData} isDetailEntry={false} key={listData.id} routeData={this.props.route} isDescTrigger={false}
              onDeleteClick={this.delete} onParseClick={this.onParse} onUnParseClick={this.unOnParse}
            />
          )) :
          <div className="page-circle-rendercommunity-container">
            <img src="/images/my/information.png" className="page-circle-rendercommunity-img" />
            <div className="page-circle-rendercommunity-info">还没有动态信息</div>
          </div>

        }

        <div className="page-project-detail-community-link" onClick={this.onPublish} />
        <Dialog type="ios" title={this.dialogA.title} buttons={this.dialogA.buttons} show={this.state.showDialogA}>
        只有登录的用户才能点赞和评论哦～
        </Dialog>
      </div>
    );
  }
  render() {
    const { detail: { data: detailData, tabIndex }, user: { isLogin } } = this.props;

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
  feelingAction: PropTypes.func,
  collectProject: PropTypes.func,
  unCollectProject: PropTypes.func,
  joinProject: PropTypes.func,
  saveProjectTabIndex: PropTypes.func,
  requestUserInfo: PropTypes.func,
  quitProject: PropTypes.func,
  detail: PropTypes.shape({
    fetchingId: PropTypes.string,
    data: PropTypes.shape({}),
    tabIndex: PropTypes.number,
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
    saveProjectTabIndex,
    feelingAction,
    observeAction,
    unObserveAction,
    userCenterAction,
    deleteFeelingAction,
    requestUserInfo,
    storeLoginSource,
  }, dispatch),
)(ProjectDetailPage);
