/**
 * @file 服务时长
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
import moment from "moment";
import { translate } from 'react-i18next';
import i18next from 'i18next';

let verify_status = {
  '-1': i18next.t('未提审'),
  '0': i18next.t('审核中'),
  '1': i18next.t('通过'),
  '2': i18next.t('驳回')
};
class ApplyItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps() { }

  componentWillUnmount() { }

  render() {

    if (!this.props.data) return null;
    const { t } = this.props;
    return (
      <div className="page-apply-components">
        {this.props.data.map((item, index) => {
          return (
            <div className="page-apply-components-content">
              <div className="page-apply-components-content-top">
                <div>
                  {item.project.name}
                </div>
                <div>{moment(item.clock_in_time).format('YYYY-MM-DD')}    </div>
                {/* <div>{item && item.clock.begin} - {item && item.clock.end}</div> */}
              </div>

              <div className="line1px" />
              <div className="page-apply-components-content-bottom">
                <div>
                  {t('预计最多可获得服务时长')}<span>{item.reward_time}{t('小时')}</span>
                </div>
                <div className="ing">{verify_status[item.verify_status]}</div>
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
    this.props.applyAction().then(() => { this.forceUpdate(); });
  }

  componentDidMount() { }

  componentWillReceiveProps() { }

  componentWillUnmount() { }

  render() {
    const { data: listData } = this.props.apply;
    const { t } = this.props;
    return (
      <div className="page-apply">
        <div>
          <ApplyItem t={t} data={listData ? listData.list : null} />
          <div className="page-apply-take-up" />
        </div>
        <Link to="/sign/replacement/proid/class" className="page-apply-bottom-btn">
          <div className="page-apply-main">{t('申请补卡')}</div>
        </Link>
      </div>
    );
  }
}

Apply.title = i18next.t('申请补卡');

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
)(translate('translations')(Apply));
