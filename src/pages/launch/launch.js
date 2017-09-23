/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Link from '../../components/link/link';
import './launch.css';
import HomePage from '../home/home';
import SigninPage from '../signin/signin';
import MyPage from '../my/my';

const TAB_URL_MAPS = {
  '/': <HomePage />,
  '/signin': <SigninPage />,
  '/my': <MyPage />,
};

class LaunchPage extends React.Component {

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

  componentWillUnmount() {

  }

  getTabName(props) {
    return TAB_URL_MAPS[(props || this.props).route.path];
  }

  render() {
    const { page } = this.state;

    return (
      <div className="launch-page">
        <div className="launch-page-content">
          {page}
        </div>
        <ul className="launch-page-tabs">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/signin">签到打卡</Link></li>
          <li><Link to="/my">个人中心</Link></li>
        </ul>
      </div>
    );
  }
}

LaunchPage.title = '智多星';

LaunchPage.propTypes = {
};

export default LaunchPage;
