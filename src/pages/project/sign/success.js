/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './signUp.css';
;


class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.projectId;
    // this.lastId = props.route.params.lastId;
    this.state = {
   
    };



   
  }

  componentWillMount() {
    
  }


  onTabChange(idx) {
    
  }
  componentWillReceiveProps(nextProps) {
    
  }
  componentWillDidmount() {

  }
  componentWillUnmount() {
    // document.title = '标题';
  }


  render() {
  


    return (
      <div className="page-project-detail">
       111
      </div>
    );
  }
}

SignUpPage.propTypes = {
  requestProjectDetail: PropTypes.func,
  feelingAction: PropTypes.func,
  collectProject: PropTypes.func,
  unCollectProject: PropTypes.func,
  joinProject: PropTypes.func,
  saveProjectTabIndex: PropTypes.func,
  requestUserInfo: PropTypes.func,
  quitProject: PropTypes.func,
  detail: PropTypes.shape({
    fetchingId: PropTypes.string,
    data: PropTypes.shape({}),
    tabIndex: PropTypes.number,
  }),
  user: PropTypes.shape({
    isLogin: PropTypes.bool,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
};

SignUpPage.title = '报名信息';

export default SignUpPage