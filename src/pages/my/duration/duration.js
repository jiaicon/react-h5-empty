/**
 * @file 服务时长
 */

/* global wx:false */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './duration.css';
import DutationProjects from '../../../components/duration/projects';
import { rewardTimeAction } from '../my.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Duration extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.rewardTimeAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { reward: { data: listData }, t } = this.props;
    return (
      <div className="page-duration">

        <div className="page-duration-top-area-view">
          <div className="page-duration-top-area-view-duration-box">
            <p>
              <span>
                {this.props.reward.data === null ? 0 : this.props.reward.data.join_project_count}
              </span>个</p>
            <p>{t('参加的项目')}</p>
          </div>
          <div className="page-duration-top-area-view-line" />
          <div className="page-duration-top-area-view-duration-box">
            <p>
              <span>
                {this.props.reward.data === null ? 0 : this.props.reward.data.reward_time}
              </span>{t('小时')}</p>
            <p>{t('志愿总时长')}</p>
          </div>
        </div>
        <div className="line1px" />

        <div className="page-duration-main-box">
          <DutationProjects durationProject={this.props.reward.data ? listData.project : null} user={this.props.user} isEntry />
        </div>


      </div>
    );
  }
}


Duration.title = i18next.t('服务时长');

Duration.propTypes = {
  rewardTimeAction: PropTypes.func,
  reward: PropTypes.shape({
    data: PropTypes.shape({
      join_project_count: PropTypes.number,
      reward_time: PropTypes.number,
      project: PropTypes.arrayOf(PropTypes.shape({

      })),


    }),
  }),
};

export default connect(
  state => ({
    reward: state.my.reward,
    user:state.user,
  }),
  dispatch => bindActionCreators({ rewardTimeAction }, dispatch),
)(translate('translations')(Duration));
