/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './projects.css';
import Link from '../link/link';
import Image from '../image/image';
import Avatar from '../avatar/avatar';
import { parseTimeStringToDateString, parseDistance, isVolunteerInsure } from '../../utils/funcs';
import { translate } from 'react-i18next';
import i18next from 'i18next';

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

  statusClassnamesFromProject(project) {
    if (project.join_status == 5) {
      return ""
    }
  }

  render() {
    const { projects, t } = this.props;
    const showLabel = this.props.showLabel;
    if (!projects) {
      return null;
    } else if (projects && !projects.length) {
      return <div className="projects-empty-tip">{t('目前还没有活动哦')}</div>;
    }

    return (
      <ul className="component-projects">
        {
          projects.map((project) => {
            const { team } = project;
            const volunteer = isVolunteerInsure(project.volunteer_security);
            let name = "";
            if(!project.county_name.length) {
                if(!project.city_name) {
                    name=t(project.province_name);
                }else {
                    if(project.city_name=="全省") {
                        name=t(project.province_name);
                    }else {
                        name=project.city_name;
                    }
                }
            }else {
                if(project.county_name==="全市") {
                    if(!project.city_name) {
                        name=t(project.province_name);
                    }else {
                        if(project.city_name=="全省") {
                            name=t(project.province_name);
                        }else {
                            name=project.city_name;
                        }
                    }
                }else {
                    name=project.county_name;
                }
            }
            // let statusClassnames =
            return <li key={project.id}>
                <div>
                  <Link to={`/team/detail/${project.team.id}`} className="project-header">
                    <Avatar src={team.logo} size={{ width: 30, radius: 4 }} />
                    <div className="org-name">{team.name}</div>
                  </Link>
                  <Link to={`/project/detail/${project.id}`} className="project-main">
                    <Image className="image" src={project.list_photo} defaultSrc="/images/default_banner.png" alt="项目图片" />
                    <div className="project-name">
                      {project.name}

                      <div className={classnames({
                          "project-name-logo": volunteer
                        })} />
                    </div>
                    <div className="project-date">
                      {t('活动日期')}：{parseTimeStringToDateString(project.begin)}-{parseTimeStringToDateString(project.end)}
                  </div>
                    {showLabel ? <div className={classnames({
                          "project-status": true,
                          [t("project-status-employed")]:
                            project.join_status === 1 &&
                          //  project.progress !== 4,
                            project.project_status !== 5,
                          [t("project-status-employed-wait")]:
                            project.join_status === 0 &&
                            // project.progress !== 4,
                            project.project_status !== 5,
                            [t("project-status-employed-reject")]:
                            project.join_status === 2 &&
                            // project.progress !== 4,
                            project.project_status !== 5,
                          [t("project-status-employed-end")]:
                            //  project.progress == 4,
                            project.project_status === 5
                        })} /> : <div className={classnames({
                          "project-status": true,
                          [t("project-status-recruit")]:
                          //招募中
                            project.project_status === 2,
                            // project.progress === 1,
                          [t("project-status-full")]:
                          //已爆满
                            project.project_status === 4,
                            // project.progress === 3,
                          [t("project-status-progress")]:
                          //进行中
                            project.project_status === 3,
                            // project.progress === 2,
                          [t("project-status-end")]:
                          //已结束
                            project.project_status === 5,
                        [t("project-status-end-time")]:
                        //报名截止
                        project.project_status === 6
                            // project.progress === 4,
                        })} />}
                          {/*{showLabel ? <div className={classnames({*/}
                          {/*"project-status": true,*/}
                          {/*"project-status-employed":*/}
                            {/*project.join_status === 1 &&*/}
                           {/*project.progress !== 4,*/}
                            {/*// project.project_status !== 5,*/}
                          {/*"project-status-employed-wait":*/}
                            {/*project.join_status === 0 &&*/}
                            {/*project.progress !== 4,*/}
                            {/*// project.project_status !== 5,*/}
                      {/*"project-status-employed-end":*/}
                             {/*project.progress == 4,*/}
                            {/*// project.project_status === 5*/}
                        {/*})} /> : <div className={classnames({*/}
                          {/*"project-status": true,*/}
                          {/*"project-status-recruit":*/}
                            {/*// project.project_status === 2,*/}
                            {/*project.progress === 1,*/}
                          {/*"project-status-full":*/}
                            {/*// project.project_status === 3,*/}
                            {/*project.progress === 3,*/}
                          {/*"project-status-progress":*/}
                            {/*// project.project_status === 4,*/}
                            {/*project.progress === 2,*/}
                          {/*"project-status-end":*/}
                            {/*// project.project_status === 5*/}
                            {/*project.progress === 4,*/}
                        {/*})} />}*/}
                  </Link>
                  <div className="project-footer">
                    <div className="project-location">
                      {name.length&&name || t('全国')} {project.distance == -1 ? '' : (project.distance > 0 ? parseDistance(project.distance) : '0km')}
                    </div>
                      {
                          project.people_count_public == 1 ? <div className="project-members">
                      <span>
                      {Number(project.id) == 2009 ? 588 : project.join_people_count}
                      </span>
                              &nbsp;/&nbsp;
                              <span>{project.people_count}</span>
                          </div> : null
                      }
                  </div>
                </div>
              </li>;
          })
        }
      </ul>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({

  })),
  showLabel: PropTypes.bool,
};

export default translate('translations')(Projects);

