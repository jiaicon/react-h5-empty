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

import Link from '../../../components/link/link';

import classnames from 'classnames';
import AllPage from './list_all';
import CheckPage from './list_check';
import PassPage from './list_pass';
import RejectPage from './list_reject';
import RevokePage from './list_revoke';

import './list.css';

const TAB_URL_MAPS = {
  '/my/fundingApplication/list': <AllPage />,
  '/my/fundingApplication/list_check': <CheckPage />,
  '/my/fundingApplication/list_pass': <PassPage />,
  '/my/fundingApplication/list_reject': <RejectPage />,
  '/my/fundingApplication/list_revoke': <RevokePage />,
};
class Projects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      page: this.getTabName(this.props),
    };
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      page: this.getTabName(nextProps),
    });
  }

  componentWillUnmount() {}
  getTabName(props) {
    return TAB_URL_MAPS[(props || this.props).route.path];
  }
  render() {
    const { page } = this.state;
    const { path } = this.props.route;
    return (
      <div className="page-projects-container">
        <div style={{ width: '100%', height: '50px' }}>
          <ul className="page-projects-tab-container">
            <li>
              <Link to="/my/fundingApplication/list">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/fundingApplication/list',
                  })}
                >全部</div>
              </Link>
            </li>
            <li>
              <Link to="/my/fundingApplication/list_check">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/fundingApplication/list_check',
                  })}
                >待审核</div>
              </Link>
            </li>
            <li>
              <Link to="/my/fundingApplication/list_pass">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/fundingApplication/list_pass',
                  })}
                >已通过</div>
              </Link>
            </li>
            <li>
              <Link to="/my/fundingApplication/list_reject">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/fundingApplication/list_reject',
                  })}
                >被驳回</div>
              </Link>
            </li>
            <li>
              <Link to="/my/fundingApplication/list_revoke">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/fundingApplication/list_revoke',
                  })}
                >已撤销</div>
              </Link>
            </li>
          </ul>
          <div className="line1px" style={{ width: '100%' }} />
        </div>
        <div className="page-projects-content-main">
          {page}
        </div>

      </div>
    );
  }
}


Projects.title = '资助申请';

Projects.propTypes = {
  projectAction: PropTypes.func,
  project: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          photo: PropTypes.array,
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
