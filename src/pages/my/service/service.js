/**
 * @file 服务中心
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './service.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';

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
  // <a href="tel:13240208305">
  render() {
    const { t } = this.props;
    return (
      <div className="page-service">
        <Link to="/my/service/introduce">
          <div className="page-service-item">
            <div className="page-service-item-fonts-box">
              <h3>{t('平台介绍')}</h3>
              <p>Platform introduction</p>
            </div>
            <div className="page-service-item-bg page-service-item-bg1" />

          </div>
          <div className="line1px" />
        </Link>
        <Link to="/my/service/help">
          <div className="page-service-item">
            <div className="page-service-item-fonts-box">
              <h3>{t('使用帮助')}</h3>
              <p>Use help</p>
            </div>
            <div className="page-service-item-bg page-service-item-bg2" />

          </div>
          <div className="line1px" />
        </Link>
        <Link to="/my/service/center">

          <div className="page-service-item">
            <div className="page-service-item-fonts-box">
              <h3>{t('客服中心')}</h3>
              <p>Customer service center</p>
            </div>
            <div className="page-service-item-bg page-service-item-bg3" />
          </div>
        </Link>

      </div>
    );
  }
}


Service.title = i18next.t('服务中心');

Service.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(translate('translations')(Service));
