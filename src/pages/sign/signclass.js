/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../components/share';
import Link from '../../components/link/link';
import { requestClockClassList } from "./sign.store";
import history from '../history';

import { getCity, getLocation } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../home/home.store';

import SignClassItem from "../../components/signclassItem/index.js";





class SignClassPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = this.props.route.params.Id;
  }

  componentWillMount() {
    this.props.requestClockClassList(this.Id);
  }

  componentDidMount() {
 
  }

  componentWillReceiveProps(nextProps) {
 
  }

  componentWillUnmount() {}

  
  render() {
    const { data } = this.props.clockclasslist;

    return <div>
      <SignClassItem data={data} />
      </div>;
  }
}

SignClassPage.title = '签到打卡';

SignClassPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};
export default connect(
  state => ({
    clockclasslist: state.sign.clockclasslist
  }),
  dispatch => bindActionCreators({ requestClockClassList }, dispatch)
)(SignClassPage);
