/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../components/share';
import { requestCheckinList, checkin } from '../signin/signin.store';
import { DateTextDelSeconds, DateTextDelSliceEnd } from '../../utils/funcs';
import './signin.css';


class SigninPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestCheckinList();
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
        this.props.checkin(result);
      },
      fail: (error) => {
        Alert.error(`扫码失败：${error && error.errMsg}`);
      },
    });
  }


    // const data = {
    //   list: [{
    //     id: 123,
    //     reward_time: 3.5123,
    //     clock_in_time: '2019-08-03 11:11:11',
    //   }],

    //   next: { begin: '2017-10-11 11:01:11',
    //     end: '2017-1-11 11:11:11',
    //     reward_time: 2.0,
    //     project: {
    //       id: 123,
    //       name: '程序员慰问团',
    //       list_photo: 'http://image.com/1.jpg',
    //       province_id: '100100',
    //       province_name: '河北',
    //       city_id: 11,
    //       city_name: '保定',
    //       county_id: 11,
    //       county_name: '望都',
    //       addr: 'ssss',
    //       content: '富文本',
    //       join_end: '2017-10-10',
    //       begin: '2013-03-03 12:12:12',
    //       end: '2013-03-03 12:12:12',
    //       people_count: 133,
    //       join_people_count: 13,
    //       lng: 123.123433,
    //       lat: 40.984,
    //       reward_time: 13.5,
    //       created_at: '2017-11-11 11:11:11',
    //       project_status: 2,
    //       distance: 2554.5801072666,
    //       join_status: 1,
    //       my_reward_time: 10,
    //       collection_status: 1,
    //     },
    //   },

    // };
    // const records = data && data.list ? data.list : [];
    // const next = data && data.next && data.next.project ? data.next : null;
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
                    <span>{DateTextDelSeconds(next.begin)}-{DateTextDelSliceEnd(next.end)}</span>
                  </div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  <div className="project-title">{next.project && next.project.name}</div>
                  <div className="project-duration">
                    <span>可获得志愿者时长</span>
                    <span>{next.reward_time.toPrecision(2)}小时</span>
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
                    <span>{DateTextDelSliceEnd(record.clock_in_time)}</span>
                  </div>
                  <div>已签到</div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  <div className="project-title">{record.project && record.project.name}</div>
                  <div className="project-duration">
                    <span>获得志愿者时长</span>
                    <span>{record.reward_time.toPrecision(2)}小时</span>
                  </div>
                </div>
              </li>)
          }
        </ul>
        <div className="signin-btn-container">
          <a className="signin-btn" onClick={this.handleSignin}>
            点击签到
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
  dispatch => bindActionCreators({ requestCheckinList, checkin }, dispatch),
)(SigninPage);
