/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../components/share';
import Link from '../../components/link/link';
import { requestCheckinList, checkin, requestClockList } from '../sign/sign.store';
import history from '../history';

import { setCookie, isWeChatMiniApp } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../home/home.store';

import SignItem from '../../components/signItem/index.js'

class SignPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      longitude: null,
      latitude: null,
      isWeChatMiniApp: null,
    }
  }

  componentWillMount() {
    console.log('打开了 sign/sign.js 页面')


    isWeChatMiniApp().then((res) => {
      if (navigator.geolocation && res) {
        //浏览器支持geolocation
        navigator.geolocation.getCurrentPosition((position) => {
          //经度
          const longitude = position.coords.longitude;
          //纬度
          const latitude = position.coords.latitude;

          console.log("::::::::::::::::::::::::::::", longitude, latitude)
        }, (error) => {
          console.log("::::::::::::::::::::::::::::", error);
        }, {
          enableHighAccuracy: true, //boolean 是否要求高精度的地理信息，默认为false
          maximumAge: 1000 //应用程序的缓存时间
        });
      }
    });


    this.props.requestClockList();
  }

  componentDidMount() {
    if (window.userAgent) {
      wx.ready(() => {
        WXShare();
      });
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() { }


  render() {
    console.log(this.props);
    const { data } = this.props.clocklist;

    return <div>
      {/* <div>经度:{this.state.longitude}维度:{this.state.latitude},是否在小程序中18:48版本？{this.state.isWeChatMiniApp}</div> */}
      <SignItem data={data} />
    </div>;
  }
}

SignPage.title = '签到打卡';

SignPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};
export default connect(
  state => ({
    clocklist: state.sign.clocklist,
  }),
  dispatch => bindActionCreators({ requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity, requestClockList }, dispatch),
)(SignPage);
