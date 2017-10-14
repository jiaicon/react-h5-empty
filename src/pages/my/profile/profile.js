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
import { imporvePersonInfo } from './profile.store';
import {} from '../my.store';
import Link from '../../../components/link/link';
import Image from '../../../components/image/image';
import Alert from 'react-s-alert';
import './profile.css';


class Profile extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      photo: '',
    });
  }

  componentWillMount() {
    this.props.requestUserInfo();
  }

  componentDidMount() {
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
            const data = {
              avatars: res.data.url,
            };
            this.props.imporvePersonInfo(data);
            this.props.requestUserInfo();
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
      <div>
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
                <Image src={user.avatars} className="page-profile-header-img" />

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
        <div
          className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': !user.id_number,
            'page-profile-display-none': user.id_number,
          })}
        >
          <Link to="/my/profile/verify">
            <div className="page-profile-bottom-btn">申请成为实名注册志愿者</div>
          </Link>
        </div>
        <div
          className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': user.id_number,
            'page-profile-display-none': !user.id_number,
          })}
        >
          {this.renderRealInfo()}
        </div>

      </div>
    );
  }
}


Profile.title = '个人资料';

Profile.propTypes = {
  requestUserInfo: PropTypes.func,
  imporvePersonInfo: PropTypes.func,
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
    info: state.info.person,
  }),
  dispatch => bindActionCreators({ requestUserInfo, imporvePersonInfo }, dispatch),
)(Profile);
