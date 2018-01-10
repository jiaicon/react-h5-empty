/**
 * @file 客服中心
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
import './center.css';
import Avatar from '../../../components/avatar/avatar';


class Center extends React.Component {

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
    const content = window.orgInfo.org_service;
    const phone = window.orgInfo.org_service_tel;
    return (
      <div className="page-center-container">
        <div
          className="page-center-style" dangerouslySetInnerHTML={{
            __html: content ?
          content.replace(/(\n+)/g, '<br/>') : '暂无介绍' }}
        />
        {phone ? <div className="page-center-phone-take" /> : null}
        {phone ? <a href={`tel:${phone}`} className="page-center-phone">客服电话</a> : null}

      </div>
    );
  }
}


Center.title = '客服中心';

Center.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Center);
