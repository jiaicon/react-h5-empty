/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../components/share';
import Link from '../../components/link/link';
import { requestCheckinList, checkin, requestClockList} from '../sign/sign.store';
import history from '../history';

import { getCity, getLocation } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../home/home.store';

import SignItem from '../../components/signItem/index.js'

class SignPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestClockList();
  }

  componentDidMount() {
 
  }

  componentWillReceiveProps(nextProps) {
 
  }

  componentWillUnmount() {}

  
  render() {
    console.log(this.props.clocklist);
    const { data } = this.props.clocklist;

    return <div>
        <SignItem data={data} />
      </div>;
  }
}

SignPage.title = '签到打卡';

SignPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};
export default connect(
  state => ({
    clocklist: state.sign.clocklist,
  }),
  dispatch => bindActionCreators({ requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity, requestClockList }, dispatch),
)(SignPage);
