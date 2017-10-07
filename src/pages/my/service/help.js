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
import './help.css';

class Help extends React.Component {

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
        <h5 className="page-introduce-title">志多星软件使用说明</h5>
        <div className="page-introduce-content page-introduce-take-up">
        欢迎您使用志多星志愿服务管理平台软件（以下简称“本软件”）及服务！本软件由北京志多星科技有限公司开发（以下简称“志多星”）。
        本软件在此特别提醒您（志愿者）在注册成为用户之前，请认真阅读《志多星软件使用说明》（以下简称“说明”），同时充分理解并同意遵守链接中的《志多星软件用户使用协议》（以下简称“协议”）中的各条款。
        </div>
        <h6 className="page-introduce-subtitle"> 一、账户注册</h6>
        <div className="page-introduce-content page-introduce-take-up"> 1、用户在使用本服务前需要注册一个本软件帐号。本软件帐号应当使用用户本人经实名认证的手机号码绑定注册。</div>
        <h6 className="page-introduce-subtitle"> 二、软件服务</h6>
        <div className="page-introduce-content"> 1、本软件是免费提供志愿者注册及组织创建的管理功能平台，其注册资料的真实性、有效性由活动的发布方保证。本软件或志多星不承担任何保证责任。</div>

      </div>
    );
  }
}


Help.title = '使用帮助';

Help.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Help);
