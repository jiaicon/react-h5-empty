/**
 * @file 项目认领列表页
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../history';

import Link from '../../../../components/link/link';
import './index.css';
import IMAGE from '../../../../components/image/image';

// import { starModelAction } from './starModel.store';

class projectClaim extends React.Component {

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
      <div className="page-starmodel">
        11

      </div>
    );
  }
}


projectClaim.title = '项目认领';

projectClaim.propTypes = {


};

export default connect(
  state => ({

  }),
  dispatch => bindActionCreators({ },
    dispatch),
)(projectClaim);
