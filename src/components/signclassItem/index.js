import autoBind from "react-autobind";
import React, { PropTypes } from "react";
import classnames from "classnames";
import Link from "../link/link";
import "./style.css";
import moment from "moment";
Date.prototype.Format = function(fmt) {
  // author: meizz
  const o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  }
  return fmt;
};

class SignItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({})
  };
  constructor(props) {
    super(props);
    autoBind(this);
  }
  renderEmpty() {
    return (
      <div className="no-record">
        <div>目前还没有班次</div>
      </div>
    );
  }
  renderProjectList(data) {
    console.log(data);
    return (
      <div>
        {data.map((record, index) => {
          let actionClassName = "";
          let actionLabel = "";
          if (record.status == 0 || record.status == 1) {
            actionClassName = "project-info-time-wait";
            actionLabel = "待打卡";
          } else if (record.status == 6) {
            actionClassName = "project-info-time-pass";
            actionLabel = "已通过";
          } else if (record.status == 5) {
            actionClassName = "project-info-time-audit";
            actionLabel = "审核中";
          } else if (record.status == 7) {
            actionClassName = "project-info-time-reject";
            actionLabel = "被驳回";
          } else if (record.status == 4) {
            actionClassName = "project-info-time-done";
            actionLabel = "已签到";
          } else if (record.status == 1 || record.status == 2) {
            actionClassName = "project-info-time-card";
            actionLabel = "待补卡";
          }

          return (
            <li key={index} className="sign-record">
              <Link to={`/sign/signdetail/detail/${record.id}`}>
                <div className="sign-header">
                  <div style={{ color: "#4A4A4A", fontSize: "16px" }}>
                    {moment(record.begin).format("YYYY/MM/DD HH:mm")} -{" "}
                    {moment(record.end).format("YYYY/MM/DD HH:mm")}
                  </div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  <div className="project-info-time">
                    预计最多可获得志愿时长&nbsp;&nbsp;
                    <span style={{ color: "#6AC6F8" }}>
                      {record.reward_time}小时
                    </span>
                  </div>
                  <div className={`project-info-time-shape ${actionClassName}`}>
                    {actionLabel}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </div>
    );
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    } else if (data && !data.three_day_clock && !data.clock) {
      return <div className="page-sign-class-empty-tip">目前还没有班次哟~</div>;
    }
    return (
      <div className="page-sign-class">
        <div className="component-sign-class">
          {data.three_day_project && data.three_day_project.length > 0 ? (
            <div className="component-sign-class-title">近3天待打卡班次</div>
          ) : null}

          <ul className="sign-list">
            {data.three_day_project && data.three_day_project.length > 0 ? (
              <div>{this.renderProjectList(data.three_day_project)}</div>
            ) : null}
            {data.clock && data.clock.length > 0 ? (
              <div className="component-sign-class-title">所有班次</div>
            ) : null}
            {data.clock && data.clock.length > 0 ? (
              <div>{this.renderProjectList(data.clock)}</div>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default SignItem;
