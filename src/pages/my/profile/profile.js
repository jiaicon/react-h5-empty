/**
 * @file 个人资料
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { requestUserInfo } from '../../../stores/common';
import {} from '../my.store';
import Link from '../../../components/link/link';
import './profile.css';


class Profile extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      photo: '',
      checkboxdata: [
        {
          num: 1,
          name: '关爱服务',
        },
        {
          num: 2,
          name: '国际服务',
        },
        {
          num: 3,
          name: '社区服务',
        },
        {
          num: 4,
          name: '应急救援',
        },
        {
          num: 5,
          name: '赛事服务',
        },
        {
          num: 6,
          name: '医疗卫生',
        },
        {
          num: 7,
          name: '绿色环保',
        },
        {
          num: 8,
          name: '文化倡导',
        },
        {
          num: 9,
          name: '教育',
        },
        {
          num: 10,
          name: '助残',
        },
        {
          num: 11,
          name: '助老',
        },
        {
          num: 12,
          name: '其他',
        },
      ],
    });
  }

  componentWillMount() {
    this.props.requestUserInfo();
    console.log(this.props.user);
    console.log(this.state.photo);
  }

  componentDidMount() {
    console.log(this.props.user);
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  onFileSelect=(evt) => {
    const file = evt.target.files[0];
    if (file) {
      const fd = new FormData();
      fd.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);

          if (!res.error_code) {
            this.setState({
              ...this.state,
              photo: res.data.url,
            });
            this.photo = res.data.url;
          } else {
            Alert.warning(`图片上传失败：${res.error_message}`);
          }
        }
      };
      // xhr.open('POST', `${window.apiHost}/api/imgupload`, true);
      xhr.open('POST', 'http://alpha.api.volunteer.tmallwo.com/api/imgupload', true);
      xhr.send(fd);
    }
  }
  renderRealInfo() {
    const user = this.props.user;
    return (
      <div className="page-profile-realinfo-box">
        <div className="page-profile-title page-profile-realinfo-padding-top">实名认证信息</div>
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">用户名</div>
          <div className="page-profile-initial-fonts">{user.username}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">身份证号</div>
          <div className="page-profile-initial-fonts">{user.username}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">性别</div>
          <div className="page-profile-initial-fonts">{user.username}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">民族</div>
          <div className="page-profile-initial-fonts">{user.username}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">现住地址</div>
          <div className="page-profile-initial-fonts">{user.username}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">详细地址</div>
          <div className="page-profile-initial-fonts">{user.username}</div>
        </div>
        <div className="page-profile-realinfo-takeup" />
      </div>
    );
  }
  render() {
    const user = this.props.user;
    return (
      <div className="page-profile">
        <div>
          <div className="page-profile-title">基本信息</div>
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">头像</div>
            <div className="page-profile-header-uploade-box">
              <div className="page-profile-header-img-container">
                <img className="page-profile-header-img" src={this.state.photo ? this.state.photo : '/images/my/register.png'} alt="" />
                <input ref={(c) => { this.uploader = c; }} onChange={this.onFileSelect} type="file" accept="image/jpeg,image/png,image/gif" className="page-profile-header-upload" />
              </div>

              <div className="page-profile-edit-icon" />
            </div>
          </div>
          <div className="line1px" />
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">用户名</div>
            <div className="page-profile-initial-fonts">{user.username}</div>
          </div>
          <div className="line1px" />
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">志愿者编号</div>
            <div className="page-profile-initial-fonts">{user.identifier}</div>
          </div>
          <div className="line1px" />
          <Link to="/my/profile/checkbox">
            <div className="page-profile-header-box">
              <div className="page-profile-fonts">个人擅长</div>
              <div className="page-profile-edit-icon" />
            </div>
          </Link>
          <div className="line1px" />

          <div>
            <Link to="/my/profile/edit">
              <div className="page-profile-header-box">
                <div className="page-profile-fonts">志愿者口号</div>
                <div className="page-profile-edit-icon" />
              </div>
              <div className="page-profile-fonts-view">{user.slogan}</div>
            </Link>
          </div>
          <div className="page-profile-take-up" />
        </div>
        {/* 通过开关判断用户是否实名注册显示渲染列表，或进去BTN */}
        <div className="page-profile-bottom">
          <Link to="/my/profile/verify">
            <div className="page-profile-bottom-btn">申请成为实名注册志愿者</div>
          </Link>
        </div>
        <div>
          {this.renderRealInfo()}
        </div>

      </div>
    );
  }
}


Profile.title = '个人资料';

Profile.propTypes = {
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
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({ requestUserInfo }, dispatch),
)(Profile);
