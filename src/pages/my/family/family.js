/**
 * @file 我的家庭
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserInfo } from '../../../stores/common';
import FamilyItem from './component/familyItem';
import './family.css';

class Family extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.requestUserInfo();
  }

  componentDidMount() {
    console.log(this.props.user);
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const user = this.props.user;
    console.log(user);
    return (
      <div className="page-family">
        <div className="pages-family-top-area-container">
          <div className="pages-family-top-area-title-and-btn">
            <h5>我的家庭</h5>
            <div className="pages-family-top-area-btn">添加成员</div>
          </div>
          <div className="page-family-top-area-view">
            <div className="page-family-top-area-view-family-box">
              <p><span>1</span>人</p>
              <p>家庭成员</p>
            </div>
            <div className="page-family-top-area-view-line" />
            <div className="page-family-top-area-view-family-box">
              <p><span>139</span>小时</p>
              <p>志愿总时长</p>
            </div>
          </div>
        </div>
        <div className="page-family-take-up" />
        <div>
          <FamilyItem data={user} />
          <Swipeout
            right={[
              {
                text: '删除',
                onPress: () => console.log('delete'),
                style: { backgroundColor: 'red', color: 'white' },
                className: 'custom-class-2',
              },
            ]}
            onOpen={() => console.log('open')}
            onClose={() => console.log('close')}
          >
            <div style={{ height: 44 }}> swipeout demo </div>
          </Swipeout>

        </div>


      </div>
    );
  }
}


Family.title = '我的家庭';

Family.propTypes = {
};

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestUserInfo,
  }, dispatch),
)(Family);
