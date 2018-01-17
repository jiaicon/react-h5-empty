/**
 * @file 我的志愿圈
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CommunityItem from '../../../components/community_item/index';

import { isWindowReachBottom } from '../../../utils/funcs';

import './circle.css';
import Link from '../../../components/link/link';
import { moreFeelingAction } from './circle.store';
import { userCenterAction } from '../my.store';


import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

import history from '../../history';
import { requestUserInfo } from '../../../stores/common';

class Circle extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      showDialogA: false,
    });
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
    this.requestList(false);
    this.props.requestUserInfo();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }
  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.requestList(true);
    }
  }
  requestList(more) {
    const { moreFeeling: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.moreFeelingAction({
      type: 1,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }
  renderCommunity() {
    return (
      <div>
        {
          this.props.moreFeeling.data && this.props.moreFeeling.data.list ? this.props.moreFeeling.data.list.map(listData => (
            <CommunityItem data={listData} isDetailEntry key={listData.id} />
          )) : null

        }
      </div>
    );
  }
  onPublish() {
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      history.push('/my/circlepublish/1');
    } else {
      this.setState({ ...this.state, showDialogA: true });
    }
  }
  render() {
    return (
      <div className="page-circle-container">
        <div className="page-circle-header-container">
          <div className="page-circle-header-top">
            <Link className="page-circle-header-top-link-container" to="/my/circlelist">
              <div className="page-circle-header-top-link-icon page-circle-header-top-link-icon-ld" ><span className="page-circle-header-top-link-icon-ld-ponit">16</span></div>
              消息列表
            </Link>
            <div className="line1px-v page-circle-header-top-line" />
            <div className="page-circle-header-top-link-container" onClick={this.onPublish}>
              <div className="page-circle-header-top-link-icon page-circle-header-top-link-icon-publish" />
              发布动态
            </div>
          </div>
          <div className="line1px" />

        </div>
        {this.renderCommunity()}
        <Dialog type="ios" title={this.dialogA.title} buttons={this.dialogA.buttons} show={this.state.showDialogA}>
          只有登录的用户才能点赞和评论哦～
        </Dialog>

      </div>
    );
  }
}


Circle.title = '我的志愿圈';

Circle.propTypes = {

};
// team: state.my.team,

export default connect(
  state => ({
    moreFeeling: state.circle.moreFeeling,
    user: state.user,

  }),
  dispatch => bindActionCreators({ moreFeelingAction, userCenterAction, requestUserInfo },
    dispatch),
)(Circle);

