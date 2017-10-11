/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WXShare from '../../components/share';
import { requestCheckinList, checkin } from '../signin/signin.store';
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

  render() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    const next = data ? data.next : null;

    return (
      <div className="page-signin">
        {
          data && data.list && data.list.length === 0 ?
            <div className="no-record">
              <div>
                <img src="/images/signin.png" alt="" />
              </div>
              <span>
              暂无打卡记录
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
                    <span>{next.begin}</span>
                  </div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  <div className="project-title">{next.project && next.project.name}</div>
                  <div className="project-duration">
                    <span>可获得志愿者时长</span>
                    <span>{parseInt(next.project.reward_time, 10)}小时</span>
                  </div>
                </div>
              </li>
            : null
          }
          {
            records.map(record =>
              <li className="signin-record">
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
          <a className="signin-btn">
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
