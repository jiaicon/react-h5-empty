/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import FastClick from 'fastclick';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../history';
import { requestUserInfo } from '../../../stores/common';
import { checkUser, addressDataAction } from './profile.store';
import './verify.css';

const isAndroid = /android/i.test(navigator.userAgent);

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
    this.state = ({
      province: 0,
      city: 0,
      county: 0,
    });
  }

  componentWillMount() {
    this.props.addressDataAction(0);
    console.log(this.props.route);
    const params = this.props.route.params;
    if (params.projectId && !isNaN(Number(params.projectId))) {
      const projectId = params.projectId;
      this.setState({
        projectId,
      });
    }
  }

  componentDidMount() {
    // Android 下 fastclick 影响 select 点击
    if (window.fastclick && isAndroid) {
      window.fastclick.destroy();
      window.fastclick = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { check: Ccheck } = this.props;
    const { check: Ncheck } = nextProps;
    if (Ccheck.fetching && !Ncheck.fetching && !Ncheck.failed) {
      this.props.requestUserInfo();

      // TODO 如果从项目跳过来的需要跳回去
      if (this.state.projectId) {
        history.replace(`/project/detail/${this.state.projectId}`);
      } else {
        history.replace('/my/profile/detail/user');
      }
    }
  }

  componentWillUnmount() {
    if (!window.fastclick && isAndroid) {
      window.fastclick = FastClick.attach(document.body);
    }
  }

  onTextChanged() {
    const realname = this.realname.value.replace(/(^\s+)|(\s+$)/g, '');
    const idcard = this.idcard.value.replace(/(^\s+)|(\s+$)/g, '');

    const people = this.people.value.replace(/(^\s+)|(\s+$)/g, '');
    const address = this.address.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      address,

      realname,
      idcard,
      people,
    });
  }

  onSubmit() {
    const realname = this.state.realname;
    const idcard = this.state.idcard;

    const people = this.state.people;
    const address = this.state.address;
    const province = this.state.province;
    const city = this.state.city;
    const county = this.state.county;
    if (
      checkEmpty(realname, '姓名')
      || checkEmpty(idcard, '身份证号码')
      || checkEmpty(people, '民族')
      || checkEmpty(province, '省份')
      || checkEmpty(city, '城市')
      || checkEmpty(county, '区县')
      || checkEmpty(address, '详细地址')
      || checkStr(realname)
      || iscard(idcard)
    ) {
      return;
    }
    const data = {
      real_name: realname,
      id_number: idcard,
      nation: people,
      province_id: province,
      city_id: city,
      county_id: county,
      addr: address,
    };
    this.props.checkUser(data);
  }

  handleProvinceClick() {
    this.setState({
      ...this.state,
      province: this.province.value,
    });
    this.props.addressDataAction(this.province.value);
  }

  handleCityClick() {
    this.setState({
      ...this.state,
      city: this.city.value,
    });
    this.props.addressDataAction(this.city.value);
  }

  handleCountryClick() {
    this.setState({
      ...this.state,
      county: this.county.value,
    });
  }

  render() {
    const province = this.props.address.data.province;
    const city = this.props.address.data.city;
    const county = this.props.address.data.county;
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
            <div className="page-my-profile-verify-fonts">民族</div>
            <input type="text" ref={(c) => { this.people = c; }} className="page-my-profile-verify-text" maxLength="1" onChange={this.onTextChanged} />
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">省份</div>
            <label htmlFor="province">
              <select id="province" onChange={this.handleProvinceClick} ref={(c) => { this.province = c; }}>
                <option value="-1" />
                { province && province.map((item, keys) =>
                  <option value={item.id} key={keys}>{item.name}</option>)}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">城市</div>
            <label htmlFor="city">
              <select id="city" onChange={this.handleCityClick} ref={(c) => { this.city = c; }}>
                <option value="-1" />
                {city && city.map((item, keys) =>
                  <option value={item.id} key={keys}>{item.name}</option>,
                )}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">区县</div>
            <label htmlFor="county">
              <select id="county" onChange={this.handleCountryClick} ref={(c) => { this.county = c; }}>
                <option value="-1" />
                {county && county.map((item, keys) =>
                  <option value={item.id} key={keys}>{item.name}</option>,
                )}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">详细地址</div>
            <input type="text" ref={(c) => { this.address = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
          </div>
        </div>

        <div className="page-my-profile-verify-btn" onClick={this.onSubmit}>提交</div>


      </div>
    );
  }
}
Verify.title = '实名认证';
Verify.propTypes = {
  checkUser: PropTypes.func,
  requestUserInfo: PropTypes.func,
  addressDataAction: PropTypes.func,
  address: PropTypes.shape({
    data: PropTypes.shape({
      province: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number,
        }),
      ),
      city: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number,
        }),
      ),
      county: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number,
        }),
      ),
    }),
  }),
  check: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
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
    address: state.info.address,
    check: state.info.checkUser,
  }),
  dispatch => bindActionCreators({
    requestUserInfo, checkUser, addressDataAction,
  }, dispatch),
)(Verify);
