/**
 * @file 我的家庭
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import './collects.css';
import TabItem from '../projects/component/tabItem';
import { collectAction } from '../my.store';
import TeamsItem from '../../../components/teams/teams';
import ProjectsItem from '../../../components/projects/projects';

class Collects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      title: ['团队', '项目'],
      current: 0,
    };
  }

  componentWillMount() {
    this.props.collectAction(1);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  handleClick(index) {
    if (index === 0) {
      this.props.collectAction(1);
    } else {
      this.props.collectAction(0);
    }

    this.setState({
      ...this.state,
      current: index,
    });
  }
  currentClass(index) {
    return this.state.current === index ? 'page-collects-tab-current-li' : '';
  }
  render() {
    const { collect: { data: listData } } = this.props;

    // console.log(this.props.collect.data.list);
    return (
      <div className="page-collects">
        <ul className="page-collects-tab-container">
          { this.state.title.map((val, index) =>
             (<TabItem
               currentClass={this.currentClass}
               handleClick={this.handleClick} val={val} index={index}
             />)) }
        </ul>
        <div className="line1px" />
        <div className="page-collects-content">
          <div
            className={cx({
              'page-collects-content-main': this.state.current,
              'page-collects-content-main-current': !this.state.current,
            })}
          >
            <TeamsItem teams={listData ? listData.list : null} />

          </div>
          <div
            className={cx({
              'page-collects-content-main': !this.state.current,
              'page-collects-content-main-current': this.state.current,
            })}
          >
            <ProjectsItem projects={listData ? listData.list : null} showLabel />

          </div>
        </div>

      </div>
    );
  }
}

Collects.title = '我的收藏';

Collects.propTypes = {
  collectAction: PropTypes.func,
  collect: PropTypes.shape({
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
            lat: PropTypes.string,
            join_begin: PropTypes.string,
            join_end: PropTypes.string,
            begin: PropTypes.string,
            end: PropTypes.string,
            people_count: PropTypes.number,
            join_people_count: PropTypes.number,
            reward_time: PropTypes.string,
            activity_status: PropTypes.number,
            category: PropTypes.string,
            service_object: PropTypes.string,
            team: PropTypes.shape({
              id: PropTypes.number,
            }),
            join_status: PropTypes.number,
            my_reward_time: PropTypes.number,

            volunteer_security: PropTypes.string,
            list_photo: PropTypes.string,

            created_at: PropTypes.string,

          }),
        ),


    }),
  }),
};

export default connect(
  state => ({
    collect: state.my.collect,
  }),
  dispatch => bindActionCreators({ collectAction }, dispatch),
)(Collects);
