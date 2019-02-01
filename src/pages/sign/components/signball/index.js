/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import moment from "moment";

import { getCity, getLocation } from "../../../../utils/funcs";
import "./detail.css";
// 定位距离
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
export default  class SignBall extends React.Component {
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
            locDetail: null,
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
        console.log(data);
        let isToday = false;
        let begin = moment(data.begin).valueOf();
        let end = moment(data.end).valueOf();
        let now = +new Date();
        if (begin <= now && now < end) {
            isToday = true;
        }
        getCity(
            (city, detaildata) => {
                let { detail } = JSON.parse(detaildata);
                let distance = GetDistance(detail.lat, detail.lng, data.lat, data.lng);

                if (distance <= data.distance) {
                    if (isToday) {
                        this.setState({
                            isSign: true,
                            signIndex: 1,
                            locDetail: detail
                        });
                    } else {
                        this.setState({
                            isSign: false,
                            signIndex: 1,
                            locDetail: detail
                        });
                    }
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

    componentWillReceiveProps(nextProps) { }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    handleClick() {
        const { time, isSign, signIndex, locDetail } = this.state;
        const { data } = this.props;
        if (!isSign) return;
        let postMessages = {
            id: data.id,
            addr: `${locDetail.city}${locDetail.district}${locDetail.addr}`
        };
        this.props.clickFunc(postMessages);
    }
    renderDistanceInfo() {
        const { time, isSign, signIndex } = this.state;
        let dom = null;
        if (signIndex == 1) {
            dom = (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img src="/images/sign/signsuccess.png" className="sign-first" />
                    已进入签到地点范围
        </div>
            );
        } else if (signIndex == 2) {
            dom = (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img src="/images/sign/signal.png" className="sign-first" />
                    当前不在签到地点范围：
          <span style={{ color: " #230000" }}>查看签到地点</span>{" "}
                    <img
                        src="/images/sign/signmore.png"
                        style={{ width: "4px", marginLeft: "4px" }}
                    />
                </div>
            );
        } else if (signIndex == 3) {
            dom = (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img src="images/sign/signfail.png" className="sign-first" />
                    当前无法定位:请开启定位权限
          <img src="/images/sign/signaw.png" style={{ width: "9px" }} />
                </div>
            );
        }
        return <div className="page-signball-distanceinfo-container">{dom}</div>;
    }
    render() {
        const { time, isSign, signIndex } = this.state;
        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
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