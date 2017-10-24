/**
 * @file 入口页，登陆注册
 */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import { ADMIN_HOST } from '../../../utils/config';
import './entry.css';

class Entry extends React.Component {

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
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Entry);
