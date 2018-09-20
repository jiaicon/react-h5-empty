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

import './circlelist.css';
import MessageItem from '../../../../components/circle_message/index';
import Link from '../../../../components/link/link';
import { isWindowReachBottom } from '../../../../utils/funcs';

import { newCommentAction } from '../circle.store';


class CircleList extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.requestList(false);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillReceiveProps( ) {
  
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.requestList(true);
    }
  }
  requestList(more) {
    const { newComment: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.newCommentAction({
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }

  render() {
    const { newComment:  { data: listData } } = this.props;
    const showLoadingMore = listData &&
    listData.page && (listData.page.current_page < listData.page.total_page);
    return (
      <div className="page-teams-container">

          <MessageItem data={listData ? listData.list : null} />
        
          {
            showLoadingMore
            ?
              <div className="component-loading-more">
                <img src="/images/icon_loading.png" alt="loading" />
              正在加载
            </div>
            : null
          }
      </div>
    );
  }
}


CircleList.title = '消息列表';

CircleList.propTypes = {

};
// team: state.my.team,

export default connect(
  state => ({
    newComment: state.circle.newComment,

  }),
  dispatch => bindActionCreators({ newCommentAction },
    dispatch),
)(CircleList);

