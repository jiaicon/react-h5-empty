/**
 * @file 项目认领列表详情
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../../history';

import Link from '../../../../components/link/link';
import './index.css';
import IMAGE from '../../../../components/image/image';

// import { starModelAction } from './starModel.store';

class projectClaimDetail extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-claim-detail">
        11

      </div>
    );
  }
}


projectClaimDetail.title = '项目详情';

projectClaimDetail.propTypes = {


};

export default connect(
  state => ({

  }),
  dispatch => bindActionCreators({ },
    dispatch),
)(projectClaimDetail);
