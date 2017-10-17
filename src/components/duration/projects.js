/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './projects.css';
import Link from '../link/link';
import Image from '../image/image';
import { parseTimeStringToDateString, parseDistance } from '../../utils/funcs';

class DurationProjects extends React.Component {

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
  onHandleClick(project) {
    console.log(project);
    if (this.props.onHandleClick) {
      this.props.onHandleClick(project);
    }
    return false;
  }
  render() {
    const { durationProject } = this.props;
    if (!durationProject) {
      return null;
    } else if (durationProject && !durationProject.length) {
      return <div className="duration-projects-empty-tip">目前还没有志愿项目哦</div>;
    }

    return (
      <ul className="component-duration-projects">
        {
          durationProject.map((project) => {
            const { team } = project;

            return (<li key={project.id} onClick={this.onHandleClick(project)}>
              <div className="component-duration-projects-take-up" />
              <div className="component-duration-projects-main">
                <Link to={`/project/detail/${project.id}`}>
                  <div className="component-duration-projects-main-name">{project.name}</div>
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
              <div className="line1px" />
              <div className="component-duration-projects-footer">
                <Link to={`/team/detail/${project.team.id}`}>
                  <div className="component-duration-projects-footer-logo">
                    <Image src={team.logo} className="component-duration-projects-footer-logo-img" />{team.name}
                  </div>
                  <div className="component-duration-projects-footer-date-box">已获得志愿时长：<span>{project.my_reward_time}小时</span></div>
                </Link>
              </div>


            </li>);
          })
      }
      </ul>
    );
  }
}

DurationProjects.propTypes = {
  durationProject: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default DurationProjects;
