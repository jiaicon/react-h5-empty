/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import "./projects.css";
import Link from "../link/link";
import Avatar from "../avatar/avatar";
import { translate } from 'react-i18next';
import ModalNew from "../posterModal/ModalNew";
import { PostDataModel_ProjectSign } from "../posterModal/PostDataModel";

import { parseTimeStringToDateString, parseDistance } from "../../utils/funcs";

class DurationProjects extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      visible: false,
      detailData: null,
    };

  }


  componentWillMount() {
    console.log(this.props.user)
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  onClick(e) {
    const info = JSON.parse(e.currentTarget.getAttribute("data-data"));
    console.log(info);
    const data = {
      ...info
    };
    this.props.HandleClick(data);
  }
  poster=(data)=>{
    console.log(data,this.props);
    this.setState({
      ...this.state,
      visible: true,
      detailData: data,
    });
  }
  closeModal=()=>{
    this.setState({
      ...this.state,
      visible: false,
      detailData:null,
    })
  }
  render() {
    const { durationProject, t } = this.props;
    if (!durationProject) {
      return null;
    } else if (durationProject && !durationProject.length) {
      return (
        <div className="duration-projects-empty-tip">{t('目前还没有志愿项目哦')}</div>
      );
    }
    const isEntry = this.props.isEntry;
    return <div>
        <div style={{ height: "800px", overflowY: "auto" }}>
          {isEntry ? <ul className="component-duration-projects">
              {durationProject.map(project => {
                const { team } = project;

                return <li key={project.id}>
                    <div className="component-duration-projects-take-up" />

                    <div className="component-duration-projects-main">
                      <div className="component-duration-projects-main-name">
                        {project.name}
                      </div>
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                          <Link to={`/project/detail/${project.id}`}>
                            <div className="component-duration-projects-main-date">
                              <div className="component-duration-projects-main-date-icon component-duration-projects-main-date-icon-date" />
                              {parseTimeStringToDateString(project.begin)}-{parseTimeStringToDateString(project.end)}
                            </div>
                            <div className="component-duration-projects-main-date">
                              <div className="component-duration-projects-main-date-icon component-duration-projects-main-date-icon-addr" />
                              {project.county_name} {parseDistance(project.distance)}
                            </div>
                          </Link>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <div style={{ fontSize: "13px", color: "#6AC6F8", border: "1px solid #6AC6F8", borderRadius: "4px", padding: "2px 4px" }} onClick={() => this.poster(project)}>
                            {t('生成海报')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="line1px" />

                    <div className="component-duration-projects-footer">
                      <Link to={`/team/detail/${project.team.id}`}>
                        <div className="component-duration-projects-footer-logo">
                          <div className="component-duration-projects-footer-logo-right">
                            <Avatar src={team.logo} size={{ width: 30, radius: 4 }} />
                          </div>
                          {team.name}
                        </div>
                        <div className="component-duration-projects-footer-date-box">
                          {t('已获得时长')}：
                          <span>{project.my_reward_time}{t('小时')}</span>
                        </div>
                      </Link>
                    </div>
                  </li>;
              })}
            </ul> : <ul className="component-duration-projects">
              {durationProject.map(project => {
                const { team } = project;

                return <li key={project.id} onClick={this.onClick} data-data={JSON.stringify(project)}>
                    <div className="component-duration-projects-take-up" />
                    <div className="component-duration-projects-main">
                      <div className="component-duration-projects-main-name">
                        {project.name}
                      </div>
                      <div className="component-duration-projects-main-date">
                        <div className="component-duration-projects-main-date-icon component-duration-projects-main-date-icon-date" />
                        {parseTimeStringToDateString(project.begin)}-{parseTimeStringToDateString(project.end)}
                      </div>
                      <div className="component-duration-projects-main-date">
                        <div className="component-duration-projects-main-date-icon component-duration-projects-main-date-icon-addr" />
                        {project.county_name} {project.distance > 0 ? parseDistance(project.distance) : null}
                      </div>
                    </div>
                    <div className="line1px" />
                    <div className="component-duration-projects-footer">
                      <a>
                        <div className="component-duration-projects-footer-logo">
                          <div className="component-duration-projects-footer-logo-right">
                            <Avatar src={team.logo} size={{ width: 30, radius: 4 }} />
                          </div>
                          {team.name}
                        </div>
                      </a>
                    </div>
                  </li>;
              })}
            </ul>}
        </div>
        {this.state.detailData ? <ModalNew postData={this.state.detailData?PostDataModel_ProjectSign(this.state.detailData, this.props.user):null} maskCloseable={true} visible={this.state.visible} maskCloseable={this.closeModal} /> : null}
      </div>;
  }
}

DurationProjects.propTypes = {
  durationProject: PropTypes.arrayOf(PropTypes.shape({})),
  isEntry: PropTypes.bool,
  HandleClick: PropTypes.func,
  user: PropTypes.arrayOf(PropTypes.shape({})),
};

export default translate('translations')(DurationProjects);
