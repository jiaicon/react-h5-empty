/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './projects.css';
import Link from '../link/link';
import Avatar from '../avatar/avatar';
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

  onClick(e) {
    const id = e.currentTarget.id;
    const name = e.currentTarget.getAttribute('data-name');
    const data = {
      id,
      name,
    };
    this.props.HandleClick(data);
  }
  render() {
    const { durationProject } = this.props;
    if (!durationProject) {
      return null;
    } else if (durationProject && !durationProject.length) {
      return <div className="duration-projects-empty-tip">目前还没有志愿项目哦</div>;
    }
    const isEntry = this.props.isEntry;
    return (
      <div style={{height: '800px', overflowY: 'auto'}}>
        {
          isEntry ?
            <ul className="component-duration-projects">
              {
            durationProject.map((project) => {
              const { team } = project;

              return (<li key={project.id} >
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
                      <div className="component-duration-projects-footer-logo-right">
                        <Avatar src={team.logo} size={{ width: 30, radius: 4 }} />
                      </div>
                      {team.name}
                    </div>
                    <div className="component-duration-projects-footer-date-box">已获得志愿时长：<span>{project.my_reward_time}小时</span></div>
                  </Link>
                </div>


              </li>);
            })
          }
            </ul>
          :
            <ul className="component-duration-projects">
              {
            durationProject.map((project) => {
              const { team } = project;

              return (<li
                key={project.id} onClick={this.onClick} id={project.id}
                data-name={project.name}
              >
                <div className="component-duration-projects-take-up" />
                <div className="component-duration-projects-main" >

                  <div className="component-duration-projects-main-name">{project.name}</div>
                  <div className="component-duration-projects-main-date">
                    <div className="component-duration-projects-main-date-icon component-duration-projects-main-date-icon-date" />
                    {parseTimeStringToDateString(project.begin)}
                    -
                    {parseTimeStringToDateString(project.end)}
                  </div>
                  <div className="component-duration-projects-main-date">
                    <div className="component-duration-projects-main-date-icon component-duration-projects-main-date-icon-addr" />
                    {project.county_name} {parseDistance(project.distance)}
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


              </li>);
            })
        }
            </ul>
        }
      </div>
    );
  }
}

DurationProjects.propTypes = {
  durationProject: PropTypes.arrayOf(PropTypes.shape({

  })),
  isEntry: PropTypes.bool,
  HandleClick: PropTypes.func,
};

export default DurationProjects;
