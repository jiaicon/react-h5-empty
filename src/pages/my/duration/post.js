/**
 * @file 补录申请
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import './post.css';
import UpLoadImg from './component/post/uploadimg';
import RenderImg from './component/post/renderimg';
import DurationItem from './component/durationItem';

class Post extends React.Component {

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
      <div className="page-post-bg">
        <div className="page-post-container">
          <div className="page-post-container-item">
            <div>{/** 选择后添加class  改斌字体颜色page-post-color* */}补录时长项目</div>
            <div className="page-post-container-item-more" />
          </div>
          <input type="text" className="page-post-container-text" placeholder="申请补录时长(小时)" />
          <textarea className="page-post-container-explain" placeholder="申请说明（200字内）" maxLength="200" />
          <div className="page-post-container-photo-text" >工作证明图片(选填)</div>
          <div className="page-post-container-photo-container">
            <UpLoadImg />
            <RenderImg />
          </div>
          <div className="page-post-btn">提交</div>
          {/** 遮罩层* */}
          <div className="page-post-mask-container">
            <div className="page-post-take-up" />
            <div className="page-post-mask-content">
              <DurationItem />
              <DurationItem />
              <DurationItem />
              <DurationItem />
              <DurationItem />
            </div>
          </div>
        </div>

      </div>
    );
  }
}


Post.title = '补录申请';

Post.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Post);
