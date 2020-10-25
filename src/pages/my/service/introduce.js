/**
 * @file 平台介绍
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './introduce.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';

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
    const { t } = this.props;
    const content = window.orgInfo.org_info;
    return (
      <div
        className="page-introduce-style" dangerouslySetInnerHTML={{
          __html: content ?
          content.replace(/(\n+)/g, '<br/>') : t('暂无介绍') }}
      />
    );
  }

}


Introduce.title = i18next.t('平台介绍');

Introduce.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(translate('translations')(Introduce));
