/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import WXShare from '../../components/share';
import Link from '../../components/link/link';
import { requestCheckinList, checkin } from '../sign/sign.store';
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
    this.props.requestCheckinList();
  }

  componentDidMount() {
 
  }

  componentWillReceiveProps(nextProps) {
    const { checkinData: LcheckinData } = this.props;
    const { checkinData: NcheckinData } = nextProps;
    if (LcheckinData.fetching && !NcheckinData.fetching && !NcheckinData.failed) {
      this.props.requestCheckinList();
    }
  }

  componentWillUnmount() {}

  
  render() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    const next = data && data.next && data.next.project ? data.next : null;

    return <div>
      <SignItem data={null}/>
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
    data: state.sign.ckeckinList.data,
    checkinData: state.sign.checkin,
  }),
  dispatch => bindActionCreators({ requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity }, dispatch),
)(SignPage);
