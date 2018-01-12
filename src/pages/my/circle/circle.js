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

import './circle.css';
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
      <div className="page-circle-container">
        <div className="page-circle-header-container">
          <div className="page-circle-header-top">
            <Link className="page-circle-header-top-link-container" to="/my/circlelist">
              <div className="page-circle-header-top-link-icon page-circle-header-top-link-icon-ld" ><span className="page-circle-header-top-link-icon-ld-ponit">16</span></div>
              消息列表
            </Link>
            <div className="line1px-v page-circle-header-top-line" />
            <Link className="page-circle-header-top-link-container" to="/my/circlepublish">
              <div className="page-circle-header-top-link-icon page-circle-header-top-link-icon-publish" />
              发布动态
            </Link>
          </div>
          <div className="line1px" />
        </div>

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

