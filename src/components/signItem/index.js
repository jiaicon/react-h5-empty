import autoBind from "react-autobind";
import React, { PropTypes } from "react";
import classnames from "classnames";
import Link from "../link/link";
import "./style.css";
import {
  parseDistance,
} from "../../utils/funcs";
import { translate } from 'react-i18next';

class SignItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({})
  };
  constructor(props) {
    super(props);
    autoBind(this);
  }
  renderEmpty() {
    const { t } = this.props;
    return (
      <div className="no-record">
        <div>
          <img src="/images/sign.png" alt="" />
        </div>
        <span>
          <p>{t('还没有项目可以签到')}</p>
          <p>{t('快去加入项目吧')}</p>
        </span>
        <div className="sign-btn-container">
          <Link to="/project/list" className="sign-btn">
            {t('浏览项目')}
          </Link>
        </div>
      </div>
    );
  }
  renderProjectList(data) {
    const { t } = this.props;
    return (
      <div>
        {data.map((record, index) => {
            console.log(record)
          return (
            <li key={index} className="sign-record">
              <Link to={`/sign/signclass/${record.id}`}>
                <div
                  className={classnames({
                    "sign-record-status-shape": true,
                    "sign-record-status-shape-ing": record.project_status == 4 || record.project_status == 3,
                    "sign-record-status-shape-recru": record.project_status == 1 || record.project_status == 2,
                    "sign-record-status-shape-end": record.project_status == 5,
                  })}
                />
                <div className="sign-header">
                  <div className="project-title">{record.name}</div>
                  <div style={{ color: "#686868", fontSize: "13px" }}>
                    {t('活动日期')}:&nbsp;&nbsp;{record.begin.split(" ")[0]}&nbsp; -
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
    const { data, t } = this.props;
    if (!data) {
      return null;
    } else if (data && (data.three_day_project&&!data.three_day_project.length) && (data.project&&!data.project.length)) {
      return (
        <div className="page-sign">
          <div className="component-sign">{this.renderEmpty()}</div>
        </div>
      );
    }
    return <div className="page-sign">
        <div className="component-sign">
          {data.three_day_project && data.three_day_project.length > 0 ? <div className="component-sign-title">
              {t('近3天待打卡项目')}
            </div> : null}

          <ul className="sign-list">
            {data.three_day_project && data.three_day_project.length > 0 ? <div>
                {this.renderProjectList(data.three_day_project)}
              </div> : null}
            {data.project && data.project.length > 0 ? <div className="component-sign-title">
                {t('所有项目')}
              </div> : null}
            {data.project && data.project.length > 0 ? <div>
                {this.renderProjectList(data.project)}
              </div> : null}
          </ul>
        </div>
      </div>;
  }
}

export default translate('translations')(SignItem);
