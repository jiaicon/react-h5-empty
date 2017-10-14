/**
 * @file 志愿项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import '../projects.css';

class ProjectItem extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const data = this.props.data;
    return (
      <div className="page-projectItem-container">
        <div className="page-projectItem-takeup" />
        <div className="page-projectItem-main">
          <div className="page-projectItem-main-nav">
            <img src={data.photo} alt="logo" />
            <div className="page-projectItem-main-nav-name">{data.team.name}</div>
          </div>
          <div className="page-projectItem-main-banner">
            <img className="page-projectItem-main-banner-bg" src={data.team.logo} alt="logo" />
            <div className="page-projectItem-main-banner-state" />
          </div>
          <div className="page-projectItem-main-title">{data.name}</div>
          <div className="page-projectItem-main-time">活动日期：{data.join_begin}-{data.join_end}</div>
          <div className="page-projectItem-main-people">朝阳区 0.6km</div>
        </div>

      </div>
    );
  }
}


ProjectItem.title = '志愿项目';

ProjectItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
    content: PropTypes.string,
    identifier: PropTypes.string,
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    lng: PropTypes.number,
    lat: PropTypes.number,
    join_begin: PropTypes.string,
    join_end: PropTypes.string,
    begin: PropTypes.string,
    end: PropTypes.string,
    people_count: PropTypes.number,
    join_people_count: PropTypes.number,
    reward_time: PropTypes.number,
    activity_status: PropTypes.number,
    category: PropTypes.string,
    service_object: PropTypes.string,
    team: PropTypes.string,
    join_status: PropTypes.number,
    my_reward_time: PropTypes.number,
  }),
};

export default ProjectItem;
