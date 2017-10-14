/**
 * @file 志愿时长
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './duration.css';
import DutationItem from './component/durationItem';
import { teamAction, rewardTimeAction, projectAction } from '../my.store';

class Duration extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const reward = this.props.reward.data;
    return (
      <div className="page-duration">

        <div className="page-duration-top-area-view">
          <div className="page-duration-top-area-view-duration-box">
            <p><span>{this.props.reward.data.join_project_count ? this.props.reward.data.join_project_count : 0}</span>个</p>
            <p>参加的项目</p>
          </div>
          <div className="page-duration-top-area-view-line" />
          <div className="page-duration-top-area-view-duration-box">
            <p><span>{this.props.reward.data.reward_time ?
               this.props.reward.data.reward_time : 0}</span>小时</p>
            <p>志愿总时长</p>
          </div>
        </div>
        <div className="line1px" />

        <div className="page-duration-main-box">
          {reward.project.length ?

            reward.project.map((item, index) => <DutationItem data={item} key={index} />)

          : <div>{/* 加载中... */}</div>
        }
        </div>


      </div>
    );
  }
}


Duration.title = '志愿时长';

Duration.propTypes = {
  reward: PropTypes.shape({
    data: PropTypes.shape({
      join_project_count: PropTypes.number,
      reward_time: PropTypes.number,
      project: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({

        })),

      ]),

    }),
  }),
};

export default connect(
  state => ({
    reward: state.my.reward,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(Duration);
