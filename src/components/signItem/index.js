import autoBind from "react-autobind";
import React, { PropTypes } from "react";
import classnames from "classnames";
import Link from "../link/link";
import "./style.css";
import {
  parseTimeStringToDateString,
  parseDistance,
  isVolunteerInsure
} from "../../utils/funcs";
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
        <div>
          <img src="/images/sign.png" alt="" />
        </div>
        <span>
          <p>还没有项目可以签到</p>
          <p>快去加入项目吧</p>
        </span>
        <div className="sign-btn-container">
          <Link to="/project/list" className="sign-btn">
            浏览项目
          </Link>
        </div>
      </div>
    );
  }
  renderProjectList(data) {
    return (
      <div>
        {data.map((record, index) => {
          return (
            <li key={index} className="sign-record">
              <Link to={`/sign/signclass/${record.id}`}>
                <div
                  className={classnames({
                    "sign-record-status-shape": true,
                    "sign-record-status-shape-ing": record.progress == 2,
                    "sign-record-status-shape-recru": record.progress == 1,
                    "sign-record-status-shape-end": record.progress == 4,
                  })}
                />
                <div className="sign-header">
                  <div className="project-title">{record.name}</div>
                  <div style={{ color: "#686868", fontSize: "13px" }}>
                    活动日期:&nbsp;&nbsp;{record.begin.split(" ")[0]}&nbsp; -
                    &nbsp;
                    {record.end.split(" ")[0]}
                  </div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  <div className="project-info-addr">
                    {record.county_name}
                    {record.distance > 0
                      ? parseDistance(record.distance)
                      : null}
                  </div>
                  {record.people_count_public ? (
                    <div className="project-info-date">
                      <span style={{ color: "#F6AB00" }}>
                        {record.join_people_count}
                      </span>
                      &nbsp;/&nbsp;
                      <span>{record.people_count}</span>
                    </div>
                  ) : null}
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
    console.log(data);
    if (!data) {
      return null;
    } else if (data && !data.three_day_project && !data.project) {
      return (
        <div className="page-sign">
          <div className="component-sign">{this.renderEmpty()}</div>
        </div>
      );
    }
    return <div className="page-sign">
        <div className="component-sign">
          {data.three_day_project && data.three_day_project.length > 0 ? <div className="component-sign-title">
              近3天待打卡项目
            </div> : null}

          <ul className="sign-list">
            {data.three_day_project && data.three_day_project.length > 0 ? <div>
                {this.renderProjectList(data.three_day_project)}
              </div> : null}
            {data.project && data.project.length > 0 ? <div className="component-sign-title">
                所有项目
              </div> : null}
            {data.project && data.project.length > 0 ? <div>
                {this.renderProjectList(data.project)}
              </div> : null}
          </ul>
        </div>
      </div>;
  }
}

export default SignItem;
