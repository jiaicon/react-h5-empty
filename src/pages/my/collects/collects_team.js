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
import { collectAction } from '../my.store';
import TeamsItem from '../../../components/teams/teams';
import TAB from './collects';

class TeamPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.collectAction(1);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { collect: { data: listData, type } } = this.props;
    return (
      <div>
        <TeamsItem teams={listData && type === 'team' ? listData.list : null} />
      </div>
    );
  }
}

TeamPage.title = '我的收藏';

TeamPage.propTypes = {
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
)(TeamPage);
