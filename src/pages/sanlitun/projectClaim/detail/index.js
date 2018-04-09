/**
 * @file 项目认领列表详情
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';

import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../../history';


import './index.css';
import { parseTimeStringToDateString } from '../../../../utils/funcs';

import Image from '../../../../components/image/image';
import Link from '../../../../components/link/link';
import WXShare from '../../../../components/share';
import Avatar from '../../../../components/avatar/avatar';


import { requestClaimDetail } from '../../starModel/starModel.store';
import { userCenterAction } from '../../../my/my.store';

class projectClaimDetail extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.Id;
    this.state = ({
      descript: false,
      descHeight: null,
    });
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
    this.props.requestClaimDetail(this.projectId);
  }


  componentWillReceiveProps(nextProps) {
    const detailData = nextProps.detail.data;

    if (detailData
        && detailData.id === parseInt(this.projectId, 10)
        && !this.wxRegistered) {
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
  }

  componentWillUnmount() {
    this.setState({
      descript: false,
      descHeight: null,
      descTrigger: false,
    });
  }
  componentDidMount() {
    const content = this.contentDom;
    if (content && content.offsetHeight !== this.state.descHeight && content.offsetHeight >= 58) {
      this.setState({
        ...this.state,
        descHeight: content.offsetHeight,
        descTrigger: true,
      });
    }
  }
  componentDidUpdate() {
    const content = this.contentDom;
    if (content && content.offsetHeight !== this.state.descHeight && content.offsetHeight >= 58) {
      this.setState({
        ...this.state,
        descHeight: content.offsetHeight,
        descTrigger: true,
      });
    }
  }
  componentDidMount() {

  }

  handleActionClick(action) {
    const { projectId } = this;

    return () => {
      const { user: { isLogin, id_number: idNumber } } = this.props;

      if (action === 'join') {
        history.replace(`/sanlitun/projectClaim/improve/${this.projectId}`);
      } else if (action === 'login') {
        this.props.userCenterAction();
      }
    };
  }
  renderSlick() {
    const { detail: { data: detailData } } = this.props;
    if (!detailData.banner || !detailData.banner.length) {
      return <div className="slick-container slick-container-empty" />;
    }

    return (<div className="slick-container">
      <Slick {...this.slickSettings}>
        {detailData.banner
              .map((item, index) => (
                <Image key={index} src={item} className="image" defaultSrc="/images/default_banner.png" />
              ))}
      </Slick>
    </div>);
  }
  descripBtn() {
    this.setState({
      ...this.state,
      descript: !this.state.descript,
    });
  }
  render() {
    const { detail: { data: detailData }, user: { isLogin } } = this.props;
    const currentProjectId = parseInt(this.projectId, 10);
    const dataProjectId = detailData ? detailData.id : '';

    if (currentProjectId !== dataProjectId) {
      return null;
    }

    const content = detailData.content;

    // claim_status: [integer] 活动状态 1 未开始，2认领中 3已结束
    // join_status: [integer]  1通过 0未认领,
    const joined = isLogin && (detailData.join_status === 0 || detailData.join_status === 1);


    let actionLabel = '';
    let actionClassName = '';
    let action = '';

    if (detailData.claim_status === 3) {
      actionLabel = '认领结束';
      actionClassName = 'claim-project-action-end';
    } else if (isLogin && detailData.claim_status === 2 && detailData.join_status === 1) {
      actionLabel = '已认领';
      actionClassName = 'claim-project-action-full';
    } else if (isLogin && detailData.claim_status === 2 && detailData.join_status === 0) {
      actionLabel = '我要认领';
      actionClassName = 'claim-project-action-available';
      action = 'join';
    } else if (!isLogin) {
      actionLabel = '我要认领';
      actionClassName = 'claim-project-action-available';
      action = 'login';
    } else if (isLogin && detailData.claim_status === 1 && detailData.join_status === 0) {
      actionLabel = '我要认领';
      actionClassName = 'claim-project-action-available';
      action = 'join';
    }


    return (
      <div className="page-claim-detail-container">
        <div className="page-claim-detail">
          <div className="header">
            {this.renderSlick()}
          </div>
          <div className="body">
            <div className="header-addition">
              <div className="team-info">
                <Avatar src={detailData.logo} size={{ width: 30, radius: 4 }} />
                <span style={{ marginLeft: '10px' }}>{detailData.team_name}</span>
              </div>

            </div>
            <div className="project-name">
              {detailData.name}
            </div>
            <div className="project-detail-list">
              <ul>

                <li>
                  <div className="item-point" />
                  <div className="line1px-v" />
                  <div className="detail-title">项目日期</div>
                  <div className="detail-content">{parseTimeStringToDateString(detailData.begin)}-{parseTimeStringToDateString(detailData.end)}</div>
                </li>

                <li>
                  <div className="item-point" />
                  <div className="detail-title">项目地址</div>
                  <div className="detail-content">{detailData.address}</div>
                </li>
              </ul>

            </div>
            <div className="project-takeup" />
            <div className="project-description">
              <div>项目介绍</div>

              <p
                className={classnames({
                  active: this.state.descript,
                  initail: !this.state.descript,
                })}
                ref={(dom) => { this.contentDom = dom; }}
                dangerouslySetInnerHTML={{
                  __html: content ?
                content.replace(/(\n+)/g, '<br/>') : '暂无介绍' }}
              />
              {this.state.descTrigger ? <div onClick={this.descripBtn}>{this.state.descript ? '收起' : ' 展开详情'}<p
                className={classnames({
                  activebtn: this.state.descript,
                  initailbtn: !this.state.descript,
                })}
              /></div> : null}


            </div>
            <div className="project-takeup" />
            <div className="project-teamlist">
              <div>已认领团队</div>
              <div className="project-claimlist">
                {detailData && detailData.claim_list.length && detailData.claim_list.length >= 1 ?
                  <ul>
                    {detailData.claim_list.map(item => (
                      <li>
                        <div>
                          <span>{item.team_name }</span>
                          <span>{item.created_at.split(' ')[0]}</span>
                        </div>
                      </li>
                    ))
                    }
                  </ul>
                  : '暂无团队认领'
                }
              </div>
            </div>

          </div>
        </div>
        <footer>
          <div onClick={this.handleActionClick(action)} className={`${actionClassName}`}>
            {actionLabel}
          </div>
        </footer>
      </div>
    );
  }
}
projectClaimDetail.title = '认领项目详情';

projectClaimDetail.propTypes = {
  requestClaimDetail: PropTypes.func,
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

export default connect(
  state => ({
    detail: state.sanlitun.detail,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestClaimDetail, userCenterAction,
  },
    dispatch),
)(projectClaimDetail);
