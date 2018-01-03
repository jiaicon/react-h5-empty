/**
 * @file 星币
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './point.css';
import { scoreAction } from '../my.store';

import POINTITEM from './component/pointItem';


class PointIncome extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.scoreAction(0);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const listData = this.props.score.data;
    return (
      <div className="page-point-income-pay-container">
        <div className="line1px" />
        <div className="page-point-income-pay-title">
          <span>项目</span>
          <span>时间</span>
          <span>星币</span>
        </div>
        <div className="line1px" />
        <div className="page-point-income-pay-main-contain">
          {listData && listData.list.length >= 1 ?
            <POINTITEM data={listData.list} /> : <span className="page-point-income-pay-main-empty">暂无记录</span>}

        </div>
      </div>
    );
  }
}

PointIncome.title = '我的星币明细';

PointIncome.propTypes = {

};

export default connect(
  state => ({
    score: state.my.score,
  }),
  dispatch => bindActionCreators({ scoreAction }, dispatch),
)(PointIncome);
