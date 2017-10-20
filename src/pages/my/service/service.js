/**
 * @file 服务中心
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
import Link from '../../../components/link/link';
import './service.css';

class Service extends React.Component {

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
      <div className="page-service">
        <Link to="/my/service/introduce">
          <div className="page-service-item">
            <div className="page-service-item-fonts-box">
              <h3>平台介绍</h3>
              <p>Platform introduction</p>
            </div>
            <div className="page-service-item-bg page-service-item-bg1" />

          </div>
          <div className="line1px" />
        </Link>
        <Link to="/my/service/help">
          <div className="page-service-item">
            <div className="page-service-item-fonts-box">
              <h3>使用帮助</h3>
              <p>Use help</p>
            </div>
            <div className="page-service-item-bg page-service-item-bg2" />

          </div>
          <div className="line1px" />
        </Link>
        <a href="tel:010 - 26002600">
          <div className="page-service-item">
            <div className="page-service-item-fonts-box">
              <h3>客服中心</h3>
              <p>Customer service center</p>
            </div>
            <div className="page-service-item-bg page-service-item-bg3" />
          </div>
        </a>

      </div>
    );
  }
}


Service.title = '服务中心';

Service.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Service);
