/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './projects.css';
import Link from '../../../../components/link/link';
import Image from '../../../../components/image/image';
import Avatar from '../../../../components/avatar/avatar';
import { parseTimeStringToDateString, parseDistance, isVolunteerInsure } from '../../../../utils/funcs';

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
    const showLabel = this.props.showLabel;
    if (!projects) {
      return null;
    } else if (projects && projects.length === 0) {
      return <div className="projects-empty-tip">目前还没有活动哦</div>;
    }
    // <Avatar src={team.logo} size={{ width: 30, radius: 4 }} />
    return (
      <ul className="component-sanlitun-projects">
        {
          projects.map(project => (<li key={project.id}>
            <div>
              <a className="project-sanlitun-header">
                <Avatar src={project.logo} size={{ width: 30, radius: 4 }} />
                <div className="sanlitun-org-name">{project.team_name}</div>
              </a>
              <Link to={`/sanlitun/projectClaim/detail/${project.id}`} className="project-sanlitun-main">
                <Image
                  className="sanlitun-image"
                  src={project.banner}
                  defaultSrc="/images/default_banner.png" alt="项目图片"
                />
                <div className="project-sanlitun-name">
                  {project.name}
                </div>
                <div className="project-sanlitun-date">活动日期：{parseTimeStringToDateString(project.begin)}-{parseTimeStringToDateString(project.end)}</div>
                <div
                  className={classnames({
                    'project-sanlitun-status': true,
                    'project-sanlitun-status-employed': project.claim_status === 1,
                    'project-sanlitun-status-employed-wait': project.claim_status === 2,
                    'project-sanlitun-status-employed-end': project.claim_status === 3,
                  })}
                />
              </Link>
            </div>
          </li>))
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
