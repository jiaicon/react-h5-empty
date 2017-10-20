/**
 * @file 天加成员
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import { } from '../../../stores/common';
import Image from '../../../components/image/image';
import { addFamilyAction } from '../my.store';
import history from '../../history';
import './add.css';
import uploadToWX from '../../../utils/wxupload';

const API_HOST = window.apiHost || 'http://alpha.api.volunteer.tmallwo.com';

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
    this.state = ({
      photo: '',
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { add: { data: Cdata },
    add: { fetching: Cfetching },
    add: { failed: Cfailed } } = this.props;

    const { add: { data: Ndata },
    add: { fetching: Nfetching },
    add: { failed: Nfailed } } = nextProps;

    if (!Cdata && Ndata && Cfetching && !Nfetching && !Cfailed && !Nfailed) {
      history.replace('/my/family');
    }
  }

  componentWillUnmount() {}
  // 上传照片
  onAvatarClick() {
    uploadToWX({
      success: (urls) => {
        console.log('图片上传成功:', urls);
        this.setState({
          ...this.state,
          photo: urls[0],
        });
        this.photo = urls[0];
      },
    });
  }

  onTextChanged() {
    const name = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
    const password = this.userpassword.value.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      ...this.state,
      name,
      password,
    });
  }
  onSubmit() {
    const name = this.state.name;
    const password = this.state.password;
    const photo = this.state.photo;
    if (checkEmpty(name, '姓名') || checkEmpty(password, '密码')) {
      return;
    }
    if (password.length <= 5 || password.length >= 19) {
      Alert.warning('密码范围6-20位数字字母组成');
      return;
    }
    if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)) {
      Alert.warning('请输入正确的用户名》');
      return;
    }

    const data = {};
    data.username = name;
    data.pwd = password;
    if (photo) {
      data.avatars = photo;
    }
    this.props.addFamilyAction(data);
  }
  render() {
    return (
      <div className="page-add">
        <div className="page-add-photo">
          <div
            className="page-add-photo-container" onClick={this.onAvatarClick}
          >
            <Image className="page-add-photo-img" src={this.state.photo} />
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
              <span className="page-add-fonts">设置密码</span>
              <input className="page-add-input" type="password" ref={(c) => { this.userpassword = c; }} onKeyUp={this.onTextChanged} maxLength="20" minLength="6" />
            </div>
            <div className="line1px" />
          </li>
        </ul>
        <div className="page-add-submmit" onClick={this.onSubmit}>确认提交</div>
        <div className="page-add-agree">
      提交代表已同意
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
  addFamilyAction: PropTypes.func,
  add: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
      data: PropTypes.shape({
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
    }),
  }),

};

export default connect(
  state => ({
    add: state.my.addFamily,
  }),
  dispatch => bindActionCreators({
    addFamilyAction,
  }, dispatch),
)(Addmember);
