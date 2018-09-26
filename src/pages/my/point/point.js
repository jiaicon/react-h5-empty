/**
 * @file 我的{scoreName || '星币'}明细
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import history from '../../history';
import { userCenterAction } from '../my.store';
import './point.css';

import Link from '../../../components/link/link';
import IMAGE from '../../../components/image/image';
import PayPage from './point_pay';
import IncomePage from './point_income';

const TAB_URL_MAPS = {
  '/my/point': <IncomePage />,
  '/my/point/pay': <PayPage />,
};
const scoreName =window.orgInfo.score_name;
class PointPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      page: this.getTabName(this.props),
    };
  }

  componentWillMount() {
    this.props.userCenterAction();
  }

  componentDidMount() {
    document.title = `我的${scoreName || '星币'}明细`;
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
      <div className="page-ponit">
        <div className="page-ponit-pic-container">
          <div className="page-ponit-pic-title">
            <span>我的{scoreName || '星币'}明细(个)</span>
            <span>{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.user.score}</span>
          </div>
        </div>
        <div className="page-ponit-tab-container">
          <div className="page-ponit-tab-container-li">
            <Link to="/my/point">
              <div
                className={classnames({
                  'page-ponit-tab-container-li-current': true,
                  active: path === '/my/point',
                })}
              >{scoreName || '星币'}获取</div>
            </Link>
          </div>
          <div><div className="line1px-v page-ponit-tab-container-line-v" /></div>
          <div className="page-ponit-tab-container-li">
            <Link to="/my/point/pay">
              <div
                className={classnames({
                  'page-ponit-tab-container-li-current': true,
                  active: path === '/my/point/pay',
                })}
              >{scoreName || '星币'}支出</div>
            </Link>
          </div>
        </div>
        <div className="page-ponit-content">
          {page}
        </div>


      </div>
    );
  }
}


PointPage.propTypes = {
  usercenter: PropTypes.shape({
    data: PropTypes.shape({
      msg_count: PropTypes.number,
      project_count: PropTypes.number,
      team_count: PropTypes.number,
      user: PropTypes.shape({
        addr: PropTypes.string,
        avatars: PropTypes.string,
        birthday: PropTypes.string,
        province_id: PropTypes.number,
        province_name: PropTypes.string,
        city_id: PropTypes.number,
        city_name: PropTypes.string,
        county_id: PropTypes.number,
        county_name: PropTypes.string,
        token: PropTypes.string,
        good_at: PropTypes.arrayOf(PropTypes.shape({

        })),
        family_id: PropTypes.number,
        id: PropTypes.number,
        id_number: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        identifier: PropTypes.string,
        join_family_time: PropTypes.string,
        nation: PropTypes.string,
        phone: PropTypes.string,
        real_name: PropTypes.string,
        reward_time: PropTypes.string,
        sex: PropTypes.number,
        slogan: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  }),
};

export default connect(
  state => ({
    usercenter: state.my.usercenter,
  }),
  dispatch => bindActionCreators({ userCenterAction }, dispatch),
)(PointPage);
