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

import './visits.css';
import Link from '../../../components/link/link';
import { moreFeelingAction,
        deleteFeelingAction,
        unObserveAction,
        observeAction,
         } from './circle.store';
import { userCenterAction } from '../my.store';


import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

import history from '../../history';
import { requestUserInfo } from '../../../stores/common';

class CircleVists extends React.Component {

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

  componentWillReceiveProps(nextProps) {
    const { deleteFeeling: LdeleteFeeling } = this.props;
    const { deleteFeeling: NdeleteFeeling } = nextProps;
    if (LdeleteFeeling.fetching && !NdeleteFeeling.fetching && !NdeleteFeeling.failed) {
      this.requestList(false);
      this.props.requestUserInfo();
    }
    const { observe: Lobserve, unObserve: LunObserve } = this.props;
    const { observe: Nobserve, unObserve: NunObserve } = nextProps;
    if (Lobserve.fetching && !Nobserve.fetching && !Nobserve.failed) {
      this.requestList(false);
      this.props.requestUserInfo();
    }
    if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
      this.requestList(false);
      this.props.requestUserInfo();
    }
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
  onParse(id) {
    this.props.observeAction(id);
  }
  unOnParse(id) {
    this.props.unObserveAction(id);
  }
  renderCommunity() {
    return (
      <div>
        {
          this.props.moreFeeling.data && this.props.moreFeeling.data.list ? this.props.moreFeeling.data.list.map(listData => (
            <CommunityItem
              data={listData} isDetailEntry key={listData.id} onDeleteClick={this.delete} routeData={this.props.route}
              onParseClick={this.onParse} onUnParseClick={this.unOnParse}
            />
          )) : null

        }
      </div>
    );
  }
  onPublish() {
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      history.replace('/my/circlepublish/1');
    } else {
      this.setState({ ...this.state, showDialogA: true });
    }
  }
  delete(id) {
    this.props.deleteFeelingAction(id);
  }
  render() {
    return (
      <div className="page-circlevisits-container">
        {this.renderCommunity()}
        <div className="page-circlevisits-team-detail-community-link" onClick={this.onPublish} />
        <Dialog type="ios" title={this.dialogA.title} buttons={this.dialogA.buttons} show={this.state.showDialogA}>
          只有登录的用户才能点赞和评论哦～
        </Dialog>

      </div>
    );
  }
}


CircleVists.title = '社区互动';

CircleVists.propTypes = {

};
// team: state.my.team,

export default connect(
  state => ({
    user: state.user,
    deleteFeeling: state.circle.deleteFeeling,
    observe: state.circle.observe,
    unObserve: state.circle.unObserve,
    moreFeeling: state.circle.moreFeeling,
  }),
  dispatch => bindActionCreators({

    userCenterAction,
    requestUserInfo,
    deleteFeelingAction,
    unObserveAction,
    observeAction,
    moreFeelingAction },
    dispatch),
)(CircleVists);

