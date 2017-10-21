/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../components/share';
import './home.css';
import Link from '../../components/link/link';
import Image from '../../components/image/image';
import Avatar from '../../components/avatar/avatar';
import Projects from '../../components/projects/projects';
import Menus from '../../components/menus/menus';
import { getCity } from '../../utils/funcs';
import { requestHomeData, saveCity } from './home.store';

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

    this.state = {
      city: props.home.city || '定位中',
    };
  }

  componentWillMount() {
    const { home } = this.props;

    // if (!home.data) {
    // this.props.requestHomeData();
    // }
    // getLocation(loc=>{}, error=>);

    if (home.data) {
      return;
    }

    getCity((city) => {
      this.setState({
        ...this.state,
        city,
      });
      this.props.requestHomeData();
      this.props.saveCity(city);
    }, () => {
      Alert.error('定位失败，请确认同意微信定位授权');
      this.state = {
        city: '未定位',
      };
      this.props.requestHomeData();
    });

    // 地理位置重新获取后需要刷新首页数据
    // EM.on('location', () => this.props.requestHomeData());
  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  renderHeaderBar() {
    const { user } = this.props;

    return (<div className="header-bar">
      <div className="city-name">{this.state.city}</div>
      <Link className="component-search-bar" to="/project/search">
        <input className="input" placeholder="搜索项目" />
      </Link>
      {
        !user.isLogin ? <Link className="login-button" to="/my/entry">登录</Link> : null
      }
      { user.avatars ?
        <Link to="/my"><Avatar src={user.avatars} size={{ width: 28 }} /></Link>
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
                  <Image src={item.photo} resize={{ width: 1500 }} />
                </Link>
              ))}
        </Slick> : null
      }
    </div>);
  }

  render() {
    const { home } = this.props;

    return (
      <div className="page-home">
        <div className="page-home-header">
          {this.renderHeaderBar()}
          {this.renderSlick()}
        </div>
        <div className="page-home-body">
          {window.orgInfo ?
            <Menus menus={window.orgInfo.module_settings} /> : null}
          <div className="menus-activity">
            <Link to="/project/list/type/1/category/1000/target/1000">
              <img src="/images/activities_nearby.png" alt="附近" />
            </Link>
            <Link to="/project/list/type/0/category/1000/target/1000">
              <img src="/images/activities_new.png" alt="最新" />
            </Link>
            <Link to="/project/list/recommend">
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
  saveCity: PropTypes.func,
  home: PropTypes.shape({
    data: PropTypes.shape({
      banner: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        photo: PropTypes.string,
        jump_mode: PropTypes.number,
        jump_id: PropTypes.number,
      })),
      project: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    city: PropTypes.string,
  }),
  user: PropTypes.shape({}),
};

export default connect(
  state => ({
    home: state.home,
    user: state.user,
  }),
  dispatch => bindActionCreators({ requestHomeData, saveCity }, dispatch),
)(HomePage);
