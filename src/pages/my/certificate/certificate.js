/**
 * @file 我的证书
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Avatar from '../../../components/avatar/avatar';
import { dateTextToDateText } from '../../../utils/funcs';
import { requestUserInfo } from '../../../stores/common';
import './certificate.css';

class Certificate extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.BussinessInfo = window.orgInfo.name || '和众泽益志愿者服务中心';
    this.certTitle = window.orgInfo.cert_title || '志多星';
    this.certOrg = window.orgInfo.cert_org || '志多星';
    this.certCachet = window.orgInfo.cert_cachet;
    this.certAuthOrg = window.orgInfo.cert_auth_org || '志多星';
    const { user: listData } = this.props;
    const register = dateTextToDateText(listData.regitser_time.split(' ')[0]);

    const now = dateTextToDateText(listData.server_time.split(' ')[0]);


    this.state = {

      register,
      now,
    };
  }


  componentWillMount() {
    this.props.requestUserInfo();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {}

  renderCertificate() {
    const { user: listData } = this.props;
    if (listData == null) {
      return <div>加载中</div>;
    }
    return (
      <div className="page-certificate-bg">
        <div className="page-certificate-container-border">
          <h5 className="page-certificate-container-title">{this.certTitle}志愿服务证书</h5>
          <Avatar src={this.props.user.avatars} size={{ width: 80 }} defaultSrc="/images/my/register.png" />
          <div className="page-certificate-container-certificate" />
          <div className="page-certificate-container-name">{this.props.user.real_name}</div>
          <div className="page-certificate-container-content">证书编号：{this.props.user.identifier}</div>
          <div className="page-certificate-container-content">{this.state.register}注册成为{this.certOrg}志愿者</div>
          <div className="page-certificate-container-content">{this.state.now}截止</div>
          <div className="page-certificate-container-hours-box">
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>{this.props.user.join_project_count}</span>个</div>
              <div className="page-certificate-container-hours-item">志愿服务项目</div>
            </div>
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>{this.props.user.reward_time}</span>小时</div>
              <div className="page-certificate-container-hours-item">志愿服务时长</div>
            </div>
          </div>
          <div className="page-certificate-container-bottom-infobox">
            <div className="page-certificate-container-bussiness">认证机构：{this.certAuthOrg}</div>
            <div className="page-certificate-container-teachsupport">技术支持：志多星</div>
            {this.certCachet ? <img src={this.certCachet} alt="" /> : <div />}
          </div>
        </div>
      </div>
    );
  }


  render() {
    const { user: listData } = this.props;
    if (listData == null) {
      return <div>加载中</div>;
    }
    return (
      <div className="page-certificate-main-container">
        {/** TODO: */}
        {this.renderCertificate()}
      </div>
    );
  }
}


Certificate.title = '我的证书';

Certificate.propTypes = {
  requestUserInfo: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    join_project_count: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    isLogin: PropTypes.bool,
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
  state => ({ user: state.user }),
  dispatch => bindActionCreators({ requestUserInfo }, dispatch),
)(Certificate);
