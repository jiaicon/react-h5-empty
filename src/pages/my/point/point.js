/**
 * @file 我的星币明细
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
import { } from '../my.store';
import './point.css';

import Link from '../../../components/link/link';
import IMAGE from '../../../components/image/image';
import PayPage from './point_pay';
import IncomePage from './point_income';

const TAB_URL_MAPS = {
  '/my/point': <IncomePage />,
  '/my/point/pay': <PayPage />,
};

class PointPage extends React.Component {

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
      <div className="page-ponit">
        <div className="page-ponit-pic-container">
          <IMAGE className="page-ponit-pic" src="http://pic.sc.chinaz.com/files/pic/pic9/201712/zzpic8996.jpg" />
          <div className="page-ponit-pic-title">
            <span>我的星币明细(个)</span>
            <span>0000</span>
          </div>
        </div>
        <ul className="page-ponit-tab-container">
          <li className="page-ponit-tab-container-li">
            <Link to="/my/point">
              <div
                className={classnames({
                  'page-ponit-tab-container-li-current': true,
                  active: path === '/my/point',
                })}
              >星币获取</div>
            </Link>
          </li>
          <li><div className="line1px-v page-ponit-tab-container-line-v" /></li>
          <li className="page-ponit-tab-container-li">
            <Link to="/my/point/pay">
              <div
                className={classnames({
                  'page-ponit-tab-container-li-current': true,
                  active: path === '/my/point/pay',
                })}
              >星币支出</div>
            </Link>
          </li>
        </ul>
        <div className="page-ponit-content">
          {page}
        </div>


      </div>
    );
  }
}


PointPage.title = '我的星币明细';
PointPage.propTypes = {
};

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({ }, dispatch),
)(PointPage);
