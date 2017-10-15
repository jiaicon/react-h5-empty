/**
 * @file 志愿团队
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { teamAction } from '../my.store';
import './teams.css';
import Link from '../../../components/link/link';
import TeamsItem from '../../../components/teams/teams';

class Teams extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.teamAction();
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }

  renderTeamTemplate() {
    const { team: { data: listData } } = this.props;
    return (
      <div>
        <TeamsItem teams={listData ? listData.list : null} showLabel />
      </div>
    );
  }
  // <div className="page-teams-search-btn" />
  render() {
    return (
      <div className="page-teams-container">
        <div className="page-teams-search-container">
          <div className="page-teams-container-box">
            <Link className="component-search-bar" to="/team/search">
              <input className="input" placeholder="搜索团队" />
            </Link>
          </div>
        </div>
        <div className="line1px" />
        <div className="page-teams-main">
          {this.renderTeamTemplate()}


        </div>

      </div>
    );
  }
}


Teams.title = '志愿团队';

Teams.propTypes = {
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


export default connect(
  state => ({
    team: state.my.team,

  }),
  dispatch => bindActionCreators({
    teamAction },
    dispatch),
)(Teams);

