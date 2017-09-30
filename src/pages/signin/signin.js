/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WXShare from '../../components/share';
import { requestHomeData } from '../home/home.store';
import './signin.css';

class SigninPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestHomeData();
  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-signin">
        <h1>签到打卡</h1>
      </div>
    );
  }
}

SigninPage.title = '签到打卡';

SigninPage.propTypes = {
  requestHomeData: React.PropTypes.func,
};

export default connect(
  state => state.signin || {},
  dispatch => bindActionCreators({ requestHomeData }, dispatch),
)(SigninPage);
