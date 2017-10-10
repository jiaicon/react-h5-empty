/**
 * @file 志愿项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import './applysItem.css';

class applysItem extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="page-applys-item-container">
        <div className="page-applys-item-title">项目名项目名。。。。。。</div>
        <div className="page-applys-item-date-box">
          <div className="page-applys-item-date">申请补录时长<span>10小时</span></div>
          <div className="page-applys-item-content-wait" />
        </div>
        <div className="line1px" />
      </div>
    );
  }
}


applysItem.title = '志愿时长申请item';


export default applysItem;
