import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './building.css';

class BuildingPage extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-building">
        <div>
          <img src="/images/construction.png" alt="" />
        </div>
        <span>
          <p>正在建设中</p>
        </span>
      </div>
    );
  }
}

BuildingPage.title = '建设中';

BuildingPage.propTypes = {
};

export default connect(
  () => {},
  dispatch => bindActionCreators({ }, dispatch),
)(BuildingPage);
