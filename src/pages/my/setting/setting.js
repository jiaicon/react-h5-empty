/**
 * @file 个人设置
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './setting.css';
import { logoutAction } from '../login/login.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Setting extends React.Component {

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
    const { user, t } = this.props;
    return <div className="page-setting">
        <Link to="/my/forget">
          <div className="page-setting-forget">
            <div className="page-setting-fonts">
            {user.have_pwd === 0 ? t('设置密码') : null}
            {user.have_pwd === 1 ? t('修改密码') : null}
            </div>
            <div className="page-setting-icon" />
          </div>
        </Link>
        <a className="page-setting-quit" onClick={this.props.logoutAction}>
          {t('退出登录')}
        </a>
      </div>;
  }
}


Setting.title = i18next.t('个人中心');

Setting.propTypes = {
  logoutAction: React.PropTypes.func,
};

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => bindActionCreators({ logoutAction }, dispatch)
)(translate('translations')(Setting));
