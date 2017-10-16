/**
 * @file 我的家庭
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import './collects.css';
import TabItem from '../projects/component/tabItem';
import { collectAction } from '../my.store';

class Collects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      title: ['团队', '项目'],
      current: 0,
    };
  }

  componentWillMount() {
    console.log(this.props.collectAction(0));
    this.props.collectAction(0);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  handleClick(index) {
    this.props.collectAction(index);
    this.setState({
      ...this.state,
      current: index,
    });
  }
  currentClass(index) {
    return this.state.current === index ? 'page-collects-tab-current-li' : '';
  }
  render() {
    // const { collect: { data: listData } } = this.props;
    return (
      <div className="page-collects">
        <ul className="page-collects-tab-container">
          { this.state.title.map((val, index) =>
             (<TabItem currentClass={this.currentClass} handleClick={this.handleClick} val={val} index={index} />)) }
        </ul>
        <div className="line1px" />
        <div className="page-collects-content">
              内容
          <div
            className={cx({
              'page-collects-content-main': this.state.current,
              'page-collects-content-main-current': !this.state.current,
            })}
          >1</div>
          <div
            className={cx({
              'page-collects-content-main': !this.state.current,
              'page-collects-content-main-current': this.state.current,
            })}
          >2</div>
        </div>

      </div>
    );
  }
}

Collects.title = '我的收藏';

Collects.propTypes = {
  collectAction: PropTypes.func,

};

export default connect(
  state => ({
    collect: state.my.collect,
  }),
  dispatch => bindActionCreators({ collectAction }, dispatch),
)(Collects);
