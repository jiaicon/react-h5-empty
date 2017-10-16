/**
 * @file 志愿时长
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import ApplyItem from '../../../components/duration_apply/applysItem';
import { applyAction } from '../my.store';
import './applys.css';

class Apply extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.applyAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { apply: { data: listData } } = this.props;
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
        <div>
          <ApplyItem data={listData ? listData.list : null} />
        </div>
      </div>
    );
  }
}


Apply.title = '补录申请';

Apply.propTypes = {
  applyAction: PropTypes.func,
  apply: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({}),
      ),
    }),

  }),
};

export default connect(
  state => ({
    apply: state.my.apply,
  }),
  dispatch => bindActionCreators({ applyAction }, dispatch),
)(Apply);
