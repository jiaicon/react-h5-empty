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
import i18next from 'i18next';

class Projects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.projectAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { project: { data: listData } } = this.props;
    return (
      <div >
        {this.props.project.data ?
          <ProjectsItem projects={listData ? listData.list : null} showLabel />
        :
          <div />
        }
      </div>
    );
  }
}


Projects.title = i18next.t('志愿项目');

Projects.propTypes = {
  projectAction: PropTypes.func,
  project: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          photo: PropTypes.array,
          list_photo: PropTypes.string,
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
          lat: PropTypes.string,
          join_begin: PropTypes.string,
          join_end: PropTypes.string,
          begin: PropTypes.string,
          end: PropTypes.string,
          people_count: PropTypes.number,
          join_people_count: PropTypes.number,
          reward_time: PropTypes.string,
          activity_status: PropTypes.number,
          category: PropTypes.arrayOf(PropTypes.shape({})),
          service_object: PropTypes.arrayOf(PropTypes.shape({})),
          team: PropTypes.shape({}),
          join_status: PropTypes.number,
          my_reward_time: PropTypes.number,
        }),
      ),
    }),
  }),
  route: PropTypes.shape({
    path: PropTypes.string,
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
