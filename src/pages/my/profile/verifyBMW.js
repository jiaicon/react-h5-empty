/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import FastClick from "fastclick";
import Alert from "react-s-alert";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uploadToWX from "../../../utils/wxupload";
import UploadAvatar from "./../../../components/uploadAvatar/uploadAvatar";
import UploadPhoto from "./../../../components/uploadPhoto/uploadPhoto";
import history from "../../history";
import { requestUserInfo } from "../../../stores/common";
import Avatar from "../../../components/avatar/avatar";
import { checkUser, addressDataAction, userDefinedInfo } from "./profile.store";
import { loginAction } from "../login/login.store";
import { getQueryString } from "../../../utils/funcs";
import uploadImage from "../../../utils/uploadImage";
import "./verify.css";
import { List, Checkbox, DatePicker, Radio } from "antd-mobile";

import "antd-mobile/lib/date-picker/style/css";
import "antd-mobile/lib/checkbox/style/css";
import "antd-mobile/lib/Radio/style/css";
import "./verifyAntd.css";
import { Dialog, Gallery, GalleryDelete, Button, Icon } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
import { cardtype, people } from '../../../utils/config'

const RadioItem = Radio.RadioItem;
const isAndroid = /android/i.test(navigator.userAgent);

let isEmpty = false;

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`请填写${label}`);
    isEmpty = true;
    return true;
  } else {
    isEmpty = false;
  }
  return false;
}

//判断自定义信息必填的是否为空
function isRequired(arr, stateData) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].is_required && arr[i].is_required === 1) {
      const keys = Object.keys(stateData);
      if (keys.length != 0) {
        let isInArr = false; //记录自定义信息的对象中必填的key是否在存在
        for (let j in stateData) {
          if (arr[i].key === j && stateData.hasOwnProperty(j)) {
            isInArr = false;
            break;
          } else {
            isInArr = true;
          }
        }
        if (isInArr) {
          checkEmpty(null, arr[i].label);
          return true;
        }
      } else {
        Alert.warning(`请填写${arr[i].label}`);
        isEmpty = true;
        break;
      }
    }
  }
  if (isEmpty) {
    return true;
  }
  return false;
}

function checkStr(str) {
  const reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$");
  if (!reg.test(str)) {
    Alert.warning("请输入中文姓名");
    return true;
  }
  return false;
}

//验证姓名，允许中文、大小写字母、空格、-、·、_ ,,,,,请输入中文姓名或英文姓名
function checkRealname(str) {
  const reg = new RegExp(/^[a-zA-Z\u4e00-\u9fa5_\·\ \-]+$/);
  if (!reg.test(str)) {
    Alert.warning("请输入中文姓名或英文姓名");
    return true;
  }
  return false;
}
// console.log(checkRealname('家icon_i i-oo-'));

function iscard(card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(card)) {
    Alert.warning("身份证输入不合法");
    return true;
  }
  return false;
}
function isaomencard(card) {
  const reg = /^[1|5|7][0-9]{6}\([0-9Aa]\)/;
  if (!reg.test(card)) {
    Alert.warning("身份证输入不合法");
    return true;
  }
  return false;
}
function isxiangancard(card) {
  const reg = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(([0−9aA])|([0-9aA]))$/;
  if (!reg.test(card)) {
    Alert.warning("身份证输入不合法");
    return true;
  }
  return false;
}
function istaiwancard(card) {
  const reg = /^[a-zA-Z][0-9]{9}$/;
  if (!reg.test(card)) {
    Alert.warning("身份证输入不合法");
    return true;
  }
  return false;
}
function formatDate(x, y) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => (n < 10 ? `0${n}` : n);
  const date = new Date(x);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  if (y) {
    return `${dateStr} ${timeStr}`;
  } else {
    return `${dateStr}`;
  }
}

