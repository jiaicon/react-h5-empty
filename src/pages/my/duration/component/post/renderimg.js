/**
 * @file 上传图片
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import './renderimg.css';

class RenderImg extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="page-applys-item-render-container">
        <img src="/images/my/register.png" />
        <div className="page-applys-item-render-del" />
      </div>
    );
  }
}


RenderImg.title = '显示图片';


export default RenderImg;
