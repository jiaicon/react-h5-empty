/**
 * @file 社区项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classnames from 'classnames';
import history from '../../pages/history';
import Link from '../link/link';
import AVATAR from '../avatar/avatar';
import IMAGE from '../image/image';
import './index.css';
import { requestUserInfo } from '../../stores/common';
import { userCenterAction } from '../../pages/my/my.store';

import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

class COMMUNITYITEM extends React.Component {
  static propTypes = {
    data: PropTypes.shape({ }),
    routeData: PropTypes.shape({ }),
    isDetailEntry: PropTypes.bool,
    isDescTrigger: PropTypes.bool,
    isDisplayLine: PropTypes.bool,

    onParseClick: PropTypes.func,
    onUnParseClick: PropTypes.func,
    onCommentClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onFocusClick: PropTypes.func,
  }
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      descHeight: null,
      descTrigger: false,
    });
    this.dialog = {
      title: '登录提示',
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
            this.props.userCenterAction();
          },
        },
      ],
    };
  }


  componentWillMount() {
    this.setState({
      descHeight: null,
      descTrigger: false,
    });
  }
  componentDidMount() {
    if (this.props.isDescTrigger) {

    } else {
      const content = this.contentDom;
      if (content && content.offsetHeight !== this.state.descHeight && content.offsetHeight >= 120) {
        this.setState({
          ...this.state,
          descHeight: content.offsetHeight,
          descTrigger: true,
        });
      }
    }
  }
  componentDidUpdate() {
    if (this.props.isDescTrigger) {

    } else {
      const content = this.contentDom;
      if (content && content.offsetHeight !== this.state.descHeight && content.offsetHeight >= 120) {
        this.setState({
          ...this.state,
          descHeight: content.offsetHeight,
          descTrigger: true,
        });
      }
    }
  }
  onPreview(e) {
    const index = e.currentTarget.getAttribute('data-index');
    const imagesArr = this.props.data.photo;

    wx.ready(() => {
      wx.previewImage({
        current: imagesArr[index], // 当前显示图片的http链接
        urls: imagesArr, // 需要预览的图片http链接列表
      });
    });
  }
  entry(e) {
    const info = JSON.parse(e.target.getAttribute('data-info'));
    const { user: { isLogin } } = this.props;
    if (this.props.routeData.path === '/my/circledetail/:Id') {
      if (!isLogin) {
        this.setState({ ...this.state, showDialog: true });
      } else {
        this.props.onFocusClick();
      }

      return;
    }
    history.push(`/my/circledetail/${info.id}`);
  }

  handleDelete(e) {
    const info = JSON.parse(e.target.getAttribute('data-info'));
    const id = info.id;
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      this.props.onDeleteClick(id);
    } else {
      this.setState({ ...this.state, showDialog: true });
    }
  }
  handleActionClick(action) {
    const id = this.commentId;
    return () => {
      if (action === 'join') {
        this.props.onParseClick(id);
      } else if (action === 'quit') {
        this.props.onUnParseClick(id);
      } else if (action === 'login') {
        this.setState({ ...this.state, showDialog: true });
      }
    };
  }
  render() {
    const { user: { isLogin } } = this.props;
    // is_like: [integer] 是否已点赞 如登陆且点赞则为1，否则为0
    const data = this.props.data;
    const joined = isLogin && (data.is_like === 1);
    const auditing = isLogin && (data.is_like === 0);

    let actionClassName = '';
    let action = '';
    this.commentId = data.id;


    if (!joined && !auditing) {
      // 未登陆，点赞
      actionClassName = 'components-community-item-footer-like-n';
      action = 'login';
    } else if (joined) {
      // 已经点了
      actionClassName = 'components-community-item-footer-like-h';
      action = 'quit';
    } else if (auditing) {
      // 登陆没点
      actionClassName = 'components-community-item-footer-like-n';
      action = 'join';
    }

    return (

      <div className="components-community-item-container">

        <div className="components-community-item-main">
          <div className="components-community-item">
            <AVATAR size={{ width: 40, height: 40, radius: 4 }} className="components-community-item-avatar" src={data.user_info.avatars} />
            <div className="components-community-item-main-right">
              <p className="components-community-item-name">{data.user_info.real_name || data.user_info.username}</p>
              <Link to={`/my/circledetail/${data.id}`}>
                <div
                  ref={(dom) => { this.contentDom = dom; }}
                  className={classnames({
                    ' components-community-item-content-style': true,
                    'components-community-item-content-style-off': this.state.descTrigger,
                  })}
                >{data.content}</div>

                {this.state.descTrigger ? <div className="components-community-item-content-btn">查看全文</div> : null}
              </Link>
              <ul className="components-community-item-photo-area">
                {
                  data.photo && data.photo.length && data.photo.length >= 1 ?
                data.photo.length === 1 ?
                  <li className="components-community-item-photo-area-li-single" data-index={0} onClick={this.onPreview}>
                    <IMAGE src={data.photo[0]} className="components-community-item-photo-area-single" />
                  </li> :
                  data.photo.map((itm, index) => (

                    <li className="components-community-item-photo-area-li-several" data-index={index} onClick={this.onPreview}>
                      <IMAGE src={itm} className="components-community-item-photo-area-several" />
                    </li>
                  ))
              : null
                }
              </ul>
              {
                this.props.isDetailEntry && data.team_info && data.team_info.name ? <Link to={`/team/detail/${data.team_info.id}`}><div className="components-community-item-business-container"># {data.team_info.name }</div></Link> : null
              }


              {
                this.props.isDetailEntry && data.project_info && data.project_info.name ? <Link to={`/project/detail/${data.project_info.id}`}><div className="components-community-item-business-container"># {data.project_info.name }</div>                                                                                                                                                                                                                                                                                                                                                                                                           </Link> : null
              }


              <div className="components-community-item-footer">
                <div className="components-community-item-footer-container">
                  <div className="components-community-item-footer-time">{data.created_at}</div>
                  {data.user_info.id === this.props.user.id ? <div className="components-community-item-footer-del" onClick={this.handleDelete} data-info={JSON.stringify(data)}>删除</div> : null}

                </div>
                <div className="components-community-item-footer-container">
                  <Link to="" className={`${actionClassName}`} onClick={this.handleActionClick(action)}>{data.like_count}</Link>
                  <a className={'components-community-item-footer-comment'} onClick={this.entry} data-info={JSON.stringify(data)}>{data.comment_count}</a>
                </div>
              </div>
            </div>
          </div>
          {this.props.isDisplayLine ? null : <div className="line1px" />}

        </div>
        <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
        只有登录的用户才能点赞和评论哦～
        </Dialog>
      </div >
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({ requestUserInfo, userCenterAction },
    dispatch),
)(COMMUNITYITEM);