class Verify extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      password: null,
      province: 0,
      city: 0,
      county: 0,
      extendsArray: {},
      winOrgInfo: window.orgInfo.custom_config,
      showMultiple: false,
      previewData: [],
      cardtype: 1
    };
    this.CustomChildren = ({ extra, onClick }) => (
      <div
        onClick={onClick}
        style={{ height: "40px", lineHeight: "40px", color: "#565656" }}
      >
        <span className="page-my-profile-verify-text page-my-profile-verify-text-lineheight">
          {extra}
          <img src="/images/my/more.png" />
        </span>
      </div>
    );
  }

  componentWillMount() {
    this.props.addressDataAction(0);
    const params = this.props.route.params;

    if (this.state.winOrgInfo !== null && this.state.winOrgInfo.extends) {
      this.initialPic(this.state.winOrgInfo.extends);
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
    const { login: cLogin } = this.props;
    const { login: nLogin } = nextProps;

    let target = getQueryString("target") ? getQueryString("target") : "/my";

    const { from } = nLogin;

    if (
      Ccheck.fetching &&
      !Ccheck.failed &&
      !Ncheck.fetching &&
      !Ncheck.failed
    ) {
      if (from) {
        target = from;
      }
      if (from === '/my/login') {
        target = '/my';
      }
      window.location.replace(target);
      // history.replace(target);
    }
  }

  componentWillUnmount() {
    if (!window.fastclick && isAndroid) {
      window.fastclick = FastClick.attach(document.body);
    }
  }

  // 初始化上传照片
  initialPic(data) {
    data.map((item, index) => {
      if (item.type == 5) {
        this.setState({
          [item.key]: [],
          ...this.state
        });
      }
    });
  }

  onTextChanged() {
    //姓名允许空格
    // const realname = this.realname.value.replace(/(^\s+)|(\s+$)/g, "");
    const realname = this.realname.value;
    const idcard = this.idcard.value.replace(/(^\s+)|(\s+$)/g, "");
    const address = this.address.value.replace(/(^\s+)|(\s+$)/g, "");
    const password = this.password
      ? this.password.value.replace(/(^\s+)|(\s+$)/g, "")
      : null;
    this.setState({
      address,
      realname,
      idcard,
      password
    });
  }

  // 上传头像
  onAvatarChange(avatar) {
    this.setState({
      photo: avatar
    });
    this.photo = avatar;
  }

  onSubmit() {
    const {
      winOrgInfo: stateOrgData,
      realname,
      idcard,
      people,
      photo,
      cardtype,
      address,
      province,
      city,
      county,
      password
    } = this.state;
    const { user } = this.props;

    let data = {};

    const filterArr = Object.entries(this.state.extendsArray).filter(pv => this.state.winOrgInfo.extends.filter(v => (v.key === pv[0] && v.is_required > 0)).length);

    let extendsObj = {}
    filterArr.forEach(item => {
      extendsObj[item[0]] = item[1];
    })

    console.info(filterArr, extendsObj)

    if (extendsObj.employee_id && !(/^[a-zA-Z]\w{5,6}$/.test(extendsObj.employee_id))) {
      Alert.warning(`员工号有误，请检查`);
      return;
    }
    data.extends = extendsObj;

    if (
      (stateOrgData.open_avatars && checkEmpty(photo, "头像")) ||
      (stateOrgData.open_real_name && checkEmpty(realname, "姓名")) ||
      (stateOrgData.open_id_number && checkEmpty(idcard, "证件号码")) ||
      (stateOrgData.open_nation && checkEmpty(people, "民族")) ||
      (stateOrgData.open_addr && checkEmpty(province, "省份")) ||
      (stateOrgData.open_addr && checkEmpty(city, "城市")) ||
      (stateOrgData.open_addr && checkEmpty(county, "区县")) ||
      (stateOrgData.open_addr && checkEmpty(address, "详细地址")) ||
      (stateOrgData.open_real_name && checkRealname(realname)) ||
      (user.have_pwd == 0 && checkEmpty(password, "密码"))
    ) {
    }
    if (stateOrgData.open_id_number) {
      if (cardtype == 1 && iscard(idcard)) {
        return;
      } else if (cardtype == 2 && isxiangancard(idcard)) {
        return;
      } else if (cardtype == 3 && isaomencard(idcard)) {
        return;
      } else if (cardtype == 4 && istaiwancard(idcard)) {
        return;
      }
    }
    if (
      this.state.winOrgInfo.extends &&
      this.state.winOrgInfo.extends.length > 0
    ) {
      if (isRequired(this.state.winOrgInfo.extends, this.state.extendsArray)) {
        isEmpty = false;
        return;
      }
    }

    if (realname) {
      data.real_name = realname;
    }
    if (idcard) {
      data.id_number = idcard;
    }
    if (people) {
      data.nation = people;
    }
    if (province) {
      data.province_id = province;
    }
    if (city) {
      data.city_id = city;
    }
    if (county) {
      data.county_id = county;
    }
    if (address) {
      data.addr = address;
    }

    if (photo != undefined && photo != "") {
      data.avatars = photo;
    }
    if (password) {
      data.pwd = password;
    }
    data.num_type = cardtype;
    data.extends = this.state.extendsArray;

    this.props.checkUser(data);
  }
  handleCardClick() {
    this.setState({ ...this.state, cardtype: this.cardtype.value });
  }
  handlePeopleClick() {
    this.setState({
      ...this.state,
      people: this.people.value
    });
  }

  handleProvinceClick() {
    this.setState({
      ...this.state,
      province: this.province.value
    });
    this.props.addressDataAction(this.province.value);
  }

  handleCityClick() {
    this.setState({
      ...this.state,
      city: this.city.value
    });
    this.props.addressDataAction(this.city.value);
  }

  handleCountyClick() {
    this.setState({
      ...this.state,
      county: this.county.value
    });
  }

  renderAvatars() {
    return (
      <div>
        <div className="page-my-profile-verify-header-box page-my-profile-verify-photo-box">
          {this.state.winOrgInfo.open_avatars === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}

          <div className="page-my-profile-verify-fonts">头像</div>
          <UploadAvatar onChange={this.onAvatarChange} />
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderName() {
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_real_name === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">姓名</div>
          <input
            type="text"
            ref={c => {
              this.realname = c;
            }}
            className="page-my-profile-verify-text"
            onChange={this.onTextChanged}
          />
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderIdCard() {
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_id_number === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">证件类型</div>
          <label htmlFor="cardtype">
            <select

              id="cardtype"
              onChange={this.handleCardClick}
              ref={c => {
                this.cardtype = c;
              }}
            >

              {cardtype &&
                cardtype.map((item, keys) => (
                  <option value={item.id} key={keys}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="line1px" />
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_id_number === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">证件号码</div>
          <input
            type="text"
            maxLength="18"
            ref={c => {
              this.idcard = c;
            }}
            className="page-my-profile-verify-text"
            onChange={this.onTextChanged}
          />
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderNation() {
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_nation === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}

          <div className="page-my-profile-verify-fonts">民族</div>
          <label htmlFor="people">
            <select
              id="people"
              onChange={this.handlePeopleClick}
              ref={c => {
                this.people = c;
              }}
            >
              <option value="-1" />
              {people &&
                people.map((item, keys) => (
                  <option value={item.name} key={keys}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderAddr() {
    const province = this.props.address.data.province;
    const city = this.props.address.data.city;
    const county = this.props.address.data.county;
    return (
      <div>
        <div>
          <div className="page-my-profile-verify-header-box">
            {this.state.winOrgInfo.open_addr === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}

            <div className="page-my-profile-verify-fonts">省份</div>
            <label htmlFor="province">
              <select
                id="province"
                onChange={this.handleProvinceClick}
                ref={c => {
                  this.province = c;
                }}
              >
                <option value="-1" />
                {province &&
                  province.map((item, keys) => (
                    <option value={item.id} key={keys}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            {this.state.winOrgInfo.open_addr === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}
            <div className="page-my-profile-verify-fonts">城市</div>
            <label htmlFor="city">
              <select
                id="city"
                onChange={this.handleCityClick}
                ref={c => {
                  this.city = c;
                }}
              >
                <option value="-1" />
                {city &&
                  city.map((item, keys) => (
                    <option value={item.id} key={keys}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            {this.state.winOrgInfo.open_addr === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}
            <div className="page-my-profile-verify-fonts">区县</div>
            <label htmlFor="county">
              <select
                id="county"
                onChange={this.handleCountyClick}
                ref={c => {
                  this.county = c;
                }}
              >
                <option value="-1" />
                {county &&
                  county.map((item, keys) => (
                    <option value={item.id} key={keys}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            {this.state.winOrgInfo.open_addr === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}
            <div className="page-my-profile-verify-fonts">详细地址</div>
            <input
              type="text"
              ref={c => {
                this.address = c;
              }}
              className="page-my-profile-verify-text"
              onChange={this.onTextChanged}
            />
          </div>
          <div className="line1px" />
        </div>
      </div>
    );
  }

  handleOtherInfoSelectClick(e) {
    const key = e.target.id;
    const value = e.target.value;
    const {
      winOrgInfo: { extends: extendsFormArr },
    } = this.state;

    if (key === 'user_type') {
      switch (value) {
        case '宝马员工': {
          extendsFormArr.filter(v => {
            if (v.key === 'user_type' || v.key === 'email' || v.key === "company_affiliation" || v.key === 'employee_id') {
              v.is_required = 1;
            }
            else v.is_required = 0;
          })
        } break;
        case '经销商员工': {
          extendsFormArr.filter(v => {
            if (v.key === 'user_type' || v.key === 'email' || v.key === "dealer_name") {
              v.is_required = 1;
            }
            else v.is_required = 0;
          })
        } break;
        case '宝马车主': {
          extendsFormArr.filter(v => {
            if (v.key === 'user_type' || v.key === 'email' || v.key === "car_model") {
              v.is_required = 1;
            }
            else v.is_required = 0;
          })
        } break;
        case '公众': {
          extendsFormArr.filter(v => {
            if (v.key === 'user_type' || v.key === 'email') {
              v.is_required = 1;
            }
            else v.is_required = 0;
          })
        } break;
      }
    }
    this.setState({
      winOrgInfo: this.state.winOrgInfo,
    })
    this.pushExtendsArray(key, value);
  }

  //单选控件
  renderOtherInfoSelect(item) {
    const data = item;
    const key = data.key;
    const options = data.options.split(",");
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {item.is_required === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">{data.label}</div>
          <label htmlFor={`${key}`}>
            <select id={`${key}`} onChange={this.handleOtherInfoSelectClick} value={this.state.extendsArray[key] && this.state.extendsArray[key].length && this.state.extendsArray[key] || undefined}>
              <option value="-1" style={{ display: 'none' }} />
              {options.map((item1, keys) => (
                <option value={item1} key={keys}>
                  {item1}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="line1px" />
      </div>
    );
  }

  //多选控件
  onChange = (key, val) => {
    this.pushExtendsArray(key, val, true);
  };

  renderOtherInfoCheckbox(item1) {
    const CheckboxItem = Checkbox.CheckboxItem;
    let labels = item1.options.split(",");
    let data = [];
    labels.map((item, index) => {
      let obj = {};
      obj.value = index;
      obj.label = item;
      data.push(obj);
    });
    return (
      <div className="page-my-profile-other-title">
        {item1.is_required === 1 ? (
          <span className="page-my-profile-verify-header-start page-my-profile-verify-header-other-start">
            *
          </span>
        ) : null}
        <List renderHeader={() => item1.label}>
          {data.map(i => (
            <CheckboxItem
              key={`${item1.key}${i.value}`}
              onChange={() => this.onChange(item1.key, i.label)}
            >
              {i.label}
            </CheckboxItem>
          ))}
        </List>
      </div>
    );
  }

  //单行
  renderOtherInfoInput(item) {
    const data = item;
    const key = data.key;
    return (
      <div>
        <div>
          <div className="page-my-profile-verify-header-box">
            {item.is_required === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}
            {data.label}
          </div>
          <input
            id={`${key}`}
            className="page-my-profile-verify-double-text"
            onChange={this.handleOtherInfoInputClick}
            value={this.state.extendsArray[key] && this.state.extendsArray[key].length && this.state.extendsArray[key] || undefined}
          />

          <div className="line1px" />
        </div>
      </div>
    );
  }

  handleOtherInfoInputClick(e) {
    const key = e.target.id;
    const value = e.target.value;
    this.pushExtendsArray(key, value);
  }

  // 多行
  renderOtherInfoManyInput(item) {
    const data = item;
    const key = data.key;
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {item.is_required === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          {data.label}
        </div>

        <textarea
          // placeholder={`请输入${data.label}`}
          id={`${key}`}
          className="page-my-profile-edit-text"
          maxLength="200"
          onBlur={this.handleOtherInfoManyInputClick}
          value={this.state.extendsArray[key] && this.state.extendsArray[key].length && this.state.extendsArray[key] || undefined}
        />

        <div className="line1px" />
      </div>
    );
  }

  handleOtherInfoManyInputClick(e) {
    const key = e.target.id;
    const value = e.target.value;
    this.pushExtendsArray(key, value);
  }

  // 选择时间
  renderOtherInfoDate(item) {
    const data = item;
    const key = data.key;
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {item.is_required === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">{data.label}</div>

          <DatePicker
            mode="date"
            format="YYYY-MM-DD"
            value={this.state[key]}
            extra={` `}
            onOk={v => (
              this.pushExtendsArray(key, formatDate(v)),
              this.setState({
                ...this.state,
                [key]: v
              })
            )}
          >
            <this.CustomChildren />
          </DatePicker>
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderOtherInfoDateTime(item) {
    const data = item;
    const key = data.key;
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {item.is_required === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">{data.label}</div>
          <DatePicker
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            value={this.state[key]}
            extra={`  `}
            onOk={v => (
              this.pushExtendsArray(key, formatDate(v, true)),
              this.setState({
                ...this.state,
                [key]: v
              })
            )}
          >
            <this.CustomChildren />
          </DatePicker>
        </div>
        <div className="line1px" />
      </div>
    );
  }

  // 上传图片
  onPicClick(e) {
    var key = e.target.id;
    const attachment = this.state[key];
    uploadToWX({
      success: urls => {
        if (urls.length == 1) {
          attachment.push(urls[0]);
        } else if (urls.length > 1) {
          for (var i = 0; i < urls.length; i++) {
            attachment.push(urls[i]);
          }
        }
        this.setState({ ...this.state, [key]: attachment });
        this.pushExtendsArray(key, attachment);
      }
    });
  }
  uploadPhotoClick(e) {
    console.log(e);
  }
  onPhotoChange(e) {
    console.log(e.target.id);
    let key = e.target.id;
    uploadImage(`/api/imgupload`, {
      method: "POST",
      data: { file: { file: e.target.files[0] } }
    }).then(json => {
      if (json.error_code === 0) {
        const attachment = this.state[key];
        attachment.push(json.data.url);
        this.setState({
          ...this.state,
          [key]: attachment
        });
        this.pushExtendsArray(key, attachment);
      }
    });
  }

  onPicDel(e) {
    const num = e.target.id;
    var key = e.target.getAttribute("data-key");
    const attachment = this.state[key];
    attachment.splice(num, 1);
    this.setState({ ...this.state, [key]: attachment }),
      this.pushExtendsArray(key, attachment);
  }

  onPreview(e) {
    const num = e.target.id;
    var key = e.target.getAttribute("data-key");
    const imagesArr = this.state[key];
    this.setState({
      previewData: imagesArr,
      showMultiple: true,
      defaultIndex: 0
    });
  }

  renderOtherPic(item) {
    const data = item;
    const key = data.key;
    return (
      <div className="page-my-profile-other-title">
        {item.is_required === 1 ? (
          <span className="page-my-profile-verify-header-start page-my-profile-verify-header-other-pic-start">
            *
          </span>
        ) : null}
        <div className="page-my-profile-verify-header-box-pic-fonts">
          {data.label}
        </div>
        <div className="page-post-container-photo-container">
          {this.state[key].map((item, keys) => (
            <div className="page-applys-item-render-container" key={keys}>
              <div className="page-applys-item-view">
                <Avatar
                  src={item}
                  size={{ width: 80, radius: 1 }}
                  id={keys}
                  key={item}
                  data-key={`${key}`}
                  onClick={this.onPreview}
                />
              </div>
              <div
                className="page-applys-item-render-del"
                onClick={this.onPicDel}
                id={keys}
                key={item}
                data-key={`${key}`}
              />
            </div>
          ))}
          {this.state[key].length === 1 ? (
            <div />
          ) : (
              <div className="page-profile-header-uploade-box-div">
                <div className="page-profile-header-uploade-box-iptbox">
                  <input
                    id={key}
                    onChange={this.onPhotoChange}
                    accept="image/png, image/jpeg, image/jpg"
                    ref={c => {
                      this.uploadImages = c;
                    }}
                    className="page-profile-header-uploade-box-ipt"
                    type="file"
                  />
                </div>
                {/*<div className="page-profile-header-uploade-box-img"*/}
                {/*style={{backgroundImage: `url(${this.state.avatar ? this.state.avatar : '/images/my/register.png'})`}}></div>*/}
              </div>
            )}
        </div>
        <div className="line1px" />
      </div>
    );
  }

  /*
   * 数组排序
   * oldArr   标准的数组
   * newArr   要排序的数组
   * */
  softArr(oldArr, newArr) {
    let softArr = [];
    oldArr.map(i => {
      newArr.map(k => {
        if (i === k) {
          softArr.push(k);
        }
      });
    });
    return softArr;
  }

  // push 数组
  /*
   * key 键
   * value 值
   * isMany 是否多选 true是 false否
   * */
  pushExtendsArray(key, value, isMany) {
    const extendsArray = this.state.extendsArray;
    const windowOrgConfig = this.state.winOrgInfo;
    if (!isMany) {
      if (value == "-1") {
        if (key in extendsArray) {
          delete extendsArray[key];
        } else {
          return;
        }
      } else {
        extendsArray[key] = value;
      }
    } else {
      //多选
      if (key in extendsArray) {
        //判断多选选项是否已被选，有的话去掉
        if (extendsArray[key].indexOf(value) !== -1) {
          //已存在,需要排序
          let extendsArrays = extendsArray[key].split(",");
          let itemIndex = extendsArrays.indexOf(value);
          extendsArrays.splice(itemIndex, 1);
          if (extendsArrays.length <= 0) {
            delete extendsArray[key];
          } else {
            extendsArray[key] = extendsArrays.join(",");
          }
        } else {
          //没有被选择,需要排序.
          extendsArray[key] = String(extendsArray[key]) + "," + value;
        }
        if (key in extendsArray && extendsArray[key].split(",").length > 1) {
          //长度大于1时进行排序
          windowOrgConfig.extends.map(i => {
            if (i.key === key) {
              extendsArray[key] = this.softArr(
                i.options.split(","),
                extendsArray[key].split(",")
              ).join(",");
              return;
            }
          });
        }
      } else {
        //不在多extendsArray里，直接添加。
        extendsArray[key] = value;
      }
    }
    this.setState({
      ...this.state,
      extendsArray
    });
  }
  renderPassword() {
    const { user } = this.props;
    return (
      <div>
        {user.have_pwd == 0 ? (
          <div>
            <div className="page-my-profile-verify-header-box">
              <span className="page-my-profile-verify-header-start">*</span>
              <div className="page-my-profile-verify-fonts">设置密码</div>
              <input
                type="text"
                ref={c => {
                  this.password = c;
                }}
                className="page-my-profile-verify-text"
                onChange={this.onTextChanged}
              />
            </div>
            <div className="line1px" />
          </div>
        ) : null}
      </div>
    );
  }
  renderOtherInfo() {
    const {
      winOrgInfo: { extends: extendsFormArr },
      extendsArray,
    } = this.state;

    let renderArr = [];

    if (!extendsArray.user_type) {
      renderArr = extendsFormArr && extendsFormArr.filter(v => (v.key === "user_type"));
    }

    if (extendsArray.user_type === '宝马员工') {
      renderArr = extendsFormArr && extendsFormArr.filter(v => (v.key === "user_type" || v.key === "company_affiliation" || v.key === "employee_id" || v.key === "email"))
    }

    if (extendsArray.user_type === '经销商员工') {
      renderArr = extendsFormArr && extendsFormArr.filter(v => (v.key === "user_type" || v.key === "dealer_name" || v.key === "email"))
    }

    if (extendsArray.user_type === '宝马车主') {
      renderArr = extendsFormArr && extendsFormArr.filter(v => (v.key === "user_type" || v.key === "car_model" || v.key === "email"))
    }

    if (extendsArray.user_type === '公众') {
      renderArr = extendsFormArr && extendsFormArr.filter(v => (v.key === "user_type" || v.key === "email"))
    }

    return (
      <div>
        {renderArr.map((item, index) => {
          switch (
          Number(item.type) //单项选择
          ) {
            case 1:
              return (
                <div key={item.key}>{this.renderOtherInfoSelect(item)}</div>
              );
              break;
            //多项选择
            case 2:
              return (
                <div key={item.key}>{this.renderOtherInfoCheckbox(item)}</div>
              );
              break;
            //单行输入
            case 3:
              return (
                <div key={item.key}>{this.renderOtherInfoInput(item)}</div>
              );
              break;
            //多行输
            case 4:
              return (
                <div key={item.key}>{this.renderOtherInfoManyInput(item)}</div>
              );
              break;

            //上传图片
            case 5:
              return <div key={item.key}>{this.renderOtherPic(item)}</div>;
              break;
            //日期空间
            case 6:
              return (
                <div key={item.key}>{this.renderOtherInfoDate(item)}</div>
              );
              break;
            //日期时间空间
            case 7:
              return (
                <div key={item.key}>{this.renderOtherInfoDateTime(item)}</div>
              );
              break;
            default:
              return;
          }
        })
        }
      </div>
    );
  }

  render() {
    const BackButtonStyle = {
      display: "block",
      width: "100%",
      color: "white",
      border: "none",
      position: "absolute",
      top: "-55px",
      left: "0"
    };
    return (
      <div className="page-my-profile-verify-container">
        {this.state.winOrgInfo === null ? null : (
          <div style={{ width: "100%", height: "100%" }}>
            <div className="page-my-profile-verify-main">
              {//头像
                this.renderAvatars()}
              {//名字
                this.renderName()}

              {//身份证
                this.renderIdCard()}

              {//民族
                this.renderNation()
              }
              {//地址
                this.renderAddr()
              }
              {//密码
                this.renderPassword()}
              {//自定义信息
                this.renderOtherInfo()}
            </div>
            <div className="page-my-profile-verify-btn" onClick={this.onSubmit}>
              提交
            </div>
          </div>
        )}
        <Gallery
          src={this.state.previewData}
          show={this.state.showMultiple}
          defaultIndex={this.state.defaultIndex}
        >
          <Button
            style={BackButtonStyle}
            onClick={e => this.setState({ showMultiple: false })}
            plain
          >
            Back
          </Button>
        </Gallery>
      </div>
    );
  }
}

Verify.title = "完善个人资料";
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
          stt: PropTypes.number
        })
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
          stt: PropTypes.number
        })
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
          stt: PropTypes.number
        })
      )
    })
  }),
  check: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string
    })
  })
};

export default connect(
  state => ({
    user: state.user,
    address: state.info.address,
    check: state.info.checkUser,
    login: state.login.login
  }),
  dispatch =>
    bindActionCreators(
      {
        requestUserInfo,
        checkUser,
        addressDataAction,
        userDefinedInfo,
        loginAction
      },
      dispatch
    )
)(Verify);
