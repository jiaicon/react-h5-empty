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
import { requestHomeData } from './home.store';

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
    const { home } = this.props;

    if (!home.data) {
      this.props.requestHomeData();
    }
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
      <div className="city-name">北京市</div>
      <Link className="search-bar" to="/">
        <span className="input">搜索项目</span>
      </Link>
      {
        !user.isLogin ? <Link className="login-button" to="/my/login">登录</Link> : null
      }
      { user.avatars ?
        <img className="avatar" src={user.avatars} alt="头像" />
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
      <Slick {...this.slickSettings}>
        {home.data.banner
              .map(item => (
                <Link key={item.id} to="/">
                  <img src={item.photo} alt={item.title} />
                </Link>
              ))}
      </Slick>
    </div>);
  }

  render() {
    return (
      <div className="page-home">
        <div className="header">
          {this.renderHeaderBar()}
          {this.renderSlick()}
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
      project: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  user: PropTypes.shape({}),
};

HomePage.title = '首页';

export default connect(
  state => ({
    home: state.home,
    user: state.user,
  }),
  dispatch => bindActionCreators({ requestHomeData }, dispatch),
)(HomePage);
