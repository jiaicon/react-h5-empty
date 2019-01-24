/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../../components/share';
import ReactCodeInput from '../../../components/code_input/ReactCodeInput';
import { checkin } from '../../sign/sign.store';
import './password_sign.css';
import history from '../../history';
import { getCity, getLocation } from '../../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../../home/home.store';


class PasswordsignPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
      if(window.userAgent) {
          wx.ready(() => {
              WXShare();
          });
      }
  }

  componentWillReceiveProps(nextProps) {
    const { checkinData: Lcheckin } = this.props;
    const { checkinData: Ncheckin } = nextProps;
    if (Lcheckin.fetching && !Ncheckin.fetching && !Ncheckin.failed) {
      // window.location.replace('/sign');
      history.replace('/sign');
    }
  }

  componentWillUnmount() {}
  onUserInput(e) {
    const key = e;
    this.setState({
      key,
    });
    if (key.length === 6) {
      this.props.checkin(key, 2);
    }
  }
  render() {
    return (
      <div className="page-password-container">
        <div className="page-password-title">输入团队提供的数字，即可完成签到</div>
        <ReactCodeInput
          onChange={this.onUserInput}
          value=""
          isValid
          fields={6}
          type="number"
          disabled={false}
          inputStyle={{
            borderBottom: '1px solid #E5E5E5',
            marginRight: '10px',
            paddingLeft: '6px',
            paddingRight: '6px',
            paddingTop: '15px',
            paddingBottom: '15px',
            textAlign: 'center',
            fontSize: '24px',
            boxSizing: 'border-box',
            color: 'black',
            backgroundColor: 'white',
            borderColor: 'lightgrey' }}
        />
      </div>
    );
  }
}

PasswordsignPage.title = '密令打卡';

PasswordsignPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkinData: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
  }),
  sign: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};

export default connect(
  state => ({
    checkinData: state.sign.checkin,
  }),
  dispatch => bindActionCreators({ checkin, requestHomeData, saveCity, getAreaCity }, dispatch),
)(PasswordsignPage);
