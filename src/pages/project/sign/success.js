/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

import history from '../../history';

import './success.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';


class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.projectId;
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

  goBackProject(){
    window.location.replace(`/project/detail/${ this.projectId}`)
    // history.replace(`/project/detail/${ this.projectId}`)
  }
  goBackIndex(){
    window.location.replace(`/`)
    // history.replace(`/`)
  }
  render() {
  
const { t } = this.props;

    return (
      <div className="page-project-success">
        <div className="logo"></div>

        <div  className="fonts">{t('报名成功')}</div>
        <div className="btn project" onClick={this.goBackProject}>{t('返回项目详情')}</div>
        <div className="btn index" onClick={this.goBackIndex}>{t('返回首页')}</div>
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

SignUpPage.title = i18next.t('报名成功');

export default translate('translations')(SignUpPage)