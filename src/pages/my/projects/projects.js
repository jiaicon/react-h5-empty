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
import AllPage from './projects_all';
import WaitPage from './projects_wait';
import PassPage from './projects_pass';
import EndPage from './projects_end';

import './projects.css';

const TAB_URL_MAPS = {
  '/my/projects/': <AllPage />,
  '/my/projects/wait': <WaitPage />,
  '/my/projects/pass': <PassPage />,
  '/my/projects/end': <EndPage />,
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
    this.props.projectAction();
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
    const { project: { data: listData } } = this.props;
    const { page } = this.state;
    const { path } = this.props.route;
    return (
      <div className="page-projects-container">
        <div style={{ width: '100%', height: '50px' }}>
          <ul className="page-projects-tab-container">
            <li>
              <Link to="/my/projects/">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/projects/',
                  })}
                >全部</div>
              </Link>
            </li>
            <li>
              <Link to="/my/projects/wait">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/projects/wait',
                  })}
                >待录用</div>
              </Link>
            </li>
            <li>
              <Link to="/my/projects/pass">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/projects/pass',
                  })}
                >已录用</div>
              </Link>
            </li>
            <li>
              <Link to="/my/projects/end">
                <div
                  className={classnames({
                    'page-projects-li-a-div-style': true,
                    active: path === '/my/projects/end',
                  })}
                >已结束</div>
              </Link>
            </li>
          </ul><div className="line1px" style={{ width: '100%' }} />
        </div>
        <div className="page-projects-content-main">
          {page}
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
