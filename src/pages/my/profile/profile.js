/**
 * @file 个人资料
 */
/* eslint
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off",
"class-methods-use-this": "off"
*/

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import Alert from 'react-s-alert';
import { requestUserInfo } from '../../../stores/common';
import { imporvePersonInfo, otherFamilyAction } from './profile.store';
import {} from '../my.store';
import Link from '../../../components/link/link';
import Avatar from '../../../components/avatar/avatar';
import uploadToWX from '../../../utils/wxupload';
import './profile.css';


function sexName(sex) {
  if (sex === 1) {
    return '男';
  } else if (sex === 2) {
    return '女';
  }

  return '未知';
}

class Profile extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.userId = props.route.params.userId;
    this.state = ({
      photo: '',

    });
  }

  componentWillMount() {
    const userId = this.props.route.params.userId;
    this.setState({
      ...this.state,
      userId,
    });
    if (userId === 'user') {
      this.props.requestUserInfo();
    } else {
      this.props.otherFamilyAction(userId);
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {}

  onAvatarClick() {
    uploadToWX({
      success: (urls) => {
        const data = {
          avatars: urls[0],
        };
        this.photo = urls[0];
        this.props.imporvePersonInfo(data);
        this.props.requestUserInfo();
      },
    });
  }

  onOtherHandleClick() {
    Alert.warning('如需修改请登录账号');
  }

  renderOtherRealInfo() {
    const otherfamily = this.props.otherfamily;
    if (!otherfamily.data) {
      return null;
    }
    return (
      <div className="page-profile-bottom-real-info-container">
        <div className="page-profile-title page-profile-realinfo-padding-top">实名认证信息</div>
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">账号</div>
          <div className="page-profile-initial-fonts">{otherfamily.data.real_name ? otherfamily.data.real_name : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">身份证号</div>
          <div className="page-profile-initial-fonts">{otherfamily.data.id_number ? otherfamily.data.id_number : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">性别</div>
          <div className="page-profile-initial-fonts">{otherfamily.data.sex ? sexName(otherfamily.data.sex) : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">民族</div>
          <div className="page-profile-initial-fonts">{otherfamily.data.nation ? otherfamily.data.nation : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">现住地址</div>
          <div className="page-profile-initial-fonts">{otherfamily.data.province_name ? otherfamily.data.province_name : ''}-{otherfamily.data.city_name ? otherfamily.data.city_name : ''}-{otherfamily.data.county_name ? otherfamily.data.county_name : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">详细地址</div>
          <div className="page-profile-initial-fonts">{otherfamily.data.addr ? otherfamily.data.addr : ''}</div>
        </div>
        <div className="page-profile-realinfo-takeup" />
      </div>
    );
  }
  renderRealInfo() {
    const user = this.props.user;

    return (
      <div className="page-profile-bottom-real-info-container">
        <div className="page-profile-title page-profile-realinfo-padding-top">实名认证信息</div>
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">账号</div>
          <div className="page-profile-initial-fonts">{user.real_name ? user.real_name : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">身份证号</div>
          <div className="page-profile-initial-fonts">{user.id_number ? user.id_number : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">性别</div>
          <div className="page-profile-initial-fonts">{user.sex ? sexName(user.sex) : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">民族</div>
          <div className="page-profile-initial-fonts">{user.nation ? user.nation : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">现住地址</div>
          <div className="page-profile-initial-fonts">{user.province_name ? user.province_name : ''}-{user.city_name ? user.city_name : ''}-{user.county_name ? user.county_name : ''}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-header-box">
          <div className="page-profile-fonts">详细地址</div>
          <div className="page-profile-initial-fonts">{user.addr ? user.addr : ''}</div>
        </div>
        <div className="page-profile-realinfo-takeup" />
      </div>
    );
  }

  renderHost() {
    const user = this.props.user;
    const phone = 123;
    return (
      <div className="page-profile">
        <div>
          <div className="page-profile-title">基本信息</div>
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">头像</div>
            <div className="page-profile-header-uploade-box">
              <div className="page-profile-header-img-container" onClick={this.onAvatarClick}>
                <Avatar src={this.photo ? this.photo : user.avatars} size={{ width: 40, radius: 4 }} defaultSrc="/images/my/register.png" />
              </div>
              <div className="page-profile-edit-icon" />
            </div>
          </div>
          <div className="line1px" />
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">账号</div>
            <div className="page-profile-edit-box">
              <div className="page-profile-initial-fonts">{user.username}</div>
              <div className="page-profile-initial-fonts-take-up" />
            </div>
          </div>
          <div className="line1px" />
          {/** 111 */}
          {/** <Link to="/my/profile/bind/phone">
            <div className="page-profile-header-box">
              <div className="page-profile-fonts">*手机号</div>
              <div className="page-profile-edit-box">
                <div className="page-profile-initial-fonts">{user.phone || ''}</div>
                <div className="page-profile-edit-icon" />
              </div>
            </div>
          </Link>
          <div className="line1px" />
          <Link to="/my/profile/bind/mail">
            <div className="page-profile-header-box">
              <div className="page-profile-fonts">*邮箱</div>
              <div className="page-profile-edit-box">
                <div className="page-profile-initial-fonts">{user.mail || ''}</div>
                <div className="page-profile-edit-icon" />
              </div>
            </div>
          </Link> */}


          {/** 111 */}
          <div className="line1px" />
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">志愿者编号</div>
            <div className="page-profile-edit-box">
              <div className="page-profile-initial-fonts">{user.identifier}</div>
              <div className="page-profile-initial-fonts-take-up" />
            </div>
          </div>
          <div className="line1px" />
          <Link to="/my/profile/checkbox">
            <div className="page-profile-header-box">
              <div className="page-profile-fonts">个人擅长</div>
              <div className="page-profile-edit-box">
                {user.good_at != null ?
                  user.good_at.map((item, index) =>
                    <span key={index} className="page-profile-initial-fonts" >
                      {item.good_at_name}{index < user.good_at.length - 1 ? '、' : ''}
                    </span>)
                  : <span />
                }
                <div className="page-profile-edit-icon" />
              </div>

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
  renderOther() {
    const otherfamily = this.props.otherfamily;
    if (!otherfamily.data) {
      return null;
    }
    return (
      <div className="page-profile">
        <div>
          <div className="page-profile-title">基本信息</div>
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">头像</div>
            <div className="page-profile-header-uploade-box">
              <div className="page-profile-header-img-container" onClick={this.onOtherHandleClick}>
                <Avatar src={otherfamily.data.avatars} size={{ width: 40, radius: 4 }} defaultSrc="/images/my/register.png" />
              </div>

              <div className="page-profile-edit-icon" />
            </div>
          </div>
          <div className="line1px" />
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">账号</div>
            <div className="page-profile-edit-box">
              <div className="page-profile-initial-fonts">{otherfamily.data.username}</div>
              <div className="page-profile-initial-fonts-take-up" />
            </div>
          </div>
          <div className="line1px" />
          <div className="page-profile-header-box">
            <div className="page-profile-fonts">志愿者编号</div>
            <div className="page-profile-edit-box">
              <div className="page-profile-initial-fonts">{otherfamily.data.identifier}</div>
              <div className="page-profile-initial-fonts-take-up" />
            </div>
          </div>
          <div className="line1px" />
          <div className="page-profile-header-box" onClick={this.onOtherHandleClick}>
            <div className="page-profile-fonts">个人擅长</div>
            <div className="page-profile-edit-box">
              {otherfamily.data.good_at != null ?
            otherfamily.data.good_at.map((item, index) =>
              <span key={index} className="page-profile-initial-fonts" >
                {item.good_at_name}{index < otherfamily.data.good_at.length - 1 ? '、' : ''}
              </span>)
            : <span />
          }
              <div className="page-profile-edit-icon" />
            </div>

          </div>
          <div className="line1px" />

          <div>
            <div className="page-profile-header-box" onClick={this.onOtherHandleClick}>
              <div className="page-profile-fonts">志愿者口号</div>
              <div className="page-profile-edit-icon" />
            </div>
            <div className="page-profile-fonts-view">{otherfamily.data.slogan}</div>
          </div>
          <div className="page-profile-take-up" />
        </div>
        {/* 通过开关判断用户是否实名注册显示渲染列表，或进去BTN */}
        <div
          className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': !otherfamily.data.id_number,
            'page-profile-display-none': otherfamily.data.id_number,
          })}
          onClick={this.onOtherHandleClick}
        >
          <a>
            <div className="page-profile-bottom-btn">申请成为实名注册志愿者</div>
          </a>
        </div>
        <div
          className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': otherfamily.data.id_number,
            'page-profile-display-none': !otherfamily.data.id_number,
          })}
        >
          {this.renderOtherRealInfo()}
        </div>

      </div>
    );
  }
  render() {
    const userId = this.userId;

    return (
      <div>
        {userId === 'user' ? this.renderHost() : this.renderOther()}
      </div>
    );
  }
}


Profile.title = '个人资料';

Profile.propTypes = {
  requestUserInfo: PropTypes.func,
  imporvePersonInfo: PropTypes.func,
  otherFamilyAction: PropTypes.func,
  otherfamily: PropTypes.shape({
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
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }),
};

export default connect(
  state => ({
    user: state.user,
    info: state.info.person,
    otherfamily: state.info.otherfamily,
  }),
  dispatch => bindActionCreators({ requestUserInfo,
    imporvePersonInfo,
    otherFamilyAction }, dispatch),
)(Profile);
