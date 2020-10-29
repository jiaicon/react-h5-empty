/**
 * @file 入口页，登陆注册
 */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADMIN_HOST } from '../../../utils/config';
import { requestUserInfo } from '../../../stores/common';
import './entry.css';
import { storeLoginSource } from '../login/login.store';
import i18next from 'i18next';
import { translate } from 'react-i18next';

class Entry extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const { from } = this.props.login.login;
    if (from) {
      this.props.storeLoginSource(from)
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() { }
  onLogin() {
    window.location.href = '/my/login';
    // history.replace('/my/login')
  }
  render() {
    const { t } = this.props;
    let loginRegisterClassName = t('team-login-entry');
    if (window.orgCode === "EKQe1RaJYv") {
      loginRegisterClassName = "page-entry-team-btn-dalu";
    }
    let personLoginRegisterClassName = t('person-entry');
    let pageEntryPersonClassName = "page-entry-person";
    let pageEntryTeamClassName = t('team-register-entry');
    let pageEntryTeamImg = 'page-entry-team';

    if (window.orgCode === "mWZdPNwaKg") {
      personLoginRegisterClassName = t('person-entry-bmw');
      loginRegisterClassName = t('team-login-entry-bmw');

      pageEntryPersonClassName = "page-entry-person-bmw";
      pageEntryTeamImg='page-entry-team-bmw';
      pageEntryTeamClassName = t('team-register-entry-bmw')
    }



    return (
      <div className="page-entry">
        <div className={pageEntryPersonClassName} />
        <a onClick={this.onLogin}>
          <div className={personLoginRegisterClassName} />
        </a>
        <div className="page-line-box">
          <div className="line1px" style={{ width: '56px' }} />
          <p className="page-fonts">OR</p>
          <div className="line1px" style={{ width: '56px' }} />
        </div>
        <div className={pageEntryTeamImg} />
        <div className="page-entry-team-box">
          <a href={`${ADMIN_HOST}/login/${window.orgCode}`}>
            <div className={loginRegisterClassName} />
          </a>
          <a href={`${ADMIN_HOST}/register/${window.orgCode}`}>
            <div className={pageEntryTeamClassName} />
          </a>
        </div >

      </div >
    );
  }
}


Entry.title = i18next.t('登录');

Entry.propTypes = {
  requestUserInfo: PropTypes.func,
  user: PropTypes.shape({
    data: PropTypes.shape({
      isLogin: PropTypes.bool,
      token: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string,
      phone: PropTypes.string,
      avatars: PropTypes.string,
      real_name: PropTypes.string,
      nation: PropTypes.string,
      sex: PropTypes.number,
      birthday: PropTypes.string,
      identifier: PropTypes.string,
      slogan: PropTypes.string,
      reward_time: PropTypes.string,
      id_number: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      province_id: PropTypes.number,
      province_name: PropTypes.string,
      city_id: PropTypes.number,
      city_name: PropTypes.string,
      county_id: PropTypes.number,
      county_name: PropTypes.string,
      addr: PropTypes.string,
      family_id: PropTypes.number,
      join_family_time: PropTypes.string,
      good_at: PropTypes.arrayOf(PropTypes.shape({

      })),
    }),
  }),
};

export default connect(
  state => ({
    user: state.user,
    login: state.login,
  }),
  dispatch => bindActionCreators({ requestUserInfo, storeLoginSource }, dispatch),
)(translate('translations')(Entry));
