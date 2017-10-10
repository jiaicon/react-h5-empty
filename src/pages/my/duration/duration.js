/**
 * @file 志愿时长
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './duration.css';
import DutationItem from './component/durationItem';

class Duration extends React.Component {

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
      <div className="page-duration">

        <div className="page-duration-top-area-view">
          <div className="page-duration-top-area-view-duration-box">
            <p><span>1</span>个</p>
            <p>参加的项目</p>
          </div>
          <div className="page-duration-top-area-view-line" />
          <div className="page-duration-top-area-view-duration-box">
            <p><span>139</span>小时</p>
            <p>志愿总时长</p>
          </div>
        </div>
        <div className="line1px" />

        <div className="page-duration-main-box">
          <DutationItem />
          <DutationItem />
          <DutationItem />
          <DutationItem />
          <DutationItem />
        </div>


      </div>
    );
  }
}


Duration.title = '志愿时长';

Duration.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Duration);
