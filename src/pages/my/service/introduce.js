/**
 * @file 平台介绍
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
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
        <h5 className="page-introduce-title page-introduce-take-up">志多星平台介绍</h5>


        <div className="page-introduce-content page-introduce-take-up">
          <div className="page-introduce-content">志多星是由和众泽益公益志愿服务中心倾情打造的志愿者服务信息化管理平台，我们的使命是致力于为政府、企业、社会组织和志愿服务组织提供一站式线上志愿者管理服务，最终实现打造共享智慧志愿社区的愿景。</div>

          <div className="page-introduce-content">志多星不仅整合开发了灵活注册、打卡计时、活动管理、志愿攻略、志愿社区以及志愿保障等功能于一体，让志愿者管理机构能够随时、随地对团队、项目以及志愿者进行管理，让志愿者可以随时、随地参与志愿活动，更能够通过实名认证，将志愿服务数据同步政府官方“志愿云”志愿服务官方数据。同时，志多星积极响应政府对于志愿保障的倡导，创新性地将志愿保障纳入平台，为志愿者提供低价高保额的志愿服务定制保险产品，让志愿者安心、志愿机构放心。志多星提供了多样的线上志愿服务培训选择，让组织和志愿者可以随时随地接受专业的志愿服务培训。志多星还进一步为志愿者提供了激励回馈的平台，推动志愿服务在互联网+时代实现资源共享。
          </div>


        </div>

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
