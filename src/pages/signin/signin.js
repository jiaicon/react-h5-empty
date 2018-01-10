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

import { getCity, getLocation } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../home/home.store';

Date.prototype.Format = function (fmt) { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
  return fmt;
};
class SigninPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestCheckinList();
    console.log('开始获取新位置');
    window.wx.ready(() => {
      console.log('获取新位置');
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          const lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const lng = res.longitude; // 经度，浮点数，范围为180 ~ -180
          const expires = Date.now() + (5 * 60 * 1000); // 5分钟过期

          console.log('获取新位置成功', res);

          localStorage.setItem('location', JSON.stringify({
            lat,
            lng,
            expires,
          }));


          getCity((city) => {
            this.props.saveCity(city);
            this.props.getAreaCity(city);
          });
        },
        fail: (error) => {
          if (fail) {
            Alert.error('定位失败，请确认同意微信定位授权');
          }
        },
      });
    });
  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  handleSignin() {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: (res) => {
        const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        this.props.checkin(result, 1);
      },
      fail: (error) => {
        Alert.error(`扫码失败：${error && error.errMsg}`);
      },
    });
  }

  render() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    const next = data && data.next && data.next.project ? data.next : null;

    return (
      <div className="page-signin">
        {
          data && data.list && data.list.length === 0 && !next ?
            <div className="no-record">
              <div>
                <img src="/images/signin.png" alt="" />
              </div>
              <span>
                <p>还没有项目可以签到</p>
                <p>快去加入项目吧</p>
              </span>
            </div> : null
        }
        <ul className="signin-list">
          {
            next ?
              <li>
                <div className="signin-header">
                  <div className="signin-time">
                    <span>下次签到时间</span>
                    <span>{new Date(Date.parse(next.begin.replace(/-/g, '/'))).Format('yyyy-MM-dd hh:mm')} - {new Date(Date.parse(next.end.replace(/-/g, '/'))).Format('hh:mm')}</span>
                  </div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  <div className="project-title">{next.project && next.project.name}</div>
                  <div className="project-duration">
                    <span>可获得志愿者时长</span>
                    <span>{parseInt(next.reward_time, 10)}小时</span>
                  </div>
                </div>
              </li>
            : null
          }
          {
            records.map(record =>
              <li key={record.clock_in_time} className="signin-record">
                <div className="signin-header">
                  <div className="signin-time">
                    <span>签到时间</span>
                    <span>{record.clock_in_time}</span>
                  </div>
                  <div>已签到</div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  <div className="project-title">{record.project && record.project.name}</div>
                  <div className="project-duration">
                    <span>获得志愿者时长</span>
                    <span>{parseInt(record.reward_time, 10)}小时</span>
                  </div>
                </div>
              </li>)
          }
        </ul>
        <div className="signin-btn-container">
          {/**  <Link to="/signin/password" className="signin-btn" >
            密令签到
          </Link> */}
          <Link to="/signin/password" className="signin-btn" >
            密令签到
          </Link>
          <a className="signin-btn" onClick={this.handleSignin}>
            扫码签到
          </a>
        </div>
      </div>
    );
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
  state => state.signin || {},
  dispatch => bindActionCreators({ requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity }, dispatch),
)(SigninPage);
