/**
 * @file 我的证书
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Avatar from "../../../components/avatar/avatar";
import Star from "../../../components/star/star";
import { dateTextToDateText } from "../../../utils/funcs";
import { requestUserInfo } from "../../../stores/common";
import "./certificate.css";
import history from "../../history";
import html2canvas from "html2canvas";

class Certificate extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.BussinessInfo = window.orgInfo.name || "和众泽益志愿服务中心";
    this.certTitle = window.orgInfo.cert_title || "和众泽益";
    this.certOrg = window.orgInfo.cert_org || "和众泽益";
    this.certCachet = window.orgInfo.cert_cachet || "/images/my/zdx.png";
    this.certAuthOrg = window.orgInfo.cert_auth_org || "和众泽益志愿服务中心";
    const { user: listData } = this.props;
    const register = listData.regitser_time
      ? dateTextToDateText(
          listData.regitser_time ? listData.regitser_time.split(" ")[0] : 0
        )
      : null;

    const now = listData.server_time
      ? dateTextToDateText(
          listData.server_time ? listData.server_time.split(" ")[0] : 0
        )
      : null;

    this.state = {
      dataUrl: null,
      photo:null,
      register,
      now
    };
  }

  componentWillMount() {
    this.props.requestUserInfo();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { user: listData } = this.props;
    const { user: NlistData } = nextProps;

    if (nextProps.user.id) {
      const register = NlistData.regitser_time
        ? dateTextToDateText(
            NlistData.regitser_time ? NlistData.regitser_time.split(" ")[0] : 0
          )
        : null;

      const now = NlistData.server_time
        ? dateTextToDateText(
            NlistData.server_time ? NlistData.server_time.split(" ")[0] : 0
          )
        : null;

    
      this.setState({
        ...this.state,
        photo:nextProps.user.avatars,
        register,
        now
      }, () => {
          this.htm2Click();
      });
    }
  }

  componentWillUnmount() {}
  htm2Click = () => {
    var that = this;
    var shareContent = this.refs["LaunchContent"];
    var width = shareContent.offsetWidth;
    var height = shareContent.offsetHeight;
    var canvas = document.createElement("canvas");
    var scale = 10;
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.getContext("2d").scale(scale, scale);
    var opts = {
      scale: scale,
      canvas: canvas,
      logging: true,
      width: width,
      height: height,
      useCORS: true
    };
    setTimeout(() => {
      html2canvas(shareContent, opts).then(function (canvas) {
        var dataUrl = canvas.toDataURL("image/jpeg", 10);
          that.setState({ dataUrl });
      });
    },1500)
    // html2canvas(shareContent, opts).then(function(canvas) {
    //   var dataUrl = canvas.toDataURL("image/jpeg", 4);

    //   // console.log(dataUrl);
    //   setTimeout(() => {
    //     that.setState({ dataUrl });
    //   },1000)
      
    //   // localStorage.setItem("dataUrl", JSON.stringify(dataUrl));
    //   // history.push("/my/certificateview");
    // });
  };
 
  renderCertificate() {
    const { user: listData } = this.props;
    if (!listData) {
      return null;
    }

    const starWidth = this.props.user.stars
      ? Number(this.props.user.stars) * Number(20) - Number(5) + "px"
      : null;

    // qM7e5Ba2vp  国有黄金
    return <div className="page-certificate-bg">
        <div className="page-certificate-container-border">
          <h5 className="page-certificate-container-title">
            {this.certTitle}志愿服务证书
          </h5>
          <Avatar src={this.props.user.avatars} size={{ width: 80 }} defaultSrc="/images/my/register.png" />
          <div className="page-certificate-container-certificate" />
          <div className="page-certificate-container-name">
            {this.props.user.real_name}
          </div>

          {this.props.user.stars ? <div className="page-certificate-container-star" style={{ width: `${starWidth}` }}>
              <Star size={{ width: 15, height: 14, score: this.props.user.stars }} />
            </div> : null}

          <div className="page-certificate-container-content">
            证书编号：{this.props.user.identifier}
          </div>
          <div className="page-certificate-container-content">
            {this.state.register}注册成为{this.certOrg}志愿者
          </div>
          <div className="page-certificate-container-content">
            {this.state.now}截止
          </div>
          <div className="page-certificate-container-hours-box">
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item">
                <span>{this.props.user.join_project_count}</span>个
              </div>
              <div className="page-certificate-container-hours-item">
                志愿服务项目
              </div>
            </div>
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item">
                <span>{this.props.user.reward_time}</span>小时
              </div>
              <div className="page-certificate-container-hours-item">
                志愿服务时长
              </div>
            </div>
          </div>
          <div className="page-certificate-container-bottom-infobox">
            <div className="page-certificate-container-bussiness">
              认证机构：{this.certAuthOrg}
            </div>
            <div className="page-certificate-container-teachsupport">
              技术支持：志多星
            </div>
            {this.certCachet ? <img src={this.certCachet} alt="" className="first" /> : <div />}
            {window.orgCode == "qM7e5Ba2vp" ? <img src="/images/my/zdx.png" className="second" /> : null}
          </div>
        </div>
      </div>;
  }

  render() {
    const { user: listData } = this.props;
    const { dataUrl } = this.state;
    if (!listData) {
      return null;
    }
    return <div>
        {dataUrl ? <img style={{ width: "100%", display: "block" }} src={`${this.state.dataUrl}`} /> : <div className="page-certificate-main-container" ref="LaunchContent">
            {/** TODO: */}
            {this.renderCertificate()}
          </div>}
        {dataUrl ? null : <div className="page-certificate-main-mask">
            图片生成中。。。
          </div>} 
      </div>;
  }
}

Certificate.title = "我的证书";

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
    birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    family_id: PropTypes.number,
    join_family_time: PropTypes.string,
    good_at: PropTypes.arrayOf(PropTypes.shape({}))
  })
};

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({ requestUserInfo }, dispatch)
)(Certificate);
