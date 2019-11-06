/**
 * @file 三里屯星级版样
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../../history';

import Link from '../../../../components/link/link';
import './detail.css';
import Avatar from '../../../../components/avatar/avatar';
import IMAGE from '../../../../components/image/image';
import PERSONINFO from '../../../../components/personInfo';

import { starDetailAction } from '../starModel.store';

class starModelDetail extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = this.props.route.params.Id;
  }

  componentWillMount() {
    this.props.starDetailAction(this.Id);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const newTeamId = nextProps.route.params.teamId;

    if (newTeamId !== this.teamId) {
      this.Id = newTeamId;
      this.props.starDetailAction(this.Id);
    }

  }

  componentWillUnmount() {}

  render() {
    const data = this.props.starDetail.data;
    const currentId = parseInt(this.Id, 10);
    const nowId = data ? data.id : ' ';
    if(currentId !== nowId){
      return null;
    }
    return (
      <div className="page-starmodel-detail">
        <PERSONINFO data={data} />
        <div className="line1px" />
        {
          /* <div className="page-starmodel-detail-info">个人事迹</div> */
        }
        <div
          className="page-starmodel-detail-descript"
          dangerouslySetInnerHTML={{
            __html: data.description,
          }}
        />
      </div>
    );
  }
}


if(window.orgCode == 'q9wdL9wejP') {
  starModelDetail.title = "文明宣讲";
} else {
  starModelDetail.title = '星级榜样';
}

starModelDetail.propTypes = {


};

export default connect(
  state => ({
    starDetail: state.sanlitun.starDetail,
  }),
  dispatch => bindActionCreators({ starDetailAction },
    dispatch),
)(starModelDetail);
