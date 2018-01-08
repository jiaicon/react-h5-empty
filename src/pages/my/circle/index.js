/**
 * @file 我的志愿圈
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { teamAction } from '../my.store';

import './index.css';
import Link from '../../../components/link/link';
// import TeamsItem from '../../../components/teams/teams';

class Circle extends React.Component {

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

  componentWillUnmount() {

  }
  1
  render() {
    return (
      <div className="page-teams-container">
      1

      </div>
    );
  }
}


Circle.title = '我的志愿圈';

Circle.propTypes = {
  teamAction: PropTypes.func,
  team: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        slogan: PropTypes.string,
        logo: PropTypes.string,
        type: PropTypes.string,
        team_size: PropTypes.number,
        identifier: PropTypes.string,
        contact_name: PropTypes.string,
        contact_phone: PropTypes.string,
        contact_addr: PropTypes.string,
        parent_id: PropTypes.number,
        province_id: PropTypes.number,
        province_name: PropTypes.string,
        city_id: PropTypes.number,
        city_name: PropTypes.string,
        county_id: PropTypes.number,
        county_name: PropTypes.string,
        time_long: PropTypes.number,
        abstract: PropTypes.string,
        created_at: PropTypes.string,
        category: PropTypes.string,
        join_status: PropTypes.number,
      })),
    }),
  }),
};
// team: state.my.team,

export default connect(
  state => ({


  }),
  dispatch => bindActionCreators({ },
    dispatch),
)(Circle);

