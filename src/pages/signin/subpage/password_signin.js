/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../../components/share';
import ReactCodeInput from '../../../components/code_input/ReactCodeInput';
import { checkin } from '../../signin/signin.store';
import './password_signin.css';

import { getCity } from '../../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../../home/home.store';


class PasswordSigninPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    getCity((city) => {
      this.setState({
        ...this.state,
        city,
      });
      this.props.saveCity(city);
      this.props.getAreaCity(city);
    }, () => {
      Alert.error('定位失败，请确认同意微信定位授权');
      this.state = {
        city: '未定位',
      };
    });
  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { signin: Lsignin } = this.props;
    const { signin: Nsignin } = nextProps;
    if (Lsignin.fetching && !Nsignin.fetching && !Nsignin.failed) {
      history.replace('/signin');
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

PasswordSigninPage.title = '密令打卡';

PasswordSigninPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  signin: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};

export default connect(
  state => ({
    signin: state.signin,
  }),
  dispatch => bindActionCreators({ checkin, requestHomeData, saveCity, getAreaCity }, dispatch),
)(PasswordSigninPage);
