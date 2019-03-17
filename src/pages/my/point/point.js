/**
 * @file 我的{scoreName || '星币'}明细
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import history from "../../history";
import { userCenterAction, userAchieve } from "../my.store";
import "./point.css";
import ModalNew from "./../../../components/ModalNew/ModalNew";

import Link from "../../../components/link/link";
import IMAGE from "../../../components/image/image";
import PayPage from "./point_pay";
import IncomePage from "./point_income";

const TAB_URL_MAPS = {
  "/my/point": <IncomePage />,
  "/my/point/pay": <PayPage />
};
const scoreName =
  window.orgInfo.st_point_uint && window.orgInfo.st_point_uint[1];
class PointPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      page: this.getTabName(this.props),
      visible: false
    };
  }

  componentWillMount() {
    this.props.userCenterAction();
    this.props.userAchieve();
  }

  componentDidMount() {
    document.title = `我的${scoreName || "星币"}明细`;
  }
  componentWillUnmount() {
    this.setState({
      visible: false
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      page: this.getTabName(nextProps)
    });
  }

  getTabName(props) {
    return TAB_URL_MAPS[(props || this.props).route.path];
  }
  checkScoreMethod() {
    this.setState({
      visible: true
    });
  }
  closeModalNewInstruction() {
    this.setState({
      visible: false
    });
  }
  renderScoreMethod() {
    let data = [];
    if (
      this.props.userAchieveList &&
      this.props.userAchieveList.data &&
      this.props.userAchieveList.data.data &&
      this.props.userAchieveList.data.data.score &&
      Array.isArray(this.props.userAchieveList.data.data.score)
    ) {
      data = this.props.userAchieveList.data.data.score;
    }

    return (
      <div className="commonweal-box">
        <div
          className="commonweal-box-close"
          onClick={this.closeModalNewInstruction}
        >
          <img src="/images/my/delete.png" alt="" />
        </div>
        <div className="commonweal-box-instruction-how">
          如何获得{scoreName || "星币"}？
        </div>
        <div className="commonweal-box-instruction-list">
          下列操作可以帮你获得{scoreName || "星币"}：
        </div>
        <div className="commonweal-box-instruction-table">
          <table>
            <thead>
              <tr>
                <td>操作</td>
                <td>获得{scoreName || "星币"}</td>
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
          我知道了
        </div>
      </div>
    );
  }
  renderModalNewScore() {
    return (
      <ModalNew
        maskCloseable={true}
        visible={this.state.visible}
        platform="ios"
        transparent={true}
        animationType="slide"
      >
        {this.renderScoreMethod()}
      </ModalNew>
    );
  }
  render() {
    const { page } = this.state;
    const { path } = this.props.route;
    return (
      <div className="page-ponit">
        <div className="page-ponit-pic-container">
          <div className="page-ponit-pic-title">
            <span>我的{scoreName || "星币"}明细(个)</span>
            <span style={{ margin: "13px 0 13px" }}>
              {this.props.usercenter.data == null
                ? 0
                : this.props.usercenter.data.user.score}
            </span>
            <span className="checkScoreMethod" onClick={this.checkScoreMethod}>
              查看{scoreName || "星币"}获取方法
            </span>
          </div>
        </div>
        <div className="page-ponit-tab-container">
          <div className="page-ponit-tab-container-li">
            <Link to="/my/point">
              <div
                className={classnames({
                  "page-ponit-tab-container-li-current": true,
                  active: path === "/my/point"
                })}
              >
                {scoreName || "星币"}获取
              </div>
            </Link>
          </div>
          <div>
            <div className="line1px-v page-ponit-tab-container-line-v" />
          </div>
          <div className="page-ponit-tab-container-li">
            <Link to="/my/point/pay">
              <div
                className={classnames({
                  "page-ponit-tab-container-li-current": true,
                  active: path === "/my/point/pay"
                })}
              >
                {scoreName || "星币"}支出
              </div>
            </Link>
          </div>
        </div>
        <div className="page-ponit-content">{page}</div>
        {this.renderModalNewScore()}
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
    userAchieveList: state.my.userAchieve
  }),
  dispatch => bindActionCreators({ userCenterAction, userAchieve }, dispatch)
)(PointPage);
