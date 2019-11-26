import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Alert from "react-s-alert";
import "./home.css";
import Link from "../../components/link/link";
import Image from "../../components/image/image";
import Avatar from "../../components/avatar/avatar";
import Projects from "../../components/projects/projects";
import Menus from "../../components/menus/menus";
import Announcement from "../../components/announcement/announcement";
import {
  getCity,
  deleteSanlitunMoudling,
  getCookie,
  setCookie
} from "../../utils/funcs";
import { requestHomeData, saveCity, getAreaCity } from "./home.store";

import { Dialog } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      newcity: null,
      city: getCookie("provinceAndCityName")
        ? JSON.parse(getCookie("provinceAndCityName")).city.replace("市", "")
        : "全国",
      showDialog: false
    };
    this.play = this.play.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.slickSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000
    };
    this.dialog = {
      title: "询问",
      buttons: [
        {
          type: "default",
          label: "取消",
          onClick: () => {
            this.props.requestHomeData();
            this.setState({ ...this.state, showDialog: false });
          }
        },
        {
          type: "primary",
          label: "确认",
          onClick: () => {
            this.setState({ ...this.state, showDialog: false });
            const { newcity, pc, city } = this.state;
            this.props.requestHomeData();
            this.props.saveCity(newcity);
            setCookie("provinceAndCityName", pc, 1);
            this.setState({
              city: newcity
            });
          }
        }
      ]
    };
  }

  componentWillMount() {
    // TODO:
    this.props.requestHomeData();
    if (!getCookie("provinceAndCityName")) {
      getCity(
        (city, str) => {
          const { city: initaialCity } = this.state;

          if (initaialCity == city.replace("市", "")) {
            this.props.requestHomeData();
            return;
          } else {
            this.setState({
              ...this.state,
              showDialog: true,
              newcity: city,
              pc: str
            });
          }
        },
        () => {
          Alert.error("定位失败，请确认同意定位授权");
        }
      );
    }
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}
  componentDidMount() {}
  renderHeaderBar() {
    const { user } = this.props;
    const switchView = user.isLogin;
    //点击登录跳转判断
    let target = '/my/entry';
    if(window.orgCode === 'oBDbDkxal2') {
        target='/my/login';
    }
    return (
      <div className="header-bar">
        <Link to="/selectcity">
          <div className="city-name">{this.state.city}</div>
        </Link>

        {switchView ? (
          <div style={{ display: "flex", flex: "1" }}>
            <div className="content-boxpadding">
              <Link className="component-search-bar dirmargin" to="/homesearch">
                <input
                  className="input"
                  style={{ marginLeft: "35px" }}
                  placeholder="搜索项目/团队"
                  disabled="disabled"
                />
              </Link>
            </div>
            <Link to="/my">
              <Avatar src={user.avatars} size={{ width: 28 }} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", width: "280px" }}>
            <Link className="component-search-newbar" to="/homesearch">
              <input
                className="input"
                style={{ marginLeft: "35px" }}
                placeholder="搜索项目/团队"
                disabled="disabled"
              />
            </Link>
            <Link
                to={target}
              >
              <div className="login-button">登录</div>
            </Link>
          </div>
        )}
      </div>
    );
  }

  play() {
    this.slider.slickPlay();
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }
  renderAnnounceComponent() {
    const { home, user } = this.props;
    if (!home.data || home.data.news.length == 0) {
      return null;
    }
    return (
      <div className="notice">
        {home.data.news.length > 0 ? (
          <Announcement data={home.data.news} entry="/announce" />
        ) : null}
      </div>
    );
  }
  renderSlick() {
    const { home, user } = this.props;
    const orgCode = window.orgCode;
    if (!home.data || !home.data.banner || home.data.banner.length == 0) {
      return <div className="slick-container slick-container-empty" />;
    }

    if (!user.isLogin && orgCode == "wMvbmOeYAl") {
      return (
        <div className="slick-container">
          {home.data.banner && home.data.banner.length ? (
            <Slick {...this.slickSettings}>
              {home.data.banner.map(item => {
                let url = "";
                const mode = item.jump_mode;

                if (mode === 1) {
                  url = "/my/entry";

                  // 第三方
                } else if (mode === 2) {
                  // 项目
                  url = `/project/detail/${item.jump_id}`;
                } else if (mode === 3) {
                  // 团队
                  url = `/team/detail/${item.jump_id}`;
                }

                return (
                  <Link key={item.id} to={url}>
                    <Image
                      src={item.photo}
                      className="image"
                      resize={{ width: 1500 }}
                    />
                  </Link>
                );
              })}
            </Slick>
          ) : null}
        </div>
      );
    } else if (!user.isLogin && orgCode == "KGRb41dBLZ") {
      return (
        <div className="slick-container">
          {home.data.banner && home.data.banner.length ? (
            <Slick {...this.slickSettings}>
              {home.data.banner.map(item => {
                let url = "";
                const mode = item.jump_mode;

                if (mode === 1) {
                  if (!user.isLogin) {
                    url = "/my/entry";
                  } else {
                    // 第三方
                    url = item.href;
                  }
                } else if (mode === 2) {
                  // 项目
                  url = `/project/detail/${item.jump_id}`;
                } else if (mode === 3) {
                  // 团队
                  url = `/team/detail/${item.jump_id}`;
                }

                return (
                  <Link key={item.id} to={url}>
                    <Image
                      src={item.photo}
                      className="image"
                      resize={{ width: 1500 }}
                    />
                  </Link>
                );
              })}
            </Slick>
          ) : null}
        </div>
      );
    }
    return (
      <div className="slick-container">
        {home.data.banner && home.data.banner.length ?
          <Slick {...this.slickSettings}>
            {home.data.banner.map(item => {
              let url = "";
              const mode = item.jump_mode;

              if (mode === 1) {
                // if (!user.isLogin) {
                //   url = '/my/entry';
                // }else{
                // 第三方
                url = item.href;
              } else if (mode === 2) {
                // 项目
                url = `/project/detail/${item.jump_id}`;
              } else if (mode === 3) {
                // 团队
                url = `/team/detail/${item.jump_id}`;
              }

              return (
                <Link key={item.id} to={url}>
                  <Image
                    src={item.photo}
                    className="image"
                    resize={{ width: 1500 }}
                  />
                </Link>
              );
            })}
          </Slick>
         : null}
      </div>
    );
  }

  render() {
    const { home } = this.props;
    if (!home.data) {
      return null;
    }

    let activities_nearby_image = "/images/activities_nearby.png";
    let activities_new_image = "/images/activities_new.png";
    let activities_hot_image = "/images/activities_hot.png";

    if (window.orgCode === 'oBDbDkxal2') {
      activities_nearby_image = "/images/activities_nearby_Starbucks.png";
      activities_new_image = "/images/activities_new_Starbucks.png";
      activities_hot_image = "/images/activities_hot_Starbucks.png";
    }

    return (
      <div className="page-home">
        <div className="page-home-header">
          {this.renderHeaderBar()}
          {this.renderSlick()}
          {this.renderAnnounceComponent()}
        </div>
        <Dialog
          type="ios"
          title={this.dialog.title}
          buttons={this.dialog.buttons}
          show={this.state.showDialog}
        >
          已经成功定位到当前定位城市
          {this.state.newcity ? this.state.newcity : null},是否切换？
        </Dialog>
        <div className="page-home-body">
          {window.orgInfo && window.orgCode == "VolejRejNm" ? (
            <Menus
              menus={deleteSanlitunMoudling(window.orgInfo.module_settings)}
            />
          ) : (
            <Menus menus={window.orgInfo.module_settings} />
          )}
          {!home.data ? null : (
            <div>
              {home.data && home.data.sanlitun ? (
                <div>
                  <div style={{ width: "100%", height: "10px" }} />
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
                    {/* <Link to={`http://${location.host}/tmall`}> */}
                    <Link to="/shop">
                      <img
                        src="/images/sanlitun/feedback1.jpg"
                        alt="回馈展示"
                      />
                    </Link>
                    {/* <Link to={`http://${location.host}/tmall`}> */}
                    <Link to="/shop">
                      <img
                        src="/images/sanlitun/feedback2.jpg"
                        alt="回馈展示"
                      />
                    </Link>
                    {/* <Link to={`http://${location.host}/tmall`}> */}
                    <Link to="/shop">
                      <img
                        src="/images/sanlitun/feedback4.png"
                        alt="回馈展示"
                      />
                    </Link>
                  </div>
                  <div style={{ width: "100%", height: "10px" }} />
                </div>
              ) : null}
              {home.data && home.data.sanlitun && (window.orgCode === "mxkazpYdJ0" || window.orgCode === "7N1aM8AeWm") ? null : (
                <div className="menus-activity">
                  <Link to="/project/list/type/1/category/1000/target/1000">
                    <img src={activities_nearby_image} alt="附近" />
                  </Link>
                  <Link to="/project/list/type/0/category/1000/target/1000">
                    <img src={activities_new_image} alt="最新" />
                  </Link>
                  <Link to="/project/list/type/2/category/1000/target/1000">
                    <img src={activities_hot_image} alt="最热" />
                  </Link>
                </div>
              )}
              <div className="project-list">
                <div className="list-header">
                  <div className="main-label">
                    <div className="label-line" />
                    <span>
                      {home.data && home.data.sanlitun
                        ? "联盟活动"
                        : "精品活动"}
                    </span>
                    <div className="label-line" />
                  </div>
                  <div className="sub-label">Awesome Activity</div>
                </div>
                <div className="line1px" />
                <Projects projects={(home.data && home.data.project) || []} />
              </div>
            </div>
          )}
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
      banner: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          photo: PropTypes.string,
          jump_mode: PropTypes.number,
          jump_id: PropTypes.number
        })
      ),
      project: PropTypes.arrayOf(PropTypes.shape({})),
      sanlitun: PropTypes.number
    }),
    city: PropTypes.string
  }),
  user: PropTypes.shape({})
};

export default connect(
  state => ({
    //store根节点
    home: state.home.home,
    user: state.user,
    area: state.home.getAreaCity
  }), //
  dispatch =>
    bindActionCreators({ requestHomeData, saveCity, getAreaCity }, dispatch)
)(HomePage);
