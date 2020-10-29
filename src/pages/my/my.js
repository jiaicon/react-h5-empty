/**
 * @file 个人中心入口页面
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { translate } from 'react-i18next';
import i18next from 'i18next';
import { userCenterAction, userAchieve } from "./my.store";
import { logoutAction } from './login/login.store';
import { requestUserInfo } from "../../stores/common";
import Link from "../../components/link/link";
import Star from "../../components/star/star";
import Avatar from "../../components/avatar/avatar";
import ModalNew from "./../../components/ModalNew/ModalNew";
import { Dialog, Gallery, GalleryDelete, Button, Icon } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
import "./my.css";

// 机构码
const orgCode = window.orgCode;
const scoreName = window.orgInfo.st_point_uint&&window.orgInfo.st_point_uint[1];

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      showMultiple: false,
      previewData: [],
      visible: false,
      visibleInstruction: false
    };
  }

  componentWillMount() {
    // this.props.requestUserInfo();
    // this.props.userCenterAction();
  }

  componentDidMount() {
    this.props.requestUserInfo();
    this.props.userCenterAction();
    this.props.userAchieve();
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {
    this.setState({
      visible: false,
      visibleInstruction: false
    });
  }

  renderPageMymessagesTemplate() {
    return (
      <div className="page-my-header-messages-container">
        {this.props.usercenter.data === null ? (
          <span />
        ) : (
          <span
            className={classnames({
              "page-my-header-messages-red-point":
                this.props.usercenter.data.msg_count >= 1
            })}
          />
        )}
      </div>
    );
  }
  onPreview(e) {
    var key = e.target.getAttribute("data-key");
    var arr = [];
    if (!key) {
      key = "/images/my/register.png";
    }
    arr.push(key);
    this.setState({
      previewData: arr,
      showMultiple: true,
      defaultIndex: 0
    });
  }
  renderPageMyphotoTemplate() {
    const { user, t } = this.props;
    return (
      <div className="page-my-photo-container">
        <Avatar
          src={user.avatars ? user.avatars : ""}
          data-key={user.avatars || ""}
          size={{ width: 80, radius: 8 }}
          defaultSrc="/images/my/register.png"
          onClick={this.onPreview}
        />
        <div className="page-my-user-info">
          <p className="page-my-user-info-nick">
            {user.real_name || user.username || t("未设置昵称")}
          </p>
          <p className="page-my-user-info-signature">
            {t(user.slogan) || t("未设置口号")}
          </p>
          <div className="page-my-user-info-star">
            {user.stars ? (
              <Star
                size={{ width: 15, height: 14, score: user.stars }}
                isBlockEmptyStar
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  renderPageMyRecordTemplate() {
    const { t } = this.props;
    return (
      <div className="page-my-record-container">
        <Link to="/my/teams">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top">
              <b className="page-my-record-item-num">
                {this.props.usercenter.data == null
                  ? 0
                  : this.props.usercenter.data.team_count}
              </b>
              个
            </p>
            <p className="page-my-record-item-bottom">{t('我的团队')}</p>
          </div>
        </Link>

        <Link to="/my/projects">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top">
              <b className="page-my-record-item-num">
                {this.props.usercenter.data == null
                  ? 0
                  : this.props.usercenter.data.project_count}
              </b>
              个
            </p>
            <p className="page-my-record-item-bottom">{t('我的项目')}</p>
          </div>
        </Link>
        <Link to="/my/duration">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top">
              <b className="page-my-record-item-num">
                {this.props.usercenter.data == null
                  ? 0
                  : this.props.usercenter.data.user.reward_time}
              </b>
              {t('小时')}
            </p>
            <p className="page-my-record-item-bottom">{t('服务时长(center)')}</p>
          </div>
        </Link>
        {/* <!-- 积分入口 --> */}
        {window.orgInfo.volunteer_feedback === 0 ? null : (
          <Link to="/my/point">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top">
                <b className="page-my-record-item-num">
                  {this.props.usercenter.data == null
                    ? 0
                    : this.props.usercenter.data.user.score}
                </b>{" "}
                {scoreName || t('星币(center)')}
              </p>
              <p className="page-my-record-item-bottom">
                {window.orgInfo.st_point_uint&&window.orgInfo.st_point_uint[0] || t('志愿')}
                {scoreName || t('星币(center)')}
              </p>
            </div>
          </Link>
        )}
      </div>
    );
  }
  renderPageMyTop() {
    const { user } = this.props;
    return (
      <div>
        <div>{this.renderPageMyphotoTemplate()}</div>
        {this.renderPageMyRecordTemplate()}
      </div>
    );
  }

  onPreview(e) {
    var key = e.target.getAttribute("data-key");
    var arr = [];
    if (!key) {
      key = "/images/my/register.png";
    }
    arr.push(key);
    this.setState({
      previewData: arr,
      showMultiple: true,
      defaultIndex: 0
    });
  }

  showCommonweal() {
    this.setState({
      visible: true,
      visibleInstruction: false
    });
  }

  renderPageMyphotoTemplate() {
    let { userAchieveList, user, t } = this.props;
    let label = "";
    let query = "";
    if (
      userAchieveList &&
      userAchieveList.data &&
      userAchieveList.data.data &&
      userAchieveList.data.data.growth_level &&
      userAchieveList.data.data.growth_level.length &&
      user
    ) {
      // 过滤一下，没有name的过滤掉，有的不需要6级，但都下发了。
      let userAchieveListLocal = [];
      userAchieveList.data.data.growth_level.forEach(item => {
        if (item.name) {
          userAchieveListLocal.push(item);
        }
      });
      if (user.growth < userAchieveListLocal[0].growth) {
        label = "等级0";
          query = userAchieveListLocal[0].name;
      } else if (
        user.growth >=
        userAchieveListLocal[userAchieveListLocal.length - 1].growth
      ) {
        label = `等级${userAchieveListLocal.length - 1}`;
          query = userAchieveListLocal[userAchieveListLocal.length - 1].name;
      } else {
        for (let i = 0; i < userAchieveListLocal.length; i++) {
          if (user.growth >= userAchieveListLocal[i].growth) {
            label = `等级${i + 1}`;
              query = userAchieveListLocal[i+1].name;
          }
        }
      }
    }
    return (
      <div className="page-my-photo-container">
        <Avatar
          src={user.avatars ? user.avatars : ""}
          data-key={user.avatars || ""}
          size={{ width: 80, radius: 8 }}
          defaultSrc="/images/my/register.png"
          onClick={this.onPreview}
        />
        <div className="page-my-user-info">
          <p className="page-my-user-info-nick">
            <p style={{ display: "flex", alignItems: "center" }}>
              {user.real_name || user.username || "未设置昵称"}
              {window.orgInfo.st_rank_op == 1 ? (
                <p
                  onClick={this.showCommonweal}
                  className="page-my-user-info-nick-commonweal"
                >
                  {label || "暂无等级"}
                </p>
              ) : (
                <span />
              )}
            </p>

            {window.orgInfo.st_achieve_op == 1 ? (
              <div className="page-my-user-info-nick-commonweal-medal">
                <Link
                  to={`/my/achievemet/${this.props.usercenter &&
                    this.props.usercenter.data &&
                    this.props.usercenter.data.project_count}?querys=${encodeURIComponent(query)}`}
                >
                  <img src="/images/my/commonweal-medal.png" alt="" />
                  <span className="page-my-user-info-nick-commonweal-medal-word">
                    {user && user.achievement}枚
                  </span>
                </Link>
              </div>
            ) : (
              <span />
            )}
          </p>
          <p className="page-my-user-info-signature">
            {t(user.slogan) || t("未设置口号")}
          </p>
          <div className="page-my-user-info-star">
            {user.stars ? (
              <Star
                size={{ width: 15, height: 14, score: user.stars }}
                isBlockEmptyStar
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  renderPageMyRecordTemplate() {
    const { user, t } = this.props;
    return (
      <div className="page-my-record-container">
        <Link to="/my/teams">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top">
              <b className="page-my-record-item-num">
                {this.props.usercenter.data == null
                  ? 0
                  : this.props.usercenter.data.team_count}
              </b>
              {t('个')}
            </p>
            <p className="page-my-record-item-bottom">{t('我的团队')}</p>
          </div>
        </Link>

        <Link to="/my/projects">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top">
              <b className="page-my-record-item-num">
                {this.props.usercenter.data == null
                  ? 0
                  : this.props.usercenter.data.project_count}
              </b>
              {t('个')}
            </p>
            <p className="page-my-record-item-bottom">{t('我的项目')}</p>
          </div>
        </Link>
        <Link to="/my/duration">
          <div className="page-my-record-item">
            <p className="page-my-record-item-top">
              <b className="page-my-record-item-num">
                {this.props.usercenter.data == null
                  ? 0
                  : this.props.usercenter.data.user.reward_time}
              </b>
              {t('小时')}
            </p>
            <p className="page-my-record-item-bottom">{t('服务时长')}</p>
          </div>
        </Link>
        {/* <!-- 积分入口 --> */}
        {window.orgInfo.volunteer_feedback === 0 ? null : (
          <Link to="/my/point">
            <div className="page-my-record-item">
              <p className="page-my-record-item-top">
                <b className="page-my-record-item-num">
                  {this.props.usercenter.data == null
                    ? 0
                    : this.props.usercenter.data.user.score}
                </b>{" "}
                {t(scoreName) || t('星币')}
              </p>
              <p className="page-my-record-item-bottom">
                {t('n志愿星币m', {
                  n: t(window.orgInfo.st_point_uint&&window.orgInfo.st_point_uint[0]) || t('志愿'),
                  m: t(scoreName) || t('星币')
                })}
              </p>
            </div>
          </Link>
        )}
      </div>
    );
  }

  renderPageMyTop() {
    const { user } = this.props;
    return (
      <div>
        {/*<div className="page-my-header">*/}

        {/*<Link to="/my/setting">*/}
        {/*<div className="page-my-header-setting" />*/}
        {/*</Link>*/}

        {/*<Link to="/my/messages">*/}
        {/*{this.renderPageMymessagesTemplate()}*/}
        {/*</Link>*/}

        {/*</div>*/}

        <div>{this.renderPageMyphotoTemplate()}</div>
        {this.renderPageMyRecordTemplate()}
      </div>
    );
  }

  renderPageMyContainer() {
    const { t } = this.props;
    return (
      <div>
        <ul className="page-my-item-container">
          {window.orgInfo.funding_application === 0 ? null : (
            <li>
              <div>
                <Link to="/my/fundingApplication/list">
                  <div className="page-my-item-box">
                    <i className="page-my-item-icon page-my-item-icon-fundingApplication" />
                    {t('社区友好基金')}
                  </div>
                  <span className="page-my-item-big" />
                </Link>
                <div className="line1px" />
              </div>
            </li>
          )}
          <li>
            <div>
              <Link to="/my/circle">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-circle">
                    {this.props.usercenter.data === null ? (
                      <span />
                    ) : (
                      <span
                        className={classnames({
                          "page-my-item-icon-circle-red-point":
                            this.props.usercenter.data.comment_count >= 1
                        })}
                      />
                    )}
                  </i>
                  {t('我的志愿圈')}
                </div>
                <span className="page-my-item-big" />
              </Link>
              <div className="line1px" />
            </div>
          </li>

          <li>
            <div>
              <Link to="/my/messages">
                <div className="page-my-item-box">
                  {this.renderPageMymessagesTemplate()}
                  {t('我的消息')}
                  {/*<i className="page-my-item-icon page-my-item-icon-news" />我的消息*/}
                </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      {
                          this.props.usercenter.data&&this.props.usercenter.data.msg_count > 0 ?
                          <span className="page-my-message-msg_count">{this.props.usercenter.data&&this.props.usercenter.data.msg_count}</span> : null
                      }
                      <span className="page-my-item-big" />
                  </div>
              </Link>
              <div className="line1px" />
            </div>
          </li>

          <li>
            <div>
              <Link to="/my/profile/detail/user">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-data" />
                  {t('个人资料')}
                </div>
                <span className="page-my-item-big" />
              </Link>
              <div className="line1px" />
            </div>
          </li>
          {
            orgCode === "7N1aM8AeWm" ? null :
              (<li>
                <div onClick={this.hasntIdnumber}>
                  <Link to={window.orgCode === "mWZdPNwaKg" ? "/my/certificateBMW":"/my/certificate"} >
                    <div className="page-my-item-box">
                      <i className="page-my-item-icon page-my-item-icon-certificate" />
                      {t('我的证书')}
                    </div>
                    <span className="page-my-item-big" />
                  </Link>
                  <div className="line1px" />
                </div>
              </li>)
          }
          {
            orgCode === "7N1aM8AeWm" ? null :
            (<li>
              <div>
                <Link to="/my/family">
                  <div className="page-my-item-box">
                    <i className="page-my-item-icon page-my-item-icon-family" />
                    {t('我的家庭')}
                  </div>
                  <span className="page-my-item-big" />
                </Link>
                <div className="line1px" />
              </div>
            </li>)
          }
          <li>
            <div>
              <Link to="/my/collects">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-like" />
                  {t('我的收藏')}
                </div>
                <span className="page-my-item-big" />
              </Link>
              <div className="line1px" />
            </div>
          </li>
          {
            orgCode === "7N1aM8AeWm" ? null :
            (<li>
              <div>
                <Link to="/my/duration/applys">
                  <div className="page-my-item-box">
                    <i className="page-my-item-icon page-my-item-icon-applys" />
                    {t('申请服务时长')}
                  </div>
                  <span className="page-my-item-big" />
                </Link>
                <div className="line1px" />
              </div>
            </li>)
          }
          {orgCode === "wMvbmOeYAl" || orgCode === "7N1aM8AeWm" ? (
            <li />
          ) : (
            <li>
              <div>
                <Link to="/my/service">
                  <div className="page-my-item-box">
                    <i className="page-my-item-icon page-my-item-icon-service" />
                    {t('服务中心')}
                  </div>
                  <span className="page-my-item-big" />
                </Link>
                <div className="line1px" />
              </div>
            </li>
          )}
          <li>
            <div>
              <Link to="/my/setting">
                <div className="page-my-item-box">
                  <i className="page-my-item-icon page-my-item-icon-setting" />
                  {t('设置')}
                </div>
                <span className="page-my-item-big" />
              </Link>
              <div className="line1px" />
            </div>
          </li>
        </ul>
      </div>
    );
  }

  closeModalNew() {
    this.setState({
      visible: false
    });
  }

  renderCommonwealLevel() {
    const { userAchieveList, user, t } = this.props;
    const height = [18, 37, 57, 78, 104, 126];
    let now_label = {
      name: ""
    };
    let next_label = null;
    let last_label = null;
    if (
      userAchieveList &&
      userAchieveList.data &&
      userAchieveList.data.data &&
      userAchieveList.data.data.growth_level &&
      userAchieveList.data.data.growth_level.length &&
      user
    ) {
      // 过滤一下，没有name的过滤掉，有的不需要6级，但都下发了。
      let userAchieveListLocal = [];
      userAchieveList.data.data.growth_level.forEach(item => {
        if (item.name) {
          userAchieveListLocal.push(item);
        }
      });
      last_label = userAchieveListLocal[userAchieveListLocal.length - 1];
      if (user.growth < userAchieveListLocal[0].growth) {
        now_label = userAchieveListLocal[0];

        now_label.level = 0;
        next_label = userAchieveListLocal[1];
        next_label.growth = userAchieveListLocal[0].growth;
        next_label.level = 1;
      } else if (
        user.growth >=
        Number(userAchieveListLocal[userAchieveListLocal.length - 2].growth)
      ) {
        next_label = null;
        now_label = userAchieveListLocal[userAchieveListLocal.length - 1];
        now_label.level = userAchieveListLocal.length - 1;
      } else {
        for (let i = 0; i < userAchieveListLocal.length; i++) {
          if (user.growth >= userAchieveListLocal[i].growth) {
            now_label = userAchieveListLocal[i + 1];
            now_label.level = i;
            next_label = userAchieveListLocal[i + 2];
            next_label.level = i + 2;
          }
        }
      }
    }
    return (
      <div className="commonweal-box">
        <div className="commonweal-box-close" onClick={this.closeModalNew}>
          <img src="/images/my/delete.png" alt="" />
        </div>
        <div className="commonweal-box-level">
          <div>
            <p style={{ textAlign: "left" }}>{t('当前等级')}</p>
            <p>
              {now_label.name === ""
                ? t('暂无等级')
                : `Lv.${now_label.level} ${now_label.name}`}
            </p>
          </div>
          <div>
            <p style={{ textAlign: "right" }}>{t('成长值')}</p>
            <p>{`${
              next_label === null
                ? user.growth
                : user.growth + "/" + next_label.growth
            }`}</p>
          </div>
        </div>
        <div className="commonweal-box-bar">
          <div
            style={{
              width:
                now_label && last_label
                  ? `${(now_label.growth / last_label.growth >= 100
                      ? 100
                      : now_label.growth / last_label.growth) * 100}%`
                  : 0
            }}
            className="commonweal-box-bar-active"
          />
        </div>
        <div className="commonweal-box-level commonweal-box-level-next">
          <div>
            <p style={{ textAlign: "left" }}>
              {now_label.name === "" ? "" : `Lv.${now_label.level}`}
            </p>
            <p>{now_label.name === "" ? "" : `${now_label.name}`}</p>
          </div>
          <div>
            <p style={{ textAlign: "right" }}>
              {!next_label ? "" : `Lv.${next_label.level}`}
            </p>
            <p>{!next_label ? "" : `${next_label.name}`}</p>
          </div>
        </div>
        <div className="line1px" />
        <div className="commonweal-box-growUp">
          <div className="commonweal-box-growUp-word">{t('成长体系')}</div>
          <div className="commonweal-box-growUp-box">
            {userAchieveList &&
              userAchieveList.data &&
              userAchieveList.data.data &&
              userAchieveList.data.data.growth_level &&
              userAchieveList.data.data.growth_level.length &&
              userAchieveList.data.data.growth_level.map((item, index) => {
                return (
                  <div
                    className={classnames({
                      "commonweal-box-growUp-box-bar": true
                    })}
                    key={index}
                  >
                    <div
                      style={{ height: height[index] + "px" }}
                      className="commonweal-box-growUp-box-bar-middle"
                    >
                      <div
                        className={classnames({
                          "commonweal-box-growUp-box-bar-top": true,
                          "commonweal-box-growUp-box-bar-top-active":
                            now_label.level == index
                        })}
                      >
                        {item.name}
                      </div>
                    </div>
                    <div className="commonweal-box-growUp-box-bar-bot">
                      Lv.{index}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="commonweal-box-growUp-more">
          {t('您可以通过更多志愿行为来获得成长值')}
        </div>
        <div className="commonweal-box-growUp-red" onClick={this.instruction}>
          {t('查看成长值获得方法')}
        </div>
      </div>
    );
  }

  instruction() {
    this.setState({
      visibleInstruction: true
    });
  }

  closeModalNewInstruction() {
    this.setState({
      visibleInstruction: false
    });
  }

  renderInstruction() {
    const {
      userAchieveList: { data: udata },
      t
    } = this.props;
    if (!udata) {
      return null;
    }
    const data =
      udata.data && udata.data.growth_value && udata.data.growth_value;
    return (
      <div className="commonweal-box">
        <div
          className="commonweal-box-close"
          onClick={this.closeModalNewInstruction}
        >
          <img src="/images/my/delete.png" alt="" />
        </div>
        <div className="commonweal-box-instruction-how">{t('如何获得成长值')}？</div>
        <div className="commonweal-box-instruction-list">
          {t('下列操作可以帮你获得成长值')}：
        </div>
        <div className="commonweal-box-instruction-table">
          <table>
            <thead>
              <tr>
                <td>{t('操作')}</td>
                <td>{t('获得成长值')}</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr>
                  <td>{item.label}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="commonweal-box-instruction-btn"
          onClick={this.closeModalNewInstruction}
        >
          {t('我知道了')}
        </div>
      </div>
    );
  }

  renderModalInstruction() {
    return (
      <ModalNew
        maskCloseable={true}
        visible={this.state.visibleInstruction}
        platform="ios"
        transparent={true}
        animationType="slide"
      >
        {this.renderInstruction()}
      </ModalNew>
    );
  }

  renderModal() {
    return (
      <ModalNew
        maskCloseable={true}
        visible={this.state.visible}
        platform="ios"
        transparent={true}
        animationType="slide"
      >
        {this.renderCommonwealLevel()}
      </ModalNew>
    );
  }

  render() {
    const BackButtonStyle = {
      border: "none",
      position: "absolute",
      top: "40px",
      right: "20px"
    };
    return (
      <div>
        <div className="page-my">
          <div className="page-my-top">{this.renderPageMyTop()}</div>
          <div className="page-my-line" />
          <div className="page-my-item-container-padding">
            {this.renderPageMyContainer()}
            <Gallery
              src={this.state.previewData}
              show={this.state.showMultiple}
              defaultIndex={this.state.defaultIndex}
            >
                <div
                    style={BackButtonStyle}
                    onClick={e => this.setState({ showMultiple: false })}
                    plain
                >
                    <img src="/images/my/delete.png" alt=""/>
                    {/*<Image src="/images/preview/close_modal.png" resize={{width: 20, height: 20}} defaultSrc="/images/preview/close_modal.png" alt=""/>*/}
                </div>
            </Gallery>
          </div>
          {this.renderModal()}
          {this.renderModalInstruction()}
        </div>
        {window.orgCode === 'K4oeERva0B' ? (
          <div>
            <div className="page-my-line" />
            <a className="page-setting-quit" onClick={this.props.logoutAction}>
              {t('退出登录')}
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

MyPage.title = i18next.t("个人中心");

MyPage.propTypes = {
  userCenterAction: PropTypes.func,
  requestUserInfo: PropTypes.func,
  user: PropTypes.shape({
    data: PropTypes.shape({
      isLogin: PropTypes.bool,
      token: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string,
      phone: PropTypes.string,
      avatars: PropTypes.string,
      real_name: PropTypes.string,
      nation: PropTypes.string,
      sex: PropTypes.number,
      birthday: PropTypes.string,
      identifier: PropTypes.string,
      slogan: PropTypes.string,
      reward_time: PropTypes.string,
      id_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      province_id: PropTypes.number,
      province_name: PropTypes.string,
      city_id: PropTypes.number,
      city_name: PropTypes.string,
      county_id: PropTypes.number,
      county_name: PropTypes.string,
      addr: PropTypes.string,
      family_id: PropTypes.number,
      join_family_time: PropTypes.string,
      good_at: PropTypes.arrayOf(PropTypes.shape({}))
    })
  }),
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
        good_at: PropTypes.arrayOf(PropTypes.shape({})),
        family_id: PropTypes.number,
        id: PropTypes.number,
        id_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        identifier: PropTypes.string,
        join_family_time: PropTypes.string,
        nation: PropTypes.string,
        phone: PropTypes.string,
        real_name: PropTypes.string,
        reward_time: PropTypes.string,
        sex: PropTypes.number,
        slogan: PropTypes.string,
        username: PropTypes.string
      })
    })
  })
};

export default connect(
  state => ({
    usercenter: state.my.usercenter,
    user: state.user,
    userAchieveList: state.my.userAchieve
  }),
  dispatch =>
    bindActionCreators(
      {
        userCenterAction,
        requestUserInfo,
        userAchieve,
        logoutAction
      },
      dispatch
    )
)(translate('translations')(MyPage));

