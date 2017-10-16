/**
 * @file 志愿项目
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { projectAction } from '../my.store';
import ProjectsItem from '../../../components/projects/projects';
import TabItem from './component/tabItem';

import './projects.css';

class Projects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      title: ['全部', '待录用', '已录用', '已结束'],
      current: 0,
    };
  }

  componentWillMount() {
    this.props.projectAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  handleClick(index) {
    if (index === 0) {
      this.props.projectAction();
    } else {
      this.props.projectAction(index);
    }
    this.setState({
      ...this.state,
      current: index,
    });
  }
  currentClass(index) {
    return this.state.current === index ? 'page-projects-tab-current-li' : '';
  }
  render() {
    const { project: { data: listData } } = this.props;

    // join_status:0
    return (
      <div className="page-projects">
        <ul className="page-projects-tab-container">
          { this.state.title.map((val, index) =>
           (<TabItem
             currentClass={this.currentClass}
             handleClick={this.handleClick} val={val} index={index}
           />))
          }
        </ul>
        <div className="line1px" />
        <div className="page-projects-main-box">
          {this.props.project.data ?
            <ProjectsItem projects={listData ? listData.list : null} showLabel />
            :
            <div className="page-projects-main-no-info">还未加入项目</div>
          }

        </div>

      </div>
    );
  }
}


Projects.title = '志愿项目';

Projects.propTypes = {
  projectAction: PropTypes.func,
  project: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
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
          lng: PropTypes.string,
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
      ),
    }),
  }),
};

export default connect(
  state => ({
    project: state.my.project,
  }),
  dispatch => bindActionCreators({
    projectAction,
  }, dispatch),
)(Projects);
