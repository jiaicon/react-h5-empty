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
import classnames from 'classnames';
import './collects.css';
import { collectAction } from '../my.store';
import TeamPage from './collects_team';
import ProjectPage from './collects_project';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import Link from '../../../components/link/link';

const TAB_URL_MAPS = {
  '/my/collects/': <TeamPage />,
  '/my/collects/project': <ProjectPage />,
};


class Collects extends React.Component {

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
    const { t } = this.props;
    return (
      <div className="page-collects-tab-container">
        <div style={{ width: '100%', height: '50px' }}>
          <ul className="page-collects-tab-ul-container">
            <li>
              <Link to="/my/collects/">
                <div
                  className={classnames({
                    'page-collects-tab-ul-container-li-current': true,
                    active: path === '/my/collects/',
                  })}
                >{t('团队')}</div>
              </Link>
            </li>
            <li>
              <Link to="/my/collects/project">
                <div
                  className={classnames({
                    'page-collects-tab-ul-container-li-current': true,
                    active: path === '/my/collects/project',
                  })}
                >{t('项目')}</div>
              </Link>
            </li>
          </ul>
          <div className="line1px" style={{ width: '100%' }} />
        </div>
        <div className="page-collects-tab-content">
          {page}
        </div>
      </div>
    );
  }
}
Collects.title = i18next.t('我的收藏');

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
  route: PropTypes.shape({
    path: PropTypes.string,
  }),
};

export default connect(
  state => ({
    collect: state.my.collect,
  }),
  dispatch => bindActionCreators({ collectAction }, dispatch),
)(translate('translations')(Collects));
