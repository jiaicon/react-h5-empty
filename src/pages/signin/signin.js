/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../components/share';
import Link from '../../components/link/link';
import { requestCheckinList, checkin } from '../signin/signin.store';
import './signin.css';
import history from '../history';

import { getCity, getLocation } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../home/home.store';

import SignItem from '../../components/signItem/index.js'
class SigninPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestCheckinList();
  }

  componentDidMount() {
 
  }

  componentWillReceiveProps(nextProps) {
    const { checkinData: LcheckinData } = this.props;
    const { checkinData: NcheckinData } = nextProps;
    if (LcheckinData.fetching && !NcheckinData.fetching && !NcheckinData.failed) {
      this.props.requestCheckinList();
    }
  }

  componentWillUnmount() {}

  // handleSignin() {
  //   wx.ready(() => {
  //     wx.scanQRCode({
  //       needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
  //       scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
  //       success: (res) => {
  //         const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
  //         this.props.checkin(result, 1);
  //       },
  //       fail: (error) => {
  //         Alert.error(`扫码失败：${error && error.errMsg}`);
  //       },
  //     });
  //   });
  // }

  render() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    const next = data && data.next && data.next.project ? data.next : null;

    return <div className="page-signin">
      {/* <SignItem data={null}/> */}
    </div>;
  }
}

SigninPage.title = '签到打卡';

SigninPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};
export default connect(
  state => ({
    data: state.signin.ckeckinList.data,
    checkinData: state.signin.checkin,
  }),
  dispatch => bindActionCreators({ requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity }, dispatch),
)(SigninPage);
