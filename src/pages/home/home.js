import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import './home.css';
import Link from '../../components/link/link';
import Image from '../../components/image/image';
import Avatar from '../../components/avatar/avatar';
import Projects from '../../components/projects/projects';
import Menus from '../../components/menus/menus';
import { getCity } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from './home.store';

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
    if (localStorage.getItem('provinceAndCityName') != null) {
      this.setState({
        ...this.state,
        city: JSON.parse(localStorage.getItem('provinceAndCityName')).city.replace('市', ''),
      });
      this.props.requestHomeData();
      this.props.saveCity(JSON.parse(localStorage.getItem('provinceAndCityName')).city.replace('市', ''));
      this.props.getAreaCity(JSON.parse(localStorage.getItem('provinceAndCityName')).city.replace('市', ''));
    } else {
      getCity((city) => {
        this.setState({
          ...this.state,
          city,
        });
        this.props.requestHomeData();
        this.props.saveCity(city);
        this.props.getAreaCity(city);
      }, () => {
        Alert.error('定位失败，请确认同意微信定位授权');
        this.state = {
          city: '未定位',
        };
        this.props.requestHomeData();
      });
    }


    // 地理位置重新获取后需要刷新首页数据
    // EM.on('location', () => this.props.requestHomeData());
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  renderHeaderBar() {
    const { user } = this.props;

    return (<div className="header-bar">
      <Link to="/selectcity"><div className="city-name">{this.state.city}</div></Link>
      <Link className="component-search-bar" to="/homesearch">
        <input className="input" placeholder="搜索项目/团队sdfsdf" />
      </Link>
      {
        !user.isLogin ? <Link className="login-button" to="/my/entry">登录</Link>
        :
        <Link to="/my"><Avatar src={user.avatars} size={{ width: 28 }} /></Link>
      }
    </div>);
  }

  renderSlick() {
    const { home, user } = this.props;
    const orgCode = window.orgCode;
    if (!home.data || !home.data.banner) {
      return <div className="slick-container slick-container-empty" />;
    }
    if (!user.isLogin && orgCode == 'wMvbmOeYAl') {
      return (<div className="slick-container">
        { home.data.banner && home.data.banner.length ?
          <Slick {...this.slickSettings}>
            {home.data.banner
              .map((item) => {
                let url = '';
                const mode = item.jump_mode;

                if (mode === 1) {
                  url = '/my/entry';

                  // 第三方
                } else if (mode === 2) {
                  // 项目
                  url = `/project/detail/${item.jump_id}`;
                } else if (mode === 3) {
                  // 团队
                  url = `/team/detail/${item.jump_id}`;
                }

                return (<Link key={item.id} to={url}>
                  <Image src={item.photo} className="image" resize={{ width: 1500 }} />
                </Link>);
              })}
          </Slick> : null
      }
      </div>);
    }

    return (<div className="slick-container">
      { home.data.banner && home.data.banner.length ?
        <Slick {...this.slickSettings}>
          {home.data.banner
              .map((item) => {
                let url = '';
                const mode = item.jump_mode;

                if (mode === 1) {
                  if (!user.isLogin) {
                    url = '/my/entry';
                  }
                  // 第三方
                  url = item.href;
                } else if (mode === 2) {
                  // 项目
                  url = `/project/detail/${item.jump_id}`;
                } else if (mode === 3) {
                  // 团队
                  url = `/team/detail/${item.jump_id}`;
                }

                return (<Link key={item.id} to={url}>
                  <Image src={item.photo} className="image" resize={{ width: 1500 }} />
                </Link>);
              })}
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
          {
            !home.data
            ?
            null
            :
            <div>
              {
              home.data && home.data.sanlitun ? <div>
                <div style={{ width: '100%', height: '10px' }} />
                <div className="project-list">
                  <div className="list-header">
                    <div className="main-label">
                      <div className="label-line" />
                      <span>回馈激励</span>
                      <div className="label-line" />
                    </div>
                    <div className="sub-label">Feedback incentive</div>
                  </div>
                </div>
                <div className="page-home-feedback-show-container">
                  <Link to={`http://${location.host}/tmall`}>
                    <img src="/images/sanlitun/feedback1.jpg" alt="回馈展示" />
                  </Link>
                  <Link to={`http://${location.host}/tmall`}>
                    <img src="/images/sanlitun/feedback2.jpg" alt="回馈展示" />
                  </Link>
                  <Link to={`http://${location.host}/tmall`}>
                    <img src="/images/sanlitun/feedback4.png" alt="回馈展示" />
                  </Link>
                </div>
                <div style={{ width: '100%', height: '10px' }} />
              </div> : null
            }
              {
            home.data && home.data.sanlitun ?
              null
            :
              <div className="menus-activity">
                <Link to="/project/list/type/1/category/1000/target/1000">
                  <img src="/images/activities_nearby.png" alt="附近" />
                </Link>
                <Link to="/project/list/type/0/category/1000/target/1000">
                  <img src="/images/activities_new.png" alt="最新" />
                </Link>
                <Link to="/project/list/type/2/category/1000/target/1000">
                  <img src="/images/activities_hot.png" alt="最热" />
                </Link>
              </div>
            }
              <div className="project-list">
                <div className="list-header">
                  <div className="main-label">
                    <div className="label-line" />
                    <span>{home.data && home.data.sanlitun ? '联盟活动' : '精品活动'}</span>
                    <div className="label-line" />
                  </div>
                  <div className="sub-label">Awesome Activity</div>
                </div>
                <div className="line1px" />
                <Projects projects={(home.data && home.data.project) || []} />
              </div>
            </div>

          }

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
      sanlitun: PropTypes.number,
    }),
    city: PropTypes.string,
  }),
  user: PropTypes.shape({}),
};

export default connect(
  state => ({   //store根节点
    home: state.home.home,
    user: state.user,
    area: state.home.getAreaCity,
  }),    //
  dispatch => bindActionCreators({ requestHomeData, saveCity, getAreaCity }, dispatch),
)(HomePage);
