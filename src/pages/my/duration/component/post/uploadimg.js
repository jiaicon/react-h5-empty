/**
 * @file 上传图片
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import './uploadimg.css';

class upLoadImg extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="page-post-item-upload-container" />
    );
  }
}


upLoadImg.title = '上传图片';


export default upLoadImg;
