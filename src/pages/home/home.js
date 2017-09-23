/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WXShare from '../../components/share';
import './home.css';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

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
};

HomePage.title = '首页';

export default connect(
  state => state.home,
  dispatch => bindActionCreators({}, dispatch),
)(HomePage);
