/**
 * @file 志愿时长
 */

/* global wx:false */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "../../../components/link/link";
// import ApplyItem from '../../../components/duration_apply/applysItem';
import { applyAction } from "../my.store";
import "./applys.css";
class ApplyItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  render() {
    if (!this.props.data) return null;
    return (
      <div className="page-apply-components">
        {this.props.data.map((item, index) => {
          return (
            <div className="page-apply-components-content">
              <div className="page-apply-components-content-top">
                <div>
                  志多星关注程序员健康活动志多星关注程序员健康活动
                </div>

                <div>2017/9/20 09:00 - 10:00</div>
              </div>

              <div className="line1px" />
              <div className="page-apply-components-content-bottom">
                <div>
                  预计最多可获得志愿时长<span>2.00小时</span>
                </div>
                <div className="ing">审核中</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
class Apply extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.applyAction();
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  render() {
    // const { data: listData } = this.props.apply;
    let listData = {
      list: [{}, {}]
    };
    return (
      <div className="page-apply">
        <div>
          <ApplyItem data={listData ? listData.list : null} />
          <div className="page-apply-take-up" />
        </div>
        <Link to="/my/duration/post" className="page-apply-bottom-btn">
          <div className="page-apply-main">申请补卡</div>
        </Link>
      </div>
    );
  }
}

Apply.title = "补录申请";

Apply.propTypes = {
  applyAction: PropTypes.func,
  apply: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({}))
    })
  })
};

export default connect(
  state => ({
    apply: state.my.apply
  }),
  dispatch => bindActionCreators({ applyAction }, dispatch)
)(Apply);
