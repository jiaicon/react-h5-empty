/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import Alert from "react-s-alert";
import { connect } from "react-redux";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import history from "../../history";
import "./signUp.css";
import { payResultAction } from "../sign/sign.store";
import { getQueryString}from "../../../utils/funcs"
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.sn = props.route.params.sn;
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    const isfirstopen = getQueryString("firstopen");
    const that = this;
    let data = JSON.parse(localStorage.sndata);
    if (isfirstopen) {
      location.replace(`${data.wechatPayUrl}`);
    } else {
      that.props.payResultAction({ sn: this.sn });
    }

    if (localStorage.sndata) {
      this.setState({
        data
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { payResult: LpayResult } = this.props;
    const { payResult: NpayResult } = nextProps;
    const { data } = this.state;

    if (
      LpayResult.fetching &&
      !LpayResult.failed &&
      !NpayResult.fetching &&
      !NpayResult.failed &&
      NpayResult.data
    ) {
      if (NpayResult.data && Number(NpayResult.data.code) == 1) {
        location.replace(`/project/detail/${NpayResult.data.project_id}`);
        // location.replace(`${this.state.data.wechatPayUrl}`);
      } else {
        const that = this;
        setTimeout(function() {
          that.props.payResultAction({ sn: that.sn });
        }, 3000);
      }
    }
  }
  done() {
    this.props.payResultAction({ sn: that.sn });
  }
  backDetail() {
    location.href = `/project/detail/${this.state.data.project_id}`
  }
  componentWillDidmount() {}
  componentWillUnmount() {}

  render() {
    const { data } = this.state;
    if (!data || !data.wechatPayUrl) {
      return null;
    }
    return (
      <div className="page-project-receipt">
        <img
          src="/images/wechaticon.png"
          className="page-project-receipt-wechaticon"
        />
        <div className="page-project-receipt-title">正在尝试打开微信客户端</div>

        <div className="page-project-receipt-paragph">
          1.如果未打开微信客户端或未完成付款，请点击“继续支付”;
        </div>
        <div className="page-project-receipt-paragph">
          2.如果你已完成，请点击“已完成付款”。
        </div>
        <a href={data.wechatPayUrl}>
          <div
            className="page-project-receipt-btn"
            style={{ background: "#08C062", color: "#fff", marginTop: "20px" }}
          >
            继续支付
          </div>
        </a>

        <div className="page-project-receipt-btn" onClick={this.done}>
          已完成付款
        </div>
        <div className="page-project-receipt-btn" onClick={this.backDetail}>
          支付遇到问题(重新报名,回到项目详情页)
        </div>
        {window.orgInfo && window.orgInfo.name ? (
          <div className="page-projrct-receipt-orgname">
            {window.orgInfo && window.orgInfo.name}
          </div>
        ) : null}
      </div>
    );
  }
}

SignUpPage.propTypes = {
  requestProjectDetail: PropTypes.func,
  joinPayProject: PropTypes.func,
  joinProjectAction: PropTypes.func,
  detail: PropTypes.shape({
    fetchingId: PropTypes.string,
    data: PropTypes.shape({}),
    tabIndex: PropTypes.number
  }),
  joinPay: PropTypes.shape({}),
  join: PropTypes.shape({}),
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string
    })
  })
};

SignUpPage.title = "项目支付";

export default connect(
  state => ({ payResult: state.project.projectSign.payResult }),
  dispatch => bindActionCreators({ payResultAction }, dispatch)
)(SignUpPage);
