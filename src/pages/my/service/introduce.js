/**
 * @file 平台介绍
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
import './introduce.css';

class Introduce extends React.Component {

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
    const content = window.orgInfo.org_info;
    return (
      <div
        className="page-introduce-style" dangerouslySetInnerHTML={{
          __html: content ?
          content.replace(/(\n+)/g, '<br/>') : '暂无介绍' }}
      />
    );
  }

}


Introduce.title = '平台介绍';

Introduce.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Introduce);
