/**
 * @file 客服中心
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './center.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';


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
    const { t } = this.props;
    const content = window.orgInfo.org_service;
    const phone = window.orgInfo.org_service_tel;
    return (
      <div className="page-center-container">
        <div
          className="page-center-style" dangerouslySetInnerHTML={{
            __html: content ?
          content.replace(/(\n+)/g, '<br/>') : t('暂无介绍') }}
        />
        {phone ? <div className="page-center-phone-take" /> : null}
        {phone ? <a href={`tel:${phone}`} className="page-center-phone">{t('客服电话')}</a> : null}

      </div>
    );
  }
}


Center.title = i18next.t('客服中心');

Center.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(translate('translations')(Center));
