/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import classnames from "classnames";
import "./projects.css";
import Link from "../link/link";
import Image from "../image/image";
import Avatar from "../avatar/avatar";
import {
  parseTimeStringToDateString,
  parseDistance,
  isVolunteerInsure
} from "../../utils/funcs";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  render() {
    const { projects } = this.props;
    const showLabel = this.props.showLabel;
    if (!projects) {
      return null;
    } else if (projects && !projects.length) {
      return <div className="projects-empty-tip">目前还没有活动哦</div>;
    }

    return (
      <ul className="component-projects">
        {projects.map(project => {
          const { team } = project;
          const volunteer = isVolunteerInsure(project.volunteer_security);
          return (
            <li key={project.id}>
              <div>
                <Link
                  to={`/team/detail/${project.team.id}`}
                  className="project-header"
                >
                  <Avatar src={team.logo} size={{ width: 30, radius: 4 }} />
                  <div className="org-name">{team.name}</div>
                </Link>
                <Link
                  to={`/project/detail/${project.id}`}
                  className="project-main"
                >
                  <Image
                    className="image"
                    src={project.list_photo}
                    defaultSrc="/images/default_banner.png"
                    alt="项目图片"
                  />
                  <div className="project-name">
                    {project.name}

                    <div
                      className={classnames({
                        "project-name-logo": volunteer
                      })}
                    />
                  </div>
                  {project.begin_public ? (
                    <div className="project-date">
                      活动日期：{parseTimeStringToDateString(project.begin)}-
                      {parseTimeStringToDateString(project.end)}
                    </div>
                  ) : null}

                  {showLabel ? (
                    <div
                      className={classnames({
                        "project-status": true,
                        "project-status-employed":
                          project.join_status === 1 && project.progress !== 4,
                        // project.project_status !== 5,
                        "project-status-employed-wait":
                          project.join_status === 0 && project.progress !== 4,
                        // project.project_status !== 5,
                        "project-status-employed-end": project.progress == 4
                        // project.project_status === 5
                      })}
                    />
                  ) : (
                    <div
                      className={classnames({
                        "project-status": true,
                        "project-status-recruit":
                          // project.project_status === 2,
                          project.progress === 1,
                        "project-status-full":
                          // project.project_status === 3,
                          project.progress === 3,
                        "project-status-progress":
                          // project.project_status === 4,
                          project.progress === 2,
                        "project-status-end":
                          // project.project_status === 5
                          project.progress === 4
                      })}
                    />
                  )}
                </Link>
                <div className="project-footer">
                  <div className="project-location">
                    {project.county_name}{" "}
                    {project.distance > 0
                      ? parseDistance(project.distance)
                      : null}
                  </div>
                  {project.people_count_public ? (
                    <div className="project-members">
                      <span>
                        {project.join_people_count}
                      </span>
                      &nbsp;/&nbsp;
                      <span>{project.people_count}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  showLabel: PropTypes.bool
};

export default Projects;
