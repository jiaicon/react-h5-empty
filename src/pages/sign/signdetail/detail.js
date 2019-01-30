/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Alert from "react-s-alert";
import Link from "../../../components/link/link";
import { requestClockInfo, clocking } from "../../sign/sign.store";
import classnames from "classnames";
import moment from "moment";
import history from "../../history";

import { getCity, getLocation } from "../../../utils/funcs";
import { requestHomeData, saveCity, getAreaCity } from "../../home/home.store";
import "./detail.css";
function GetDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = (lat1 * Math.PI) / 180.0;
  var radLat2 = (lat2 * Math.PI) / 180.0;
  var a = radLat1 - radLat2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  // return的距离单位为km;
  return s;
}
class SignBall extends React.Component {
  static propTypes = {
    isLight: PropTypes.bool,
    clickFunc: PropTypes.func,
    data: PropTypes.shape({}),
    ballTitle: PropTypes.string
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.timer = null;

    this.state = {
      time: `${moment().format("HH:mm:ss")}`,
      type: 0,
      isSign: false,
      signIndex: 3
    };
  }

  componentWillMount() {
    this.getloc();
  }
  getloc = () => {
    const { data } = this.props;
    getLocation(
      loc => {
        let distance = GetDistance(loc.lat, loc.lng, data.lat, data.lng);
        console.log(data);

        if (distance <= data.distance) {
          this.setState({ isSign: true, signIndex: 1 });
        } else {
          this.setState({ isSign: false, signIndex: 2 });
        }
      },
      error => {
        if (fail) {
          this.setState({ isSign: false, signIndex: 3 });
        }
      }
    );
  };
  componentDidMount() {
    const that = this;
    this.timer = setInterval(() => {
      that.setState({
        time: `${moment().format("HH:mm:ss")}`
      });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  handleClick() {
    const { time, isSign, signIndex } = this.state;
    const { data } = this.props;
    if (!isSign) return;
    let postMessages = {
      id: data.id,

    }
    this.props.clickFunc(postMessages);
  }
  renderDistanceInfo() {
    const { time, isSign, signIndex } = this.state;
    let dom = null;
    if (signIndex == 1) {
      dom = (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <img src="/images/sign/signsuccess.png" className="sign-first"/>
          已进入签到地点范围
        </div>
      );
    } else if (signIndex == 2) {
      dom = <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="/images/sign/signal.png" className="sign-first" />
        当前不在签到地点范围：<span style={{ color:' #230000'}}>查看签到地点</span> <img src="/images/sign/signmore.png" style={{ width: "9px" }} />
        </div>;
    } else if (signIndex == 3) {
      dom = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="images/sign/signfail.png" className="sign-first"/>
          当前无法定位:请开启定位权限
          <img src="/images/sign/signaw.png" style={{width:'9px'}} />
        </div>
      );
    }
    return <div className="page-signball-distanceinfo-container">{dom}</div>;
  }
  render() {
    const { time, isSign, signIndex } = this.state;
    return (
      <div>
        <div
          className={classnames({
            "page-signball-shape": true,
            "page-signball-islight": isSign
          })}
          onClick={this.handleClick}
        >
          <div className="page-signball-title">{this.props.ballTitle}</div>
          <div className="page-signball-date">{time}</div>
        </div>
        {this.renderDistanceInfo()}
      </div>
    );
  }
}
class SignPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = props.route.params.Id;
    this.state = { turnMap: false };
  }

  componentWillMount() {
    this.props.requestClockInfo(this.Id);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.clickinfo && nextProps.clickinfo.data) {
      this.setState({
        ...this.state,
        type: nextProps.clickinfo.data.clock_info.type,
        isToday:
          moment(nextProps.clickinfo.data.clock_info.begin).format(
            "YYYY-MM-DD"
          ) == moment().format("YYYY-MM-DD")
            ? true
            : false
      });
    }
  }

  componentWillUnmount() {}
  renderMap() {
    let source =
      "https://apis.map.qq.com/tools/poimarker?type=0&marker=coord: 39.96554, 116.26719; title: 打卡地点; addr: 北京市海淀区复兴路32号院&key=GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI&referer=myapp";

    return (
      <iframe
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0"
        }}
        src={source}
      />
    );
  }
  handleBallClick(data) {
    this.props.clocking(data)
  }
  renderInfo() {
    const { data: detaildata } = this.props.clickinfo;
    if (!detaildata) return null;
    const data = detaildata.clock_info;
    const { type, isToday } = this.state;
    return (
      <div className="page-sign-detail">
        <div className="page-sign-title">
          <div style={{ fontSize: "14px", color: "#4A4A4A" }}>
            {data.project_name}
          </div>
          <div style={{ fontSize: "12px", color: "#9B9B9B" }}>
            {/* replace(/\-/g,"/") */}
            {moment(data.begin).format("YYYY.MM.DD")}
          </div>
        </div>

        <div className="project-detail-list">
          <ul>
            <li>
              <div className="item-point" />
              <div className="line1px-v" />
              <div className="detail-title">
                {type == 1 ? "打卡开始时间" : "签到时间"}
                &nbsp; &nbsp;
                {moment(data.begin).format("HH:MM")}
              </div>
              <div className="detail-content">
                <div className="sign-ball-content">
                  {!isToday ? (
                    <SignBall
                      ballTitle="签到打卡"
                      clickFunc={this.handleBallClick}
                      data={detaildata.clock_info}
                    />
                  ) : null}
                </div>
              </div>
            </li>
            <li>
              <div className="item-point" />
              <div className="line1px-v" />
              <div className="detail-title">
                {type == 1 ? "打卡截止时间" : "签退时间"}
                &nbsp; &nbsp;
                {moment(data.end).format("HH:MM")}
              </div>
              <div className="detail-content">
                {!isToday ? (
                  <SignBall
                    ballTitle="签退"
                    clickFunc={this.handleBallClick}
                    data={detaildata.clock_info}
                  />
                ) : null}
              </div>
            </li>
            <li>
              <div className="item-point" />
              <div className="detail-title">
                预计可获得志愿时长{data.reward_time}小时
              </div>
              <div className="detail-content" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
  render() {
    const { turnMap } = this.state;

    return <div>{!turnMap ? this.renderInfo() : this.renderMap()}</div>;
  }
}

SignPage.title = "签到打卡";

SignPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({})
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func
};
export default connect(
  state => ({
    clickinfo: state.sign.clickinfo
  }),
  dispatch => bindActionCreators({ requestClockInfo, clocking}, dispatch)
)(SignPage);
