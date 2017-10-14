/**
 * @file 天加成员
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import { } from '../../../stores/common';
import './add.css';

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`请填写${label}`);
    return true;
  }

  return false;
}
class Addmember extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
    // TODO:数据提交成功跳转
  }

  componentWillUnmount() {}
  // 上传照片
  onFileSelect(evt) {
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
      xhr.open('POST', `${window.apiHost}/api/imgupload`, true);
      xhr.send(fd);
    }
  }
  onTextChanged() {
    const name = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
    const phone = this.userphone.value.replace(/(^\s+)|(\s+$)/g, '');
    const password = this.userpassword.value.replace(/(^\s+)|(\s+$)/g, '');
    const agreement = this.checkbox.checked;

    this.setState({
      ...this.state,
      name,
      phone,
      password,
      agreement,
    });
  }
  onSubmit() {
    const name = this.state.name;
    const phone = this.state.phone;
    const password = this.state.password;
    const agreement = this.state.agreement;
    const photo = this.state.photo;
    if (checkEmpty(name, '姓名') || checkEmpty(password, '密码')) {
      return;
    }
    if (!agreement) {
      Alert.warning('请确认已阅读《志多星协议》');
      return;
    }
    if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)) {
      Alert.warning('请输入正确的用户名》');
      return;
    }

    const data = {};
    data.username = name;
    data.pwd = password;
    if (phone) {
      data.phone = phone;
    }
    if (photo) {
      data.avatars = photo;
    }
    // TODO:提交数据
  }
  render() {
    return (
      <div className="page-add">
        <div className="page-add-photo">
          <div className="page-add-photo-container">
            <img className="page-add-photo-img" src={''} alt="" />
            <input ref={(c) => { this.uploader = c; }} onChange={this.onFileSelect} type="file" accept="image/jpeg,image/png,image/gif" className="page-add-uploader-btn" />
          </div>
        </div>
        <div className="page-add-photo-fonts">上传头像(选填)</div>
        <ul>
          <li>
            <div className="page-add-item">
              <span className="page-add-fonts">用户名</span>
              <input className="page-add-input" type="text" ref={(c) => { this.username = c; }} onKeyUp={this.onTextChanged} />
            </div>
            <div className="line1px" />
          </li>
          <li>
            <div className="page-add-item">
              <span className="page-add-fonts">手机号</span>
              <input className="page-add-input" type="tel" ref={(c) => { this.userphone = c; }} onKeyUp={this.onTextChanged} maxLength="11" />
            </div>
            <div className="line1px" />
          </li>
          <li>
            <div className="page-add-item">
              <span className="page-add-fonts">设置密码</span>
              <input className="page-add-input" type="password" ref={(c) => { this.userpassword = c; }} onKeyUp={this.onTextChanged} maxLength="20" minLength="6" />
            </div>
            <div className="line1px" />
          </li>
        </ul>
        <a className="page-add-submmit" onClick={this.onSubmit}>确认提交</a>
        <div className="page-add-agree">
          <input type="checkbox" onClick={this.onTextChanged} className="page-add-checkbox" ref={(c) => { this.checkbox = c; }} />
      我已阅读并授权
      <Link to="/my/agree">
        <span className="page-add-agreement">《志多星用户协议》</span>
      </Link>
        </div>


      </div>
    );
  }
}


Addmember.title = '添加成员';

Addmember.propTypes = {
};

export default connect(
  state => state.add || {},
  dispatch => bindActionCreators({
  }, dispatch),
)(Addmember);
