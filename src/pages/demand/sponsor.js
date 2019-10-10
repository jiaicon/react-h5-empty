import React, { PropTypes } from 'react';
import autoBind from "react-autobind";
import { connect } from "react-redux";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import './sponsor.css';


class DemandSponnsor extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const windowHeight = document.documentElement.clientHeight;

    return(<div className="sponsor" style={{minHeight: `${windowHeight}px`}}>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">求助人</div>
        <input className="sponsor-line-ipt-value" type="text" placeholder="输入姓名"/>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">电话</div>
        <input className="sponsor-line-ipt-value" type="text" placeholder="输入电话"/>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">求助类别</div>
        <select className="sponsor-line-ipt-value" required name="" id="">
          <option value ="-1">选择求助类别</option>
          <option value ="政策宣讲">政策宣讲</option>
          <option value ="培训">培训</option>
          <option value ="困难帮扶">困难帮扶</option>
          <option value ="文艺辅导">文艺辅导</option>
          <option value ="社会关爱">社会关爱</option>
        </select>
        <i className="sponsor-icon-right-arrow"></i>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">需求标题</div>
        <input className="sponsor-line-ipt-value" type="text" placeholder="输入需求标题"/>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line-textarea">
        <textarea className="sponsor-line-textarea-style" rows="5" placeholder="输入求助信息详情（不超过250个字）"></textarea>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">服务地点</div>
        <select className="sponsor-line-ipt-value" required name="" id="">
          <option value ="-1">选择服务地点</option>
          <option value ="城关镇">城关镇</option>
          <option value ="武安镇">武安镇</option>
          <option value ="九集镇">九集镇</option>
          <option value ="肖堰镇">肖堰镇</option>
          <option value ="东巩镇">东巩镇</option>
          <option value ="巡检镇">巡检镇</option>
          <option value ="板桥镇">板桥镇</option>
          <option value ="薛坪镇">薛坪镇</option>
          <option value ="长坪镇">长坪镇</option>
          <option value ="李庙镇">李庙镇</option>
          <option value ="清河区">清河区</option>
          <option value ="经济开发区">经济开发区</option>
        </select>
        <i className="sponsor-icon-right-arrow"></i>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">详细地址</div>
        <input className="sponsor-line-ipt-value" type="text" placeholder="输入详细服务地址"/>
      </div>
      <div className="sponsor-submit">提交</div>
    </div>)
  }
}

DemandSponnsor.propTypes = {
};

DemandSponnsor.title = "求助申请";

export default connect(
  state => ({
  }),
  dispatch =>
    bindActionCreators(
      {
      },
      dispatch
    )
)(DemandSponnsor);
