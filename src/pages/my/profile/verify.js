/**
 * @file 我的消息
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import history from '../../history';
import { requestUserInfo } from '../../../stores/common';
import './verify.css';

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`请填写${label}`);
    return true;
  }
  return false;
}
function checkStr(str) {
  const reg = new RegExp('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$');
  if (!reg.test(str)) {
    Alert.warning('请输入中文姓名');
    return true;
  }
  return false;
}
function iscard(card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(card)) {
    Alert.warning('身份证输入不合法');
    return true;
  }
  return false;
}
class Verify extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  onTextChanged=() => {
    console.log(this);
    const realname = this.realname.value.replace(/(^\s+)|(\s+$)/g, '');
    const idcard = this.idcard.value.replace(/(^\s+)|(\s+$)/g, '');
    const sex = this.sex.value.replace(/(^\s+)|(\s+$)/g, '');
    const people = this.people.value.replace(/(^\s+)|(\s+$)/g, '');
    const address = this.address.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      address,
      sex,
      realname,
      idcard,
      people,
    });
  }
  onSubmit=() => {
    const realname = this.state.realname;
    const idcard = this.state.idcard;
    const sex = this.state.sex;
    const people = this.state.addrpeople;
    const address = this.state.address;
    if (checkEmpty(realname, '姓名') || checkEmpty(idcard, '身份证号码') || checkEmpty(sex, '性别') || checkEmpty(people, '民族') || checkEmpty(address, '详细地址')) {
      return;
    }
    if (checkStr(realname)) {
      return;
    }
    if (iscard(idcard)) {
      return;
    }
    this.setState({

    });
  }
  render() {
    return (
      <div className="page-my-profile-verify-container">
        <div>
          <div className="page-my-profile-verify-title">实名认证信息</div>
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">姓名</div>
            <input type="text" maxLength="5" ref={(c) => { this.realname = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">身份证号</div>
            <input type="text" maxLength="18" ref={(c) => { this.idcard = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">性别</div>
            <input type="text" ref={(c) => { this.sex = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">民族</div>
            <input type="text" ref={(c) => { this.people = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">省份</div>
            <div className="page-my-profile-verify-icon" />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">城市</div>
            <div className="page-my-profile-verify-icon" />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">区县</div>
            <div className="page-my-profile-verify-icon" />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">详细地址</div>
            <input type="text" ref={(c) => { this.address = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
          </div>
        </div>
        <div className="page-my-profile-verify-bottom">
          <div className="page-my-profile-verify-btn">提交</div>
        </div>

      </div>
    );
  }
}


Verify.title = '实名认证';
Verify.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    birthday: PropTypes.number,
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.number,
    id_number: PropTypes.number,
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
)(Verify);
