/**
 * @file 平台介绍
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
import './help.css';

class Help extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const content = window.orgInfo.org_manual;
    return (
      <div
        className="page-help-style" dangerouslySetInnerHTML={{
          __html: content ?
        content.replace(/(\n+)/g, '<br/>') : '暂无介绍' }}
      />
    );
  }
}


Help.title = '使用帮助';

Help.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Help);
