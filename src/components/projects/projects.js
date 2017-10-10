import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './projects.css';
import Link from '../link/link';
import Image from '../image/image';
import { parseTimeStringToDateString } from '../../utils/funcs';

class Projects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { projects } = this.props;

    if (!projects) {
      return null;
    } else if (projects && !projects.length) {
      return <div className="projects-empty-tip">目前还没有活动哦</div>;
    }

    return (
      <ul className="component-projects">
        {
          projects.map((project) => {
            const { team } = project;

            return (<li key={project.id}>
              <div>
                <Link to={`/team/detail/${project.team.id}`} className="project-header">
                  <Image className="org-avatar" src={team.logo} alt="头像" />
                  <div className="org-name">{team.name}</div>
                </Link>
                <Link to={`/project/detail/${project.id}`} className="project-main">
                  <Image src={project.photo} defaultSrc="/images/default_banner.png" alt="项目图片" />
                  <div className="project-name">{project.name}</div>
                  <div className="project-date">活动日期：{parseTimeStringToDateString(project.begin)}-{parseTimeStringToDateString(project.end)}</div>
                  <div
                    className={classnames({
                      'project-status': true,
                      'project-status-recruit': project.activity_status === 1,
                      'project-status-progress': project.activity_status === 2,
                      'project-status-end': project.activity_status === 3,
                    })}
                  />
                </Link>
                <div className="project-footer">
                  <div className="project-location">{project.county_name} {project.distance}</div>
                  <div className="project-members">
                    <span>{project.join_people_count}</span>
                    &nbsp;/&nbsp;
                    <span>{project.people_count}</span>
                  </div>
                </div>
              </div>
            </li>);
          })
        }
      </ul>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default Projects;
