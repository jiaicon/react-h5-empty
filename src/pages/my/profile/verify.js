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
const people = [{ id: '01', name: '汉族' }, { id: '02', name: '蒙古族' }, { id: '03', name: '回族' },
{ id: '04', name: '藏族' }, { id: '05', name: '维吾尔族' }, { id: '06', name: '苗族' },
{ id: '07', name: '彝族' }, { id: '08', name: '壮族' }, { id: '09', name: '布依族' },
{ id: '10', name: '朝鲜族' }, { id: '11', name: '满族' }, { id: '12', name: '侗族' },
{ id: '13', name: '瑶族' }, { id: '14', name: '白族' }, { id: '15', name: '土家族' },
{ id: '16', name: '哈尼族' }, { id: '17', name: '哈萨克族' }, { id: '18', name: '傣族' },
{ id: '19', name: '黎族' }, { id: '20', name: '傈僳族' }, { id: '21', name: '佤族' },
{ id: '22', name: '畲族' }, { id: '23', name: '高山族' }, { id: '24', name: '拉祜族' },
{ id: '25', name: '水族' }, { id: '26', name: '东乡族' }, { id: '27', name: '纳西族' },
{ id: '28', name: '景颇族' }, { id: '29', name: '柯尔克孜族' }, { id: '30', name: '土族' },
{ id: '31', name: '达斡尔族' }, { id: '32', name: '仫佬族' }, { id: '33', name: '羌族' },
{ id: '34', name: '布朗族' }, { id: '35', name: '撒拉族' }, { id: '36', name: '毛难族' },
{ id: '37', name: '仡佬族' }, { id: '38', name: '锡伯族' }, { id: '39', name: '阿昌族' },
{ id: '40', name: '普米族' }, { id: '41', name: '塔吉克族' }, { id: '42', name: '怒族' },
{ id: '43', name: '乌孜别克族' }, { id: '44', name: '俄罗斯族' }, { id: '45', name: '鄂温克族' },
{ id: '46', name: '崩龙族' }, { id: '47', name: '保安族' }, { id: '48', name: '裕固族' },
{ id: '49', name: '京族' }, { id: '50', name: '塔塔尔族' }, { id: '51', name: '独龙族' },
{ id: '52', name: '鄂伦春族' }, { id: '53', name: '赫哲族' }, { id: '54', name: '门巴族' },
{ id: '55', name: '珞巴族' }, { id: '56', name: '基诺族' }];
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


    const address = this.address.value.replace(/(^\s+)|(\s+$)/g, '');
    const nowaddress = this.nowaddress.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      address,
      nowaddress,
      realname,
      idcard,
    });
  }


  onSubmit() {
    const realname = this.state.realname;
    const idcard = this.state.idcard;
    const people = this.state.people;

    const nowaddress = this.state.nowaddress;


    const address = this.state.address;
    const province = this.state.province;
    const city = this.state.city;
    const county = this.state.county;
    if (
      checkEmpty(realname, '姓名')
      || checkEmpty(idcard, '身份证号码')
      || checkEmpty(people, '民族')
      || checkEmpty(nowaddress, '现居地址')
      || checkEmpty(province, '省份')
      || checkEmpty(city, '城市')
      || checkEmpty(county, '区县')
      || checkEmpty(address, '详细地址')
      || checkStr(realname)
      || iscard(idcard)
    ) {
      return;
    }
    // nowaddress未定义字段
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
  handlePeopleClick() {
    this.setState({
      ...this.state,
      people: this.people.value,
    });
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
            <label htmlFor="people">
              <select id="people" onChange={this.handlePeopleClick} ref={(c) => { this.people = c; }}>
                <option value="-1" />
                { people && people.map((item, keys) =>
                  <option value={item.name} key={keys}>{item.name}</option>)}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">现住地址</div>
            <input type="text" ref={(c) => { this.nowaddress = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
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
