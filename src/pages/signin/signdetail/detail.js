/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Alert from "react-s-alert";
import Link from "../../../components/link/link";
import { requestCheckinList, checkin } from "../../signin/signin.store";

import history from "../../history";

import { getCity, getLocation } from "../../../utils/funcs";
import { requestHomeData, saveCity, getAreaCity } from "../../home/home.store";
import "./detail.css";
class SigninPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { turnMap: false };
  }

  componentWillMount() {
    this.props.requestCheckinList();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}
  renderMap() {
    let source =
      "https://apis.map.qq.com/tools/poimarker?type=0&marker=coord: 39.96554, 116.26719; title: 成都; addr: 北京市海淀区复兴路32号院&key=GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI&referer=myapp";

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
  renderInfo() {
    const data = {
      addr: "昌平区金域华府(东区)",
      begin: "2019-01-01 00:00:00",
      city_id: 110100,
      city_name: "北京市",
      collection_status: 0,
      contact_name: "郭晓炜",
      contact_phone: "15522463978",
      contact_phone_public: 1,
      content: "<p>1231231</p>",
      county_id: 110101,
      county_name: "东城区",
      created_at: "2019-01-14 17:26:51",
      custom_config: null,
      distance: -1,
      end: "2019-01-30 23:59:59",
      id: 91,
      identifier: "ZDX2019011400000091",
      join_end: "2019-01-30",
      join_people_count: 0,
      join_status: 0,
      lat: "40.0653650",
      list_photo: "",
      lng: "116.3143310",
      my_reward_time: "0.00",
      name: "1.14 测试",
      people_count: 14,
      photo: null,
      project_status: 4,
      province_id: 110000,
      province_name: "北京",
      reward_time: "5.00",
      volunteer_security: "志愿者保险"
    };
    var type = true;

    return (
      <div className="page-signin-detail">
        <div className="page-signin-title">
          <div style={{ fontSize: "14px", color: "#4A4A4A" }}>
            志多星关注程序员健康活动
          </div>
          <div style={{ fontSize: "12px", color: "#9B9B9B" }}>2019.01.09</div>
        </div>

        <div className="project-detail-list">
          <ul>
            <li>
              <div className="item-point" />
              <div className="line1px-v" />
              <div className="detail-title">
                {type ? "打卡开始时间" : "签到时间"}
                &nbsp; &nbsp;
                {data.begin.split(" ")[0]}
              </div>
              <div className="detail-content">1</div>
            </li>
            <li>
              <div className="item-point" />
              <div className="line1px-v" />
              <div className="detail-title">
                {type ? "打卡截止时间" : "签退时间"}
                &nbsp; &nbsp;
                {data.end.split(" ")[0]}
              </div>
              <div className="detail-content">2221</div>
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

SigninPage.title = "签到打卡";

SigninPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({})
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func
};
export default connect(
  state => ({
    data: state.signin.ckeckinList.data,
    checkinData: state.signin.checkin
  }),
  dispatch =>
    bindActionCreators(
      { requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity },
      dispatch
    )
)(SigninPage);
