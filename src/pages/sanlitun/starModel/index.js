/**
 * @file 三里屯星级版样
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

import Link from '../../../components/link/link';
import './index.css';
import IMAGE from '../../../components/image/image';
import PERSONINFO from '../../../components/personInfo';
import IndexItem from '../component/indexItem/indexItem';

import { starModelAction } from './starModel.store';

class starModelPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.starModelAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  render() {
    const starModel = this.props.starModel;
    if (!starModel.data) {
      return <div>加载中</div>;
    }
    console.log(starModel.data);
    return (
      <div className="page-starmodel">
        <IMAGE src="" className="page-starmodel-header-pic" />
        <IndexItem data={starModel.data} />
      </div>
    );
  }
}


starModelPage.title = '星级榜样';

starModelPage.propTypes = {


};

export default connect(
  state => ({
    starModel: state.sanlitun.starModel,
  }),
  dispatch => bindActionCreators({ starModelAction },
    dispatch),
)(starModelPage);
