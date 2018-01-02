/**
 * @file 项目认领列表详情
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

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


class projectClaimDetail extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.Id;
    console.log(this.projectId);
    this.state = ({
      descript: false,
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

  componentWillUnmount() {}


  handleActionClick(action) {
    const { projectId } = this;

    return () => {
      // const { user: { isLogin, id_number: idNumber } } = this.props;

      if (action === 'join') {
        // 填写信息
        history.push(`/sanlitun/projectClaim/improve/${this.projectId}`);
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
  descripBtn() {
    this.setState({
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
    } else if (!joined && detailData.claim_status === 2) {
      actionLabel = '已认领';
      actionClassName = 'claim-project-action-full';
    } else if (joined && detailData.join_status === 0) {
      actionLabel = '我要认领';
      actionClassName = 'claim-project-action-available';
      action = 'join';
    }

    // if (detailData.activity_status === 3) {
    //   actionLabel = '已结束';
    //   actionClassName = 'project-action-end';
    // }else if (!joined && detailData.activity_status === 2) {
    //   actionLabel = '进行中';
    //   actionClassName = 'project-action-full';
    // } else if (!joined) {
    //   actionLabel = '我要报名';
    //   actionClassName = 'project-action-available';
    //   action = 'join';
    // } else if (joined && detailData.join_status === 0) {
    //   actionLabel = '等待审核';
    //   actionClassName = 'project-action-audit';
    // }

    return (
      <div className="page-claim-detail">
        <div className="header">
          {this.renderSlick()}
          <a className="header-addition">
            <div className="team-info">
              <Avatar src={detailData.logo} size={{ width: 30, radius: 4 }} />
              <span style={{ marginLeft: '10px' }}>{detailData.team_name}</span>
            </div>

          </a>
        </div>
        <div className="body">
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
              dangerouslySetInnerHTML={{
                __html: content ?
                  content.replace(/(\n+)/g, '<br/>') : '暂无介绍' }}
            />
            <div onClick={this.descripBtn}>展开详情<p
              className={classnames({
                activebtn: this.state.descript,
                initailbtn: !this.state.descript,
              })}
            /></div>
          </div>
          <div className="project-takeup" />
          <div className="project-teamlist">
            <div>已认领团队</div>
            <div className="project-claimlist">
              {detailData && detailData.claim_list.length && detailData.claim_list.length >= 1 ? 'you' : 'wu'}
            </div>
          </div>
          <footer>
            <div onClick={this.handleActionClick(action)} className={`${actionClassName}`}>
              {actionLabel}
            </div>
          </footer>
        </div>


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
    requestClaimDetail,
  },
    dispatch),
)(projectClaimDetail);
