/**
 * @file 我的证书
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../history';
import { requestUserInfo } from '../../../stores/common';
import './certificate.css';

function year(data) {
  return data.split('-');
}
class Certificate extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      photo: '/Images/my/register.png',
    });
  }

  componentWillMount() {
    this.props.requestUserInfo();
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    const time = user.join_family_time;
    const arr = year(time);
    const day = arr[2].split(' ');
    const NowTime = new Date();
    const y = NowTime.getFullYear();
    let m = NowTime.getMonth() + 1;
    let d = NowTime.getDate();
    if (m < 10) {
      m = `0${m}`;
    }
    if (d < 10) {
      d = `0${d}`;
    }
    this.setState({
      ...this.state,
      year: arr[0],
      month: arr[1],
      day: day[0],
      y,
      m,
      d,
    });
  }

  componentWillUnmount() {}
  pop() {
    Alert.success('您还未实名注册，请先完成实名认证，获取个人志愿证书', {
      position: 'top-right',
      effect: 'stackslide',
      onShow() {
        setTimeout(() => {
          history.replace('/my/profile/detail/user');
        }, 3000);
      },
    });
  }
  renderCertificate() {
    const user = this.props.user;
    return (
      <div className="page-certificate-bg">
        <div className="page-certificate-container-border">
          <h5 className="page-certificate-container-title">志多星注册志愿服务证书</h5>
          <img className="page-certificate-container-photo" alt="" src={user.avatars ? user.avatars : this.state.photo} />
          <div className="page-certificate-container-certificate" />
          <div className="page-certificate-container-name">{user.real_name}</div>
          <div className="page-certificate-container-content">证书编号：{user.identifier}</div>
          <div className="page-certificate-container-content">{this.state.year}年{this.state.month}月{this.state.day}日注册成为志多星志愿者</div>
          <div className="page-certificate-container-content">截止{this.state.y}年{this.state.m}月{this.state.d}日</div>
          <div className="page-certificate-container-hours-box">
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>9</span>次</div>
              <div className="page-certificate-container-hours-item">累计服务次数</div>
            </div>
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>{user.reward_time}</span>小时</div>
              <div className="page-certificate-container-hours-item">累计服务时长</div>
            </div>
          </div>
          <div className="page-certificate-container-bussiness">认证机构：和众泽益志愿者服务中心</div>
        </div>
      </div>
    );
  }
  render() {
    const user = this.props.user;
    return (
      <div>
        {!user.real_name ? this.pop() : this.renderCertificate()}

      </div>
    );
  }
}


Certificate.title = '我的证书';

Certificate.propTypes = {
  requestUserInfo: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    id_number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    family_id: PropTypes.number,
    join_family_time: PropTypes.string,
    good_at: PropTypes.arrayOf(PropTypes.shape({

    })),
  }),
};

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({ requestUserInfo }, dispatch),
)(Certificate);
