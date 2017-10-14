/**
 * @file 补录申请
 */


import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import './post.css';
import UpLoadImg from './component/post/uploadimg';
import RenderImg from './component/post/renderimg';
import DurationItem from './component/durationItem';

class Post extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      popToggle: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  onPop() {
    let popToggle = this.state.popToggle;
    popToggle = !popToggle;
    this.setState({
      ...this.state,
      popToggle,
    });
  }
  render() {
    const popToggle = this.state.popToggle;
    return (
      <div className="page-post-bg">
        <div className="page-post-container">
          <div className="page-post-container-item" onClick={this.onPop}>
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
          <div
            className={classnames({
              'page-post-mask-container': true,
              'page-post-pop-block': { popToggle },
            })}
          >
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
