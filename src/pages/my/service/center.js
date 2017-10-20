/**
 * @file 客服中心
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
import './center.css';
import Avatar from '../../../components/avatar/avatar';


class Center extends React.Component {

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
  // <div className="page-center-code">二维码</div>
  // <div className="page-center-info">请长按二维码，关注服务号，在服务号内留言。</div>
  // <div className="page-center-info">或直接拨打下方热线</div>
  // <a href="tel:010 - 26002600">客服热线</a>

  render() {
    return (
      <div className="page-center" >
        {/** 1.jpg 正方  2.jpg 竖长  3.jpg 横长 */}
        <Avatar src="/images/3.jpg" resize={{ width: 200, height: 200, radius: 10 }} />

      </div>
    );
  }
}


Center.title = '客服中心';

Center.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Center);
