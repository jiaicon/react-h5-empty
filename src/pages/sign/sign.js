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

    var options = {
      enableHighAccuracy: true, //boolean 是否要求高精度的地理信息，默认为false
      maximumAge: 1000 //应用程序的缓存时间
    }

    let that = this;

    isWeChatMiniApp().then((res) => {
      that.setState({
        isWeChatMiniApp: res ? '是' : "否",
      })
      console.log(':::::::::::::::::::::::::isWeChatMiniApp', isWeChatMiniApp);
    });

    if (navigator.geolocation) {
      //浏览器支持geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        //经度
        const longitude = position.coords.longitude;
        //纬度
        const latitude = position.coords.latitude;
        this.setState({ longitude, latitude });
        console.log("::::::::::::::::::::::::::::", longitude, latitude)
      }, (error) => {
        console.log("::::::::::::::::::::::::::::", error);
      }, options);

    } else {
      //浏览器不支持geolocation
      console.log("浏览器不支持!");
    }
    // this.props.requestCheckinList();

    // let geolocation = new qq.maps.Geolocation(
    //     "GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI",
    //     "myapp"
    // );
    // let options = { timeout: 8000 };
    // geolocation.getLocation(function (position) {
    //     const lat = position.lat; // 纬度，浮点数，范围为90 ~ -90
    //     const lng = position.lng; // 经度，浮点数，范围为180 ~ -180
    //     const expires = Date.now() + 5 * 60 * 1000; // 5分钟过期
    //     console.log("获取新位置成功", position);
    //     setCookie("location", JSON.stringify({ lat, lng }), 1);
    // }, options);
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
