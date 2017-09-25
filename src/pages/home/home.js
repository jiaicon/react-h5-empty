/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WXShare from '../../components/share';
import './home.css';
import { register } from '../my/register/register.store';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.register('miller', '1234');
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
      <div className="page-home">
        <h1>首页</h1>
      </div>
    );
  }
}

HomePage.propTypes = {
  register: React.PropTypes.func,
};

HomePage.title = '首页';

export default connect(
  state => state.home,
  dispatch => bindActionCreators({ register }, dispatch),
)(HomePage);
