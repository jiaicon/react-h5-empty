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


import { newCommentAction } from '../circle.store';


class CircleList extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.newCommentAction();
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }

  render() {
    const { newComment: { data: listData } } = this.props;
    return (
      <div className="page-teams-container">
        <MessageItem data={listData} />

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

