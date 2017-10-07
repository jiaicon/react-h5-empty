/**
 * @file 平台介绍
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
import Link from '../../../components/link/link';
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
    return (
      <div className="page-introduce">
        <div>平台介绍</div>
        <div>平台介绍</div>
        <div>平台介绍</div>


      </div>
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
