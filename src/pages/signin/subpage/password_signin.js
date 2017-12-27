/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../../components/share';
import { } from '../../signin/signin.store';
import './password_signin.css';


class PasswordSigninPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}


  render() {
    return (
      <div className="page-password-container">
        <div className="page-password-title">输入团队提供的数字，即可完成签到</div>

        <div className="page-password-input-container">
          <input type="number" min="0" max="9" className="page-password-input" ref={(c) => { this.passwordA = c; }} onKeyUp={this.onTextChanged} />
          <input type="number" min="0" max="9" className="page-password-input" ref={(c) => { this.passwordB = c; }} onKeyUp={this.onTextChanged} />
          <input type="number" min="0" max="9"className="page-password-input" ref={(c) => { this.passwordC = c; }} onKeyUp={this.onTextChanged} />
          <input type="number" min="0" max="9" className="page-password-input" ref={(c) => { this.passwordD = c; }} onKeyUp={this.onTextChanged} />
          <input type="number" min="0" max="9" className="page-password-input" ref={(c) => { this.passwordE = c; }} onKeyUp={this.onTextChanged} />
          <input type="number" min="0" max="9" className="page-password-input" ref={(c) => { this.passwordD = c; }} onKeyUp={this.onTextChanged} />
        </div>
      </div>
    );
  }
}

PasswordSigninPage.title = '密令打卡';

PasswordSigninPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};

export default connect(
  state => state.signin || {},
  dispatch => bindActionCreators({ }, dispatch),
)(PasswordSigninPage);
