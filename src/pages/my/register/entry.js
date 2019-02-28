/**
 * @file 入口页，登陆注册
 */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import { ADMIN_HOST } from '../../../utils/config';
import { requestUserInfo } from '../../../stores/common';
import history from '../../history';
import './entry.css';
import {storeLoginSource} from '../login/login.store';
class Entry extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const {from}=this.props.login.login;
    if(from){
      this.props.storeLoginSource(from)
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  onLogin(){
    window.location.href='/my/login';
    // history.replace('/my/login')
  }
  render() {
    let loginRegisterClassName = "page-entry-team-btn-default";
    if (window.orgCode === "EKQe1RaJYv") {
      loginRegisterClassName = "page-entry-team-btn-dalu"
    }

    let personLoginRegisterClassName = "page-entry-person-btn"
    if (window.orgCode === "VWPe9xdLyw" || window.orgCode === "oBDbDkxal2") {//测试正式环境的星巴克
      personLoginRegisterClassName = "page-entry-person-btn-Starbucks"
    }
    return (
      <div className="page-entry">
        <div className="page-entry-person" />
          <a onClick={this.onLogin}>
            <div className={personLoginRegisterClassName} />
          </a>
        <div className="page-line-box">
          <div className="line1px" style={{ width: '56px' }} />
                <p className="page-fonts">OR</p>
          <div className="line1px" style={{ width: '56px' }} />
        </div>
        <div className="page-entry-team" />
        <div className="page-entry-team-box">
          <a href={`${ADMIN_HOST}/login/${window.orgCode}`}>
            <div className={loginRegisterClassName} />
          </a>
          <a href={`${ADMIN_HOST}/register/${window.orgCode}`}>
            <div className={loginRegisterClassName} />
          </a>
        </div>
       
      </div>
    );
  }
}


Entry.title = '登录';

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
  state=> ({
    user: state.user,
    login:state.login,
  }),
  dispatch => bindActionCreators({requestUserInfo,storeLoginSource}, dispatch),
)(Entry);
