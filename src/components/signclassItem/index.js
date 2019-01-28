import autoBind from "react-autobind";
import React, { PropTypes } from "react";
import classnames from "classnames";
import Link from "../link/link";
import "./style.css";
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
          目前还没有班次
        </div>
      </div>
    );
  }
  renderProjectList(data) {
    // const { data } = this.props;
    // const records = data && data.list ? data.list : [];
    // // data && data.next && data.next.project ? data.next : null;
    // const next = true;
    // data && data.list && data.list.length === 0 && !next
    // const records = data && data.list ? data.list : [];
    const records = [{}];
    return <div>
        {records.map(record => (
          <li key={record.clock_in_time} className="sign-record">
            <Link to={`/sign/signdetail/detail/${1}`}>
              <div className="sign-header">
                <div style={{ color: "#4A4A4A", fontSize: "16px" }}>
                  2017/9/20 09:00 - 2017/09/23 09:00
                </div>
              </div>
              <div className="line1px" />
              <div className="project-info">
                <div className="project-info-time">
                  预计最多可获得志愿时长&nbsp;&nbsp;
                  <span style={{ color: "#6AC6F8" }}>2.00小时</span>
                </div>
                <div className="project-info-time-shape project-info-time-wait ">
                  待打卡
                </div>
              </div>
            </Link>
          </li>
        ))}
      </div>;
  }

  render() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    // data && data.next && data.next.project ? data.next : null;
    const next = true;
    // data && data.list && data.list.length === 0 && !next
    // if (!data) {
    //   return (
    //     <div className="page-sign-class">
    //       <div className="component-sign-class">{this.renderEmpty()}</div>
    //     </div>
    //   );
    // }
    return <div className="page-sign-class">
        <div className="component-sign-class">
          {data ? null : <div className="component-sign-class-title">
              近3天待打卡班次
            </div>}
          <ul className="sign-list">
            {next ? this.renderProjectList() : null}
            {data ? null : <div className="component-sign-class-title">
                所有班次
              </div>}
            {this.renderProjectList()}
          </ul>
        </div>
      </div>;
  }
}

export default SignItem;
