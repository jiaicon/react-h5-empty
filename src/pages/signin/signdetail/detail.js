/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import Link from '../../../components/link/link';
import { requestCheckinList, checkin } from '../../signin/signin.store';

import history from '../../history';

import { getCity, getLocation } from '../../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../../home/home.store';
import "./detail.css";
class SigninPage extends React.Component {

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
    
    }

    componentWillUnmount() { }

    render() {
        return <div className="page-signin-detail">
            <div className="page-signin-title">
              <div style={{ fontSize: "14px", color: "#4A4A4A" }}>
                志多星关注程序员健康活动
              </div>
              <div style={{ fontSize: "12px", color: "#9B9B9B" }}>
                2019.01.09
              </div>
            </div>
          </div>;
    }
}

SigninPage.title = '签到打卡';

SigninPage.propTypes = {
    data: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.shape({})),
        next: PropTypes.shape({}),
    }),
    checkin: PropTypes.func,
    requestCheckinList: PropTypes.func,
};
export default connect(
    state => ({
        data: state.signin.ckeckinList.data,
        checkinData: state.signin.checkin,
    }),
    dispatch => bindActionCreators({ requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity }, dispatch),
)(SigninPage);
