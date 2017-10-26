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

class Entry extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    if ( !user.isLogin ) {
      history.replace('/');
    }

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-entry">
        <div className="page-entry-person" />
        <Link to="/my/login">
          <div className="page-entry-person-btn" />
        </Link>
        <div className="page-line-box">
          <div className="line1px" style={{ width: '56px' }} />
          <p className="page-fonts">OR</p>
          <div className="line1px" style={{ width: '56px' }} />
        </div>
        <div className="page-entry-team" />
        <a href={`${ADMIN_HOST}/login/${window.orgCode}`}>
          <div className="page-entry-team-btn" />
        </a>
        <div className="page-entry-bottom">
          <Link to="/my/register">
            <div className="page-entry-bottom-person">
            个人注册

            </div>
            <div className="line1px" style={{ width: '100%', background: '#6AC6F8' }} />
          </Link>
          <div className="page-entry-bottom-line" />
          <a href={`${ADMIN_HOST}/register/${window.orgCode}`}>
            <div className="page-entry-bottom-person">
            团队注册
            </div>
            <div className="line1px" style={{ width: '100%', background: '#6AC6F8' }} />
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
  }),
  dispatch => bindActionCreators({requestUserInfo}, dispatch),
)(Entry);
