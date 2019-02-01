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
import SignBall from "../components/signball/index";
import { getCity, getLocation } from "../../../utils/funcs";
import { requestHomeData, saveCity, getAreaCity } from "../../home/home.store";
import "./detail.css";

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
      // isBeyond判断时间是否超出，true为第二天
      let isBeyond = false;
      let begin = moment(nextProps.clickinfo.data.clock_info.begin).valueOf();
      let end = moment(nextProps.clickinfo.data.clock_info.end).valueOf();
      let secondDayEnd = moment(nextProps.clickinfo.data.clock_info.end)
        .add(1, "days")
        .valueOf();

      let now = +new Date();
      if (now <= secondDayEnd) {
        isBeyond = false;
      } else if (now > secondDayEnd) {
        isBeyond = true;
      }
      console.log(isBeyond);
      this.setState({
        ...this.state,
        type: nextProps.clickinfo.data.clock_info.type,
        isBeyond
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
    console.log(data);
    this.props.clocking(data);
  }
  renderClock() {
    const { data: detaildata } = this.props.clickinfo;
    if (!detaildata) return null;
    const { clock_info: data, user_clock_info: userData } = detaildata;
    const { type, isBeyond } = this.state;
    let renderDom = null;
    let firstPoint = false;
    let endPoint = false;

    if (Object.keys(userData).length === 0) {
      // 没超过时间，没打卡，显示打卡球
      if (!isBeyond) {
        renderDom = (
          <div className="sign-ball-content">
            <SignBall
              ballTitle="签到打卡"
              clickFunc={this.handleBallClick}
              data={detaildata.clock_info}
            />
          </div>
        );
      } else {
        // 没打卡，超出时间显示补卡
        renderDom = (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#A0D9F7"
              }}
            >
              <img
                src="/images/sign/signedit.png"
                style={{ width: "16px", marginRight: "5px" }}
              />
              申请补卡
              <img
                src="/images/sign/signmore.png"
                style={{ width: "4px", marginLeft: "4px" }}
              />
            </div>
          </div>
        );
      }
      firstPoint = true;
    } else if (Object.keys(userData).length > 0) {
      if (userData.verify_status === -1) {
        // verify_status -1没申请，没超过时间，有值正常显示
        if (userData.clock_in_time !== "0000-00-00 00:00:00") {
          endPoint = true;
          renderDom = (
            <div>
              <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                签到时间 {moment(userData.clock_in_time).format("HH:mm")}
              </div>
              <div
                style={{
                  color: " #9b9b9b",
                  fontSize: "10px",
                  paddingLeft: "10px",
                  background: "url(/images/projectdetailaddr.png) no-repeat",
                  backgroundSize: "8px 10px",
                  backgroundPosition: "left center"
                }}
              >
                {userData.clock_in_addr}
              </div>
            </div>
          );
        } else {
          //显示补卡
          firstPoint = true;
          renderDom = (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#A0D9F7"
                }}
              >
                <img
                  src="/images/sign/signedit.png"
                  style={{ width: "16px", marginRight: "5px" }}
                />
                申请补卡
                <img
                  src="/images/sign/signmore.png"
                  style={{ width: "4px", marginLeft: "4px" }}
                />
              </div>
            </div>
          );
        }
      } else if (userData.verify_status === 0) {
        // 待审核
        firstPoint = true;
        renderDom = (
          <div>
            <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
              签到时间 {moment(userData.clock_in_time).format("HH:mm")}
            </div>
            <div
              style={{
                color: " #9b9b9b",
                fontSize: "10px",
                paddingLeft: "10px",
                background: "url(/images/projectdetailaddr.png) no-repeat",
                backgroundSize: "8px 10px",
                backgroundPosition: "left center"
              }}
            >
              {userData.clock_in_addr}
            </div>
            <div style={{ color: "#9B9B9B", fontSize: "12px" }}>补卡·待审</div>
          </div>
        );
      } else if (userData.verify_status === 1) {
        // 通过
        endPoint = true;
        renderDom = (
          <div>
            <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
              签到时间 {moment(userData.clock_in_time).format("HH:mm")}
            </div>
            <div
              style={{
                color: " #9b9b9b",
                fontSize: "10px",
                paddingLeft: "10px",
                background: "url(/images/projectdetailaddr.png) no-repeat",
                backgroundSize: "8px 10px",
                backgroundPosition: "left center"
              }}
            >
              {userData.clock_in_addr}
            </div>
            <div style={{ color: "#9B9B9B", fontSize: "12px" }}>补卡·通过</div>
          </div>
        );
      } else if (userData.verify_status === 2) {
        // 驳回
        firstPoint = true;
        renderDom = (
          <div>
            <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
              签到时间 {moment(userData.clock_in_time).format("HH:mm")}
            </div>
            <div
              style={{
                color: " #9b9b9b",
                fontSize: "10px",
                paddingLeft: "10px",
                background: "url(/images/projectdetailaddr.png) no-repeat",
                backgroundSize: "8px 10px",
                backgroundPosition: "left center"
              }}
            >
              {userData.clock_in_addr}
            </div>
            <div style={{ color: "#9B9B9B", fontSize: "12px" }}>补卡·驳回</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#A0D9F7"
              }}
            >
              <img
                src="/images/sign/signedit.png"
                style={{ width: "16px", marginRight: "5px" }}
              />
              申请补卡
              <img
                src="/images/sign/signmore.png"
                style={{ width: "4px", marginLeft: "4px" }}
              />
            </div>
          </div>
        );
      }
    }
    return (
      <div className="page-sign-detail">
        <div className="page-sign-title">
          <div style={{ fontSize: "14px", color: "#4A4A4A" }}>
            {data.project_name}
          </div>
          <div style={{ fontSize: "12px", color: "#9B9B9B" }}>
            {moment(data.begin).format("YYYY.MM.DD")}
          </div>
        </div>

        <div className="project-detail-list">
          <ul>
            <li>
              <div
                className={`item-point ${firstPoint ? "item-point-color" : ""}`}
              />
              <div className="line1px-v" />
              <div className="detail-title">
                打卡开始时间 &nbsp; &nbsp;
                {moment(data.begin).format("YYYY-MM-DD HH:mm")}
              </div>
              <div className="detail-content">{renderDom}</div>
            </li>
            <li>
              <div className="item-point" />
              <div className="line1px-v" />
              <div className="detail-title">
                打卡截止时间 &nbsp; &nbsp;
                {moment(data.end).format("YYYY-MM-DD HH:mm")}
              </div>
              <div className="detail-content" />
            </li>
            <li>
              <div
                className={`item-point ${endPoint ? "item-point-color" : ""}`}
              />
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
  renderSignInSignOff() {
    const { data: detaildata } = this.props.clickinfo;
    if (!detaildata) return null;
    const { clock_info: data, user_clock_info: userData } = detaildata;
    const { type, isBeyond } = this.state;
    let renderfirstDom = null;
    let rendersecondDom = null;
    let firstPoint = false;
    let secondPoint = false;
    let endPoint = false;
    if (Object.keys(userData).length === 0) {
      // 没超过时间，没打卡，显示打卡球
      if (!isBeyond) {
        renderfirstDom = (
          <div className="sign-ball-content">
            <SignBall
              ballTitle="签到打卡"
              clickFunc={this.handleBallClick}
              data={detaildata.clock_info}
            />
          </div>
        );
      } else {
        // 没打卡，超出时间显示补卡
        renderfirstDom = (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#A0D9F7"
              }}
            >
              <img
                src="/images/sign/signedit.png"
                style={{ width: "16px", marginRight: "5px" }}
              />
              申请补卡
              <img
                src="/images/sign/signmore.png"
                style={{ width: "4px", marginLeft: "4px" }}
              />
            </div>
          </div>
        );
      }
      firstPoint = true;
      // TODO:
    } else if (Object.keys(userData).length > 0) {
      // 打卡了，分审核，并且签退有打卡球
      // 先判断签退有没有值
      // 没有显示打卡球

      if (userData.verify_status === -1) {
        // verify_status -1没申请，没超过时间，有值正常显示
        if (userData.clock_end_time !== "0000-00-00 00:00:00") {
          endPoint = true;
          renderfirstDom = (
            <div>
              <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                签到时间 {moment(userData.clock_in_time).format("HH:mm")}
              </div>
              <div
                style={{
                  color: " #9b9b9b",
                  fontSize: "10px",
                  paddingLeft: "10px",
                  background: "url(/images/projectdetailaddr.png) no-repeat",
                  backgroundSize: "8px 10px",
                  backgroundPosition: "left center"
                }}
              >
                {userData.clock_in_addr}
              </div>
            </div>
          );
          rendersecondDom = (
            <div>
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签退时间 {moment(userData.clock_end_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            </div>
          );
        } else {
          if (!isBeyond) {
            renderfirstDom = (
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            );
            rendersecondDom = (
              <div className="sign-ball-content">
                <SignBall
                  ballTitle="签退打卡"
                  clickFunc={this.handleBallClick}
                  data={detaildata.clock_info}
                />
              </div>
            );
          } else {
            renderfirstDom = (
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            );
            rendersecondDom = (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#A0D9F7"
                  }}
                >
                  <img
                    src="/images/sign/signedit.png"
                    style={{ width: "16px", marginRight: "5px" }}
                  />
                  申请补卡
                  <img
                    src="/images/sign/signmore.png"
                    style={{ width: "4px", marginLeft: "4px" }}
                  />
                </div>
              </div>
            );
          }
        }
      } else if (userData.verify_status === 0) {
        // 待审核

        if (
          userData.clock_in_time == userData.ori_clock_in_time &&
          userData.ori_clock_in_time != "0000-00-00 00:00:00"
        ) {
          renderfirstDom = (
            <div>
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            </div>
          );
        } else {
          renderfirstDom = (
            <div>
              <div>
                <div
                  style={{
                    color: " #4A4A4A",
                    fontSize: "14px"
                  }}
                >
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>

                <div
                  style={{
                    color: "#9B9B9B",
                    fontSize: "12px"
                  }}
                >
                  补卡·待审
                </div>
              </div>
            </div>
          );
        }

        if (
          userData.clock_end_time == userData.ori_clock_end_time &&
          userData.ori_clock_end_time != "0000-00-00 00:00:00"
        ) {
          rendersecondDom = (
            <div>
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签退时间 {moment(userData.clock_end_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            </div>
          );
        } else {
          rendersecondDom = (
            <div>
              <div>
                <div
                  style={{
                    color: " #4A4A4A",
                    fontSize: "14px"
                  }}
                >
                  签到时间 {moment(userData.clock_end_time).format("HH:mm")}
                </div>

                <div
                  style={{
                    color: "#9B9B9B",
                    fontSize: "12px"
                  }}
                >
                  补卡·待审
                </div>
              </div>
            </div>
          );
        }
      } else if (userData.verify_status === 1) {
        // 通过

        if (
          userData.clock_in_time == userData.ori_clock_in_time &&
          userData.ori_clock_in_time != "0000-00-00 00:00:00"
        ) {
          renderfirstDom = (
            <div>
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            </div>
          );
        } else {
          renderfirstDom = (
            <div>
              <div>
                <div
                  style={{
                    color: " #4A4A4A",
                    fontSize: "14px"
                  }}
                >
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>

                <div
                  style={{
                    color: "#9B9B9B",
                    fontSize: "12px"
                  }}
                >
                  补卡·通过
                </div>
              </div>
            </div>
          );
        }

        if (
          userData.clock_end_time == userData.ori_clock_end_time &&
          userData.ori_clock_end_time != "0000-00-00 00:00:00"
        ) {
          rendersecondDom = (
            <div>
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签退时间 {moment(userData.clock_end_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            </div>
          );
        } else {
          rendersecondDom = (
            <div>
              <div>
                <div
                  style={{
                    color: " #4A4A4A",
                    fontSize: "14px"
                  }}
                >
                  签到时间 {moment(userData.clock_end_time).format("HH:mm")}
                </div>

                <div
                  style={{
                    color: "#9B9B9B",
                    fontSize: "12px"
                  }}
                >
                  补卡·通过
                </div>
              </div>
            </div>
          );
        }
      } else if (userData.verify_status === 2) {
        // 驳回

        if (
          userData.clock_in_time == userData.ori_clock_in_time &&
          userData.ori_clock_in_time != "0000-00-00 00:00:00"
        ) {
          renderfirstDom = (
            <div>
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            </div>
          );
        } else {
          renderfirstDom = (
            <div>
              <div>
                <div
                  style={{
                    color: " #4A4A4A",
                    fontSize: "14px"
                  }}
                >
                  签到时间 {moment(userData.clock_in_time).format("HH:mm")}
                </div>

                <div
                  style={{
                    color: "#9B9B9B",
                    fontSize: "12px"
                  }}
                >
                  补卡·驳回
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#A0D9F7"
                  }}
                >
                  <img
                    src="/images/sign/signedit.png"
                    style={{ width: "16px", marginRight: "5px" }}
                  />
                  重新申请补卡
                  <img
                    src="/images/sign/signmore.png"
                    style={{ width: "4px", marginLeft: "4px" }}
                  />
                </div>
              </div>
            </div>
          );
        }

        if (
          userData.clock_end_time == userData.ori_clock_end_time &&
          userData.ori_clock_end_time != "0000-00-00 00:00:00"
        ) {
          rendersecondDom = (
            <div>
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  签退时间 {moment(userData.clock_end_time).format("HH:mm")}
                </div>
                <div
                  style={{
                    color: " #9b9b9b",
                    fontSize: "10px",
                    paddingLeft: "10px",
                    background: "url(/images/projectdetailaddr.png) no-repeat",
                    backgroundSize: "8px 10px",
                    backgroundPosition: "left center"
                  }}
                >
                  {userData.clock_in_addr}
                </div>
              </div>
            </div>
          );
        } else {
          rendersecondDom = (
            <div>
              <div>
                <div
                  style={{
                    color: " #4A4A4A",
                    fontSize: "14px"
                  }}
                >
                  签到时间 {moment(userData.clock_end_time).format("HH:mm")}
                </div>

                <div
                  style={{
                    color: "#9B9B9B",
                    fontSize: "12px"
                  }}
                >
                  补卡·驳回
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#A0D9F7"
                  }}
                >
                  <img
                    src="/images/sign/signedit.png"
                    style={{ width: "16px", marginRight: "5px" }}
                  />
                  重新申请补卡
                  <img
                    src="/images/sign/signmore.png"
                    style={{ width: "4px", marginLeft: "4px" }}
                  />
                </div>
              </div>
            </div>
          );
        }
      }
    }

    return (
      <div className="page-sign-detail">
        <div className="page-sign-title">
          <div style={{ fontSize: "14px", color: "#4A4A4A" }}>
            {data.project_name}
          </div>
          <div style={{ fontSize: "12px", color: "#9B9B9B" }}>
            {moment(data.begin).format("YYYY.MM.DD")}
          </div>
        </div>

        <div className="project-detail-list">
          <ul>
            <li>
              <div
                className={`item-point ${firstPoint ? "item-point-color" : ""}`}
              />
              <div className="line1px-v" />
              <div className="detail-title">
                签到时间 &nbsp; &nbsp;
                {moment(data.begin).format("YYYY-MM-DD HH:mm")}
              </div>
              {renderfirstDom}
            </li>
            <li>
              <div
                className={`item-point ${
                  secondPoint ? "item-point-color" : ""
                }`}
              />
              <div className="line1px-v" />
              <div className="detail-title">
                签退时间 &nbsp; &nbsp;
                {moment(data.end).format("YYYY-MM-DD HH:mm")}
              </div>
              {rendersecondDom}
            </li>
            <li>
              <div
                className={`item-point ${endPoint ? "item-point-color" : ""}`}
              />
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
    const { type } = this.state;
    return (
      <div>
        {!turnMap
          ? type == 1
            ? this.renderClock()
            : this.renderSignInSignOff()
          : this.renderMap()}
      </div>
    );
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
  dispatch => bindActionCreators({ requestClockInfo, clocking }, dispatch)
)(SignPage);
