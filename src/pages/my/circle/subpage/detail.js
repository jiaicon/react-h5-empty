/**
 * @file 我的志愿圈-消息列表
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';


import './detail.css';
import Link from '../../../../components/link/link';

import CommunityItem from '../../../../components/community_item/index';
import { feelingDetailAction, postCommentAction, deleteCommentAction, deleteFeelingAction, unObserveAction, observeAction } from '../circle.store';
import { requestUserInfo } from '../../../../stores/common';
import { userCenterAction } from '../../my.store';
import AVATAR from '../../../../components/avatar/avatar';
import history from '../../../history';

import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

function isTrue(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      return true;
    }
  }
}

class CircleDetail extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = props.route.params.Id;
    this.state = ({
      user: null,
      feelId: null,
      trigger: false,
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
    this.props.feelingDetailAction(this.Id);
    this.props.requestUserInfo();
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const nextId = nextProps.route.params.Id;
    if (nextId !== this.Id) {
      this.props.feelingDetailAction(nextId);
      this.props.requestUserInfo();
      this.Id = nextId;
    }
    const { postComment: LpostComment } = this.props;
    const { postComment: NpostComment } = nextProps;
    if (LpostComment.fetching && !NpostComment.fetching && !NpostComment.failed) {
      this.props.feelingDetailAction(this.Id);
      this.comment.value = '';
      this.setState({
        ...this.state,
        comment: '',
      });
    }
    const { deleteComment: LdeleteComment } = this.props;
    const { deleteComment: NdeleteComment } = nextProps;
    if (LdeleteComment.fetching && !NdeleteComment.fetching && !NdeleteComment.failed) {
      this.props.feelingDetailAction(this.Id);
    }
    const { deleteFeeling: LdeleteFeeling } = this.props;
    const { deleteFeeling: NdeleteFeeling } = nextProps;
    if (LdeleteFeeling.fetching && !NdeleteFeeling.fetching && !NdeleteFeeling.failed) {
      history.replace('/my/circlevisits');
    }

    const { observe: Lobserve, unObserve: LunObserve } = this.props;
    const { observe: Nobserve, unObserve: NunObserve } = nextProps;
    if (Lobserve.fetching && !Nobserve.fetching && !Nobserve.failed) {
      this.props.feelingDetailAction(nextId);
      this.props.requestUserInfo();
    }
    if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
      this.props.feelingDetailAction(nextId);
      this.props.requestUserInfo();
    }
  }

  componentWillUnmount() {

  }

  selected(e) {
    const info = JSON.parse(e.currentTarget.getAttribute('data-info'));
    const userInfo = info.user_info;
    const feelId = info.feeling_id;
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      this.comment.focus();
      this.setState({
        ...this.state,
        user: userInfo.username,
        feelId,
      });
    } else {
      this.setState({ ...this.state, showDialog: true });
    }
  }
  onHandleFocus() {
    this.comment.focus();
  }
  onClearUser() {
    this.setState({ ...this.state, user: null, feelId: null });
  }
  onTextChanged(evt) {
    evt.preventDefault();
    const { user: { isLogin } } = this.props;
    const comment = this.comment.value.replace(/(^\s+)|(\s+$)/g, '');
    if (isLogin) {
      this.setState({
        ...this.state,
        comment,
      });
    }
  }
  isLogin(evt) {
    evt.preventDefault();
    const { user: { isLogin } } = this.props;
    if (!isLogin) {
      // 未登录屏蔽软键盘
      document.activeElement.blur();
      this.setState({ ...this.state, showDialog: true });
    }
  }
  delete(id) {
    this.props.deleteFeelingAction(id);
  }
  deleteComment(e) {
    const id = JSON.parse(e.target.getAttribute('data-info')).id;
    this.setState({
      ...this.state,
      user: null,
    });
    this.props.deleteCommentAction(id);
  }
  submit(evt) {
    evt.preventDefault();
    const feelId = this.state.feelId;
    const comment = this.state.comment;
    if (!comment) {
      Alert.warning('请输入评论');
      return;
    }
    if (feelId) {
      this.props.postCommentAction({ id: this.Id, comment, parent_id: feelId });
    } else {
      this.props.postCommentAction({ id: this.Id, comment });
    }
  }
  renderRemark() {
    return (
      <div className="page-circleDetail-remark-container">
        <div className="page-circleDetail-remark-main">
          {
            (this.props.feelingDetail && this.props.feelingDetail.data && this.props.feelingDetail.data.like_list.length >= 1) ||
           (this.props.feelingDetail && this.props.feelingDetail.data && this.props.feelingDetail.data.comment_list.length >= 1
            && isTrue(this.props.feelingDetail.data.comment_list.map(item => (
                Boolean(item.is_display)
              ))))
            ? <span className="page-circleDetail-remark-main-tri" />
            : null
          }
          {this.props.feelingDetail && this.props.feelingDetail.data && this.props.feelingDetail.data.like_list.length >= 1 ?
            <div>
              <div className="page-circleDetail-remark-main-like-container" onClick={this.onClearUser}>
                <div className="page-circleDetail-remark-main-like-icon" />
                <div className="page-circleDetail-remark-main-like-people" >
                  {this.props.feelingDetail && this.props.feelingDetail.data && this.props.feelingDetail.data.like_list.length >= 1 ?
                    this.props.feelingDetail.data.like_list.map((item, index) =>
                  (<AVATAR className="page-circleDetail-remark-main-like-people-item" src={item.avatars} size={{ width: 35, height: 35, radius: 1 }} />)) : null
                  }
                </div>
              </div>
              <div className="line1px" />
            </div>
            : null
          }
          {
            this.props.feelingDetail && this.props.feelingDetail.data
            && this.props.feelingDetail.data.comment_list.length >= 1
            && isTrue(this.props.feelingDetail.data.comment_list.map(item => (
                Boolean(item.is_display)
              ))) ?
                <div>
                  <div className="page-circleDetail-remark-main-like-container">
                    <div className="page-circleDetail-remark-main-comment-icon-container" onClick={this.onClearUser} > <div className="page-circleDetail-remark-main-comment-icon" /></div>
                    <div className="page-circleDetail-remark-main-comment" >
                      {
                      this.props.feelingDetail &&
                      this.props.feelingDetail.data && this.props.feelingDetail.data.comment_list.length >= 1
                      && isTrue(this.props.feelingDetail.data.comment_list.map(item => (
                        Boolean(item.is_display)
                      ))) ?
                      this.props.feelingDetail.data.comment_list.map((item) => {
                        const isDispaly = item.is_display;
                        return (
                          <div>
                            {
                              isDispaly ?
                                <div style={{ paddingRight: '10px' }}>
                                  <div className="page-circleDetail-remark-components-container" data-info={JSON.stringify(item)} onClick={this.selected}>
                                    <AVATAR className="page-circleDetail-remark-components-avatar" src={item.user_info.avatars} size={{ width: 35, height: 35, radius: 1 }} />
                                    <div className="page-circleDetail-remark-components-right">
                                      <div className="page-circleDetail-remark-components-name-container">
                                        <div className="page-circleDetail-remark-components-name">{item.user_info.real_name || item.user_info.username}</div>
                                        <div className="page-circleDetail-remark-components-time">{item.created_at}</div>
                                      </div>
                                      <div className="page-circleDetail-remark-components-comment">
                                        {
                                          !item.comment_to ? null : '回复'
                                        }
                                        {
                                          item.comment_to ? <span className="page-circleDetail-remark-components-comment-to-name">{item.comment_to.username}</span> : null
                                        }
                                        {
                                          !item.comment_to ? null : '：'
                                          }
                                        {item.comment}

                                      </div>
                                      <div className="page-circleDetail-remark-components-comment-delete" >
                                        {
                                        this.props.user.id === item.user_info.id ? <a onClick={this.deleteComment} data-info={JSON.stringify(item)}>删除</a> : null
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="line1px" />
                                </div> : null
                            }
                          </div>

                        );
                      }) : null
               }

                    </div>
                  </div>
                </div>
            : null
          }


        </div>
        <div className="page-circleDetail-takeup" />
        <div className="page-circleDetail-remark-send-message-container">
          <div className="line1px" />
          <div className="page-circleDetail-remark-send-message-main" >
            <textarea
              placeholder={this.state.user == null ? '回复' : `回复 ${this.state.user}：`}
              className="page-circleDetail-remark-send-message-main-text" maxLength="200"
              ref={(c) => { this.comment = c; }} onBlur={this.onTextChanged} onFocus={this.isLogin}
            />
            <div className="page-circleDetail-remark-send-message-main-send" onClick={this.submit}>发表</div>

          </div>
        </div>
        <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
        只有登录的用户才能点赞和评论哦～
        </Dialog>
      </div>
    );
  }
  onParse(id) {
    this.props.observeAction(id);
  }
  unOnParse(id) {
    this.props.unObserveAction(id);
  }
  render() {
    return (
      <div className="page-circleDetail-container">
        {
          this.props.feelingDetail && this.props.feelingDetail.data ?
            <div>
              <CommunityItem
                data={this.props.feelingDetail.data} isDetailEntry isDescTrigger isDisplayLine
                routeData={this.props.route} onDeleteClick={this.delete} onParseClick={this.onParse}
                onUnParseClick={this.unOnParse} onFocusClick={this.onHandleFocus}
              />
              {this.renderRemark()}
            </div>
          : null
        }
      </div>
    );
  }
}


CircleDetail.title = '互动社区';

CircleDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
  deleteCommentAction: PropTypes.func,
};

export default connect(
  state => ({
    feelingDetail: state.circle.feelingDetail,
    postComment: state.circle.postComment,
    deleteComment: state.circle.deleteComment,
    deleteFeeling: state.circle.deleteFeeling,
    user: state.user,
    observe: state.circle.observe,
    unObserve: state.circle.unObserve,
  }),
  dispatch => bindActionCreators({
    feelingDetailAction,
    postCommentAction,
    deleteCommentAction,
    requestUserInfo,
    deleteFeelingAction,
    unObserveAction,
    observeAction,
    userCenterAction,
  },
    dispatch),
)(CircleDetail);

