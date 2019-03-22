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
import { requestProjectDetail } from '../../project/detail/detail.store';
import { requestUserInfo } from '../../../stores/common';
import ModalNew from "../../../components/posterModal/ModalNew";
import {PostDataModel_ProjectSign} from "../../../components/posterModal/PostDataModel";

class SignPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = props.route.params.Id;
    this.proid = props.route.params.proid;
    this.state = { turnMap: false };
  }

  componentWillMount() {
    this.props.requestClockInfo(this.Id);
    this.props.requestProjectDetail(this.proid);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
      console.log('this.props::::', this.props);
      console.log('nextProps::::', nextProps);
    if (nextProps.clickinfo && nextProps.clickinfo.data) {
      // isBeyond判断时间是否超出，true为第二天
      let isBeyond = false;
      let begin = moment(nextProps.clickinfo.data.clock_info.begin).valueOf();
      let end = moment(nextProps.clickinfo.data.clock_info.end).valueOf();
      let secondDayEnd = moment(nextProps.clickinfo.data.clock_info.end)
        .add(1, "days")
        .valueOf();

      let now = +new Date();
      if (now <= end) {
        isBeyond = false;
      } else {
        isBeyond = true;
      }

      let isAfterToday = false;
      if (now <= secondDayEnd) {
        isAfterToday = false;
      } else {
        isAfterToday = true;
      }
      
      this.setState({
        ...this.state,
        type: nextProps.clickinfo.data.clock_info.type,
        isBeyond,
        isAfterToday
      });
    }
    const { failed: tFailed, fetching: tFetching } = this.props.clockinginfo;
    const { failed: nFailed, fetching: nFetching } = nextProps.clockinginfo;
    if(!tFailed && tFetching && !nFailed && !nFetching) {
        Alert.success('打卡成功');
        // location.replace(`/sign/signdetail/detail/${this.proid}/${this.Id}`);
        //打卡成功后重新获取数据，更新页面，页面state太多，不知道更新哪些，直接全部获取
        this.props.requestClockInfo(this.Id);
        this.props.requestProjectDetail(this.proid);
        this.openShare();
    }
  }
    //分享图片 打卡成功后打开  需判断1. 打卡的方式   2. 签到方式的签退
    openShare(share) {
        const { data: detaildata } = this.props.clickinfo;
        const { clock_info: data, user_clock_info: userData, clock_info: user_data } = detaildata;
        // userData.type = 1
        // userData.type = 2 && userData.ori_clock_end_time && userData.ori_clock_end_time.length
        if(user_data.type == 1) {
            this.setState({
                visible: true
            })
        }
        if(userData.type == 2 && userData.ori_clock_end_time && userData.ori_clock_end_time == "0000-00-00 00:00:00") {
            this.setState({
                visible: true
            })
        }
    }
  componentWillUnmount() {
 
  }

  renderMap() {
    const { data: detaildata } = this.props.clickinfo;
    if (!detaildata) return null;
    let source = `https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${
      detaildata.clock_info.lat
    },${
      detaildata.clock_info.lng
    };&key=GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI&referer=myapp`;

    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0"
        }}
      >
        <div
          ref="mapbtn"
          style={{
            width: '80px',
            textAlign:'center',
            fontSize:'14px',
            padding: "5px",
            border: "2px solid rgb(134, 172, 242)",
            background: "rgb(255, 255, 255)",
            zIndex: "1",
            position: "absolute",
            left: '0',
            right: '0',
            margin:'2px auto'
          }}
          onClick={() => { this.setState({ turnMap:false})}}
        >
          关闭地图
        </div>
        <iframe
          style={{
            width: "100%",
            height: "100%"
          }}
          src={source}
        />
      </div>
    );
  }
  turnOnMap = () => {
    this.setState({ turnMap: true })
  
  }
  handleBallClick=(data)=>{
    this.props.clocking(data);
  }
  renderClock=()=>{
    const { data: detaildata } = this.props.clickinfo;
    if (!detaildata) return null;
    const { clock_info: data, user_clock_info: userData } = detaildata;
    const { type, isBeyond } = this.state;
    let renderDom = null;
    let firstPoint = false;
    let endPoint = false;
    console.log("=================================detaildata==================================",detaildata)
    if (Object.keys(userData).length === 0) {
      // 没超过时间，没打卡，显示打卡球
      if (!isBeyond) {
        renderDom = (
          <div className="sign-ball-content">
            <SignBall
              ballTitle="签到打卡"
              clickFunc={this.handleBallClick}
              mapFunc={this.turnOnMap}
              data={detaildata.clock_info}
            />
          </div>
        );
      } else {
        // 没打卡，超出时间显示补卡
        renderDom = (
          <Link to={`/sign/replacement/${this.proid}/${this.Id}`}>
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
          </Link>
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
                  {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
            <Link to={`/sign/replacement/${this.proid}/${this.Id}`}>
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
            </Link>
          );
        }
      } else if (userData.verify_status === 0) {
        // 待审核
        firstPoint = true;
        renderDom = (
          <div>
            <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
            <Link to={`/sign/replacement/${this.proid}/${this.Id}`}
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
            </Link>
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
                预计可获得服务时长{data.reward_time}小时
              </div>
              <div className="detail-content" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
  renderSignInSignOff=()=>{
    const { data: detaildata } = this.props.clickinfo;
    if (!detaildata) return null;
    const { clock_info: data, user_clock_info: userData } = detaildata;
    const { type, isBeyond,isAfterToday } = this.state;
    let renderfirstDom = null;
    let rendersecondDom = null;
    let renderthirdDom = null;
    let firstPoint = false;
    let secondPoint = false;
    let endPoint = false;
    console.log('detaildata::::', detaildata);
    if (Object.keys(userData).length === 0) {
      // 没超过时间，没打卡，显示打卡球
      if (!isBeyond) {
        renderfirstDom = (
          <div className="sign-ball-content">
            <SignBall
              ballTitle="签到打卡"
              mapFunc={this.turnOnMap}
              clickFunc={this.handleBallClick}
              data={detaildata.clock_info}
              isSigninStatus={true}
            />
          </div>
        );
      } else {
        // 没打卡，超出时间显示补卡
        renderfirstDom = (
          <Link to={`/sign/replacement/${this.proid}/${this.Id}`}>
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
          </Link>
        );
      }
      firstPoint = true;
      // TODO:
    } else {
      // 打卡了，分审核，并且签退有打卡球
      // 先判断签退有没有值
      // 没有显示打卡球

      if (userData.verify_status === -1) {
        // verify_status -1没申请，没超过时间，有值正常显示
        if (userData.clock_end_time !== "0000-00-00 00:00:00") {
            //已签退
          endPoint = true;
          renderfirstDom = (
            <div>
              <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                  {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
          //未签退
          secondPoint = true;
          if (!isAfterToday) {
            renderfirstDom = (
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                  mapFunc={this.turnOnMap}
                  clickFunc={this.handleBallClick}
                  data={detaildata.clock_info}
                  isSigninStatus={true}
                />
              </div>
            );
          } else {
            renderfirstDom = (
              <div>
                <div style={{ color: " #4A4A4A", fontSize: "14px" }}>
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
              <Link to={`/sign/replacement/${this.proid}/${this.Id}`}>
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
              </Link>
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
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签退'}时间 {moment(userData.clock_end_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签退'}时间 {moment(userData.clock_end_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签到'}时间 {moment(userData.clock_in_time).format("HH:mm")}
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
                    {userData.type == 1 ? '打卡' : '签退'}时间 {moment(userData.clock_end_time).format("HH:mm")}
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

    if (Object.keys(userData).length > 0 ) {
      if (userData.clock_end_time !== "0000-00-00 00:00:00") {
        if (userData.verify_status === -1 || userData.verify_status === 1) {
          firstPoint = false;
          secondPoint = false;
          endPoint = true;
          renderthirdDom = (
            <div className="detail-title">
                  获得服务时长{userData.reward_time}小时
            </div>
          );
        }// 审核通过或者正常打卡获取时长了
        else {
          firstPoint = false;
          secondPoint = true;
          endPoint = false;
          renderthirdDom = (
            <div className="detail-title">
                  预计可获得服务时长{userData.reward_time}小时
            </div>
          );
        }//审核中或者审核驳回
      }//签退了
      else {
        renderthirdDom = (
          <div className="detail-title">
                预计可获得服务时长{data.reward_time}小时
          </div>
        );
      }      
    }
    else {
      firstPoint = true;
      secondPoint = false;
      endPoint = false;
      renderthirdDom = (
        <div className="detail-title">
              预计可获得服务时长{data.reward_time}小时
        </div>
      );
    }

    return (
      <div className="page-sign-detail">
        <div className="page-sign-title">
          <div
            style={{ fontSize: "14px", color: "#4A4A4A" }}
            onClick={() => {
              this.setState({ turnMap: true });
            }}
          >
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
              {renderthirdDom}
              <div className="detail-content" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
    closeModal() {
        this.setState({
            visible: false
        })
    }
    renderModal(data) {
        const { user } = this.props;
        console.log(this.props);
        const postData = PostDataModel_ProjectSign(data,user);
        const { visible } = this.state;
        return  visible === true ? <ModalNew postData={postData} visible={this.state.visible} maskCloseable={this.closeModal}  /> : null;
    }
  render=()=>{
    const { turnMap } = this.state;
      const { type } = this.state;
      const { data: data } = this.props.requestProjectDetailData;
      return (
      <div>
          {!turnMap
          ? type == 1
            ? this.renderClock()
            : this.renderSignInSignOff()
          : this.renderMap()}
          {
              data ? this.renderModal(data) : null
          }
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
    clickinfo: state.sign.clickinfo,
      clockinginfo: state.sign.clocking,
      requestProjectDetailData: state.project.detail,
      user: state.user
  }),
  dispatch => bindActionCreators({ requestClockInfo, clocking, requestProjectDetail }, dispatch)
)(SignPage);
