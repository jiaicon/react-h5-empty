/**
 * @file 志愿项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './durationItem.css';

class DurationItem extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="page-duration-item-container">
        <div className="page-duration-item-container-main">
          <div className="page-duration-item-container-main-top">
            <div className="page-duration-item-container-main-top-title">项目11111</div>
            <div className="page-duration-item-container-main-top-date-box">
              <div className="page-duration-item-container-main-top-date-icon page-duration-item-container-main-top-date-icon-date" />
              <div className="page-duration-item-container-main-top-date-info">20011-2012</div>
            </div>
            <div className="page-duration-item-container-main-top-date-box">
              <div className="page-duration-item-container-main-top-date-icon page-duration-item-container-main-top-date-icon-addr" />
              <div className="page-duration-item-container-main-top-date-info">0.6km</div>
            </div>
          </div>
          <div className="line1px" />
          <div className="page-duration-item-container-main-bottom">
            <div className="page-duration-item-container-main-bottom-logo-box">
              <div className="page-duration-item-container-main-bottom-logo">
                <img src="/images/my/register.png" alt="" />
              </div>
              <div>儿童基金会</div>
            </div>
            <div className="page-duration-item-container-main-bottom-date-box">已获得志愿时长：<span>11小时</span></div>
          </div>
        </div>


      </div>
    );
  }
}


DurationItem.title = '志愿项目';


export default DurationItem;
