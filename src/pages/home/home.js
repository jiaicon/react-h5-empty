/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WXShare from '../../components/share';
import './home.css';
import Link from '../../components/link/link';
import Image from '../../components/image/image';
import Projects from '../../components/projects/projects';
import { requestHomeData } from './home.store';

const MODULE_LINK = {
  volunteer_project: '/project/list',
  volunteer_team: '/team/list',
  reward_history: '/',
  help_center: '/',
  volunteer_ensure: '/building',
  volunteer_feedback: '/building',
  volunteer_strategy: '/building',
  community_interact: '/building',
};

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.slickSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
    };
  }

  componentWillMount() {
    // const { home } = this.props;

    // if (!home.data) {
    this.props.requestHomeData();
    // }
  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.home && nextProps.home.data) {
      document.title = nextProps.home.data.org.name;
    }
  }

  componentWillUnmount() {}

  renderHeaderBar() {
    const { user } = this.props;

    return (<div className="header-bar">
      <div className="city-name">北京市</div>
      <Link className="component-search-bar" to="/project/search">
        <input className="input" placeholder="搜索项目" />
      </Link>
      {
        !user.isLogin ? <Link className="login-button" to="/my/entry">登录</Link> : null
      }
      { user.avatars ?
        <Image className="avatar" src={user.avatars} alt="头像" />
        :
        null
      }
    </div>);
  }

  renderSlick() {
    const { home } = this.props;
    if (!home.data || !home.data.banner) {
      return <div className="slick-container" />;
    }

    return (<div className="slick-container">
      { home.data.banner && home.data.banner.length ?
        <Slick {...this.slickSettings}>
          {home.data.banner
              .map(item => (
                <Link key={item.id} to="/">
                  <img src={item.photo} alt={item.title} />
                </Link>
              ))}
        </Slick> : null
      }
    </div>);
  }

  render

  render() {
    const { home } = this.props;

    return (
      <div className="page-home">
        <div className="page-home-header">
          {this.renderHeaderBar()}
          {this.renderSlick()}
        </div>
        <div className="page-home-body">
          <div className="menus">
            <Link to="/project/list">
              <div className="menu-icon menu-icon-project" />
              <span>志愿项目</span>
            </Link>
            <Link to="/team/list">
              <div className="menu-icon menu-icon-team" />
              <span>志愿团队</span>
            </Link>
            <Link to="/my/duration/applys">
              <div className="menu-icon menu-icon-record" />
              <span>时长记录</span>
            </Link>
            <Link to="/my/service">
              <div className="menu-icon menu-icon-service" />
              <span>服务中心</span>
            </Link>
          </div>
          <div className="menus-activity">
            <Link to="/project/list?types=distance">
              <img src="/images/activities_nearby.png" alt="附近" />
            </Link>
            <Link to="/project/list?types=time">
              <img src="/images/activities_new.png" alt="最新" />
            </Link>
            <Link to="/project/list?recommend=1">
              <img src="/images/activities_hot.png" alt="最热" />
            </Link>
          </div>
          <div className="project-list">
            <div className="list-header">
              <div className="main-label">
                <div className="label-line" />
                <span>精品活动</span>
                <div className="label-line" />
              </div>
              <div className="sub-label">Awesome Activity</div>
            </div>
            <div className="line1px" />
            <Projects projects={(home.data && home.data.project) || []} />
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  requestHomeData: PropTypes.func,
  home: PropTypes.shape({
    data: PropTypes.shape({
      banner: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        photo: PropTypes.string,
        jump_mode: PropTypes.number,
        jump_id: PropTypes.number,
      })),
      org: PropTypes.shape({
        name: PropTypes.string,
        module_settings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
      }),
      project: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  user: PropTypes.shape({}),
};

export default connect(
  state => ({
    home: state.home,
    user: state.user,
  }),
  dispatch => bindActionCreators({ requestHomeData }, dispatch),
)(HomePage);
