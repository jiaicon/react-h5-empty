/**
 * @file 入口页，登陆注册
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
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
          <div className="page-line" />
          <p className="page-fonts">OR</p>
          <div className="page-line" />
        </div>
        <div className="page-entry-team" />
        <div className="page-entry-team-btn" />
        <div className="page-entry-bottom">
          <Link to="/my/register">
            <div className="page-entry-bottom-person">个人注册</div>
          </Link>
          <div className="page-entry-bottom-line" />
          <div className="page-entry-bottom-person">团队注册</div>
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
