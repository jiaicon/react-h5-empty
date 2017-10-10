/**
 * @file 志愿时长
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import ApplyItem from './component/applysItem';
import './applys.css';

class Apply extends React.Component {

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
    return (
      <div className="page-apply">
        <div className="page-apply-header">
          <Link to="/my/duration/post">
            <div className="page-apply-main">
              发起
              <span>补录申请</span>
              <div className="page-apply-more" />
            </div>
          </Link>
          <div className="page-apply-take-up" />
        </div>
        <ApplyItem />
      </div>
    );
  }
}


Apply.title = '补录申请';

Apply.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Apply);
