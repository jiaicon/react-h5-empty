/**
 * @file 项目认领信息填写
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { bindActionCreators } from 'redux';

import history from '../../../history';

import Link from '../../../../components/link/link';
import './index.css';
import IMAGE from '../../../../components/image/image';

import { improveClaim } from '../../starModel/starModel.store';
import { userCenterAction } from '../../../my/my.store';

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`请填写${label}`);
    return true;
  }
  return false;
}
class projectClaimInfo extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.Id;
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { improve: Limprove } = this.props;
    const { improve: Nimprove } = nextProps;
    if (Limprove.fetching && !Nimprove.fetching && !Nimprove.failed) {
      window.location.replace(`/sanlitun/projectClaim/detail/${this.projectId}`);
    }
  }

  componentWillUnmount() {}
  onTextChanged() {
    const name = this.name.value.replace(/(^\s+)|(\s+$)/g, '');
    const people = this.people.value.replace(/(^\s+)|(\s+$)/g, '');


    const phone = this.phone.value.replace(/(^\s+)|(\s+$)/g, '');
    const email = this.email.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      name,
      people,
      phone,
      email,
    });
  }
  onSubmit() {
    const name = this.state.name;
    const people = this.state.people;
    const phone = this.state.phone;
    const email = this.state.email;
    const { user: { isLogin } } = this.props;
    if (
      checkEmpty(name, '团队名称')
      || checkEmpty(people, '团队联系人')
      || checkEmpty(phone, '联系电话')
      || checkEmpty(email, '邮箱地址')
    ) {
      return;
    }
    if (!/^1[34578]\d{9}$/.test(phone)) {
      Alert.warning('请输入正确的手机号');
      return;
    }
    if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)) {
      Alert.warning('请输入正确的邮箱地址');
      return;
    }
    const data = {
      id: this.projectId,
      name,
      people,
      phone,
      email,
    };

    this.props.improveClaim(data);
  }
  render() {
    return (
      <div className="page-projectClaimInfo-container">
        <div className="page-projectClaimInfo-item">
          <span>团队名称</span>
          <input type="text" onChange={this.onTextChanged} ref={(c) => { this.name = c; }} />
        </div>
        <div className="page-projectClaimInfo-item">
          <span>团队联系人</span>
          <input type="text" onChange={this.onTextChanged} ref={(c) => { this.people = c; }} />
        </div>
        <div className="page-projectClaimInfo-item">
          <span>联系电话</span>
          <input type="number" onChange={this.onTextChanged} ref={(c) => { this.phone = c; }} />
        </div>
        <div className="page-projectClaimInfo-item">
          <span>邮箱地址</span>
          <input type="email" onChange={this.onTextChanged} ref={(c) => { this.email = c; }} />
        </div>
        <a className="page-projectClaimInfo-btn" onClick={this.onSubmit}>提交</a>

      </div>
    );
  }
}


projectClaimInfo.title = '认领信息';

projectClaimInfo.propTypes = {
  improveClaim: PropTypes.func,
  improve: PropTypes.shape({
    data: PropTypes.shape({}),
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
  user: PropTypes.shape({
    isLogin: PropTypes.bool,
  }),
  userCenterAction: PropTypes.func,
};

export default connect(
  state => ({
    improve: state.sanlitun.improve,
    user: state.user,
  }),
  dispatch => bindActionCreators({ improveClaim, userCenterAction },
    dispatch),
)(projectClaimInfo);
