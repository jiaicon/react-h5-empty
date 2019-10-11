import React, { PropTypes } from 'react';
import autoBind from "react-autobind";
import Alert from "react-s-alert";
import history from '../history';
import { connect } from "react-redux";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import { demandSubmit } from './demand.store';
import './sponsor.css';


function judgeValue (label, val) {
  if(!val || !val.length) {
    Alert.error(`${label}不能为空`);
    return false;
  }
  return true;
}

class DemandSponsor extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {failed: tFailed, fetching: tFetching} = this.props.demandSubmitData;
    const {failed: nFailed, fetching: nFetching} = nextProps.demandSubmitData;
    if(!tFailed && tFetching && !nFailed && !nFetching) {
      Alert.success('提交成功');
      history.replace('/demand');
    }
  }

  onSubmit() {
    const {name, phone, category, title, content, village, addr} = this;
    if(!judgeValue('求助人', name.value) || !judgeValue('电话', phone.value) || !judgeValue('标题', title.value) || !judgeValue('求助信息', content.value) || !judgeValue('详细地址', addr.value)) {
      return;
    }
    if(!category.value || category.value == '-1') {
      Alert.error('请选择求助类别');
      return;
    }
    if(!village.value || village.value == '-1') {
      Alert.error('请选择服务地点');
      return;
    }
    const data = {
      name: name.value,
      phone: phone.value,
      category: category.value,
      title: title.value,
      content: content.value,
      village: village.value,
      addr: addr.value,
    }
    console.log(data);
    this.props.demandSubmit(data);
  }

  render() {
    const windowHeight = document.documentElement.clientHeight;
    const orgInfo = window.orgInfo;
    return(<div className="sponsor" style={{minHeight: `${windowHeight}px`}}>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">求助人</div>
        <input className="sponsor-line-ipt-value" ref={val => this.name = val} type="text" placeholder="输入姓名"/>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">电话</div>
        <input className="sponsor-line-ipt-value" ref={val => this.phone = val} type="text" placeholder="输入电话"/>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">求助类别</div>
        <select className="sponsor-line-ipt-value" ref={val => this.category = val} name="" id="">
          <option value ="-1">选择求助类别</option>
          {
            orgInfo.demand_category && orgInfo.demand_category.map((item, index)=>(          <option value={item} key={index}>{item}</option>))
          }
        </select>
        <i className="sponsor-icon-right-arrow"></i>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">需求标题</div>
        <input className="sponsor-line-ipt-value" ref={val => this.title = val} type="text" placeholder="输入需求标题"/>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line-textarea">
        <textarea className="sponsor-line-textarea-style" rows="5" ref={val => this.content = val} placeholder="输入求助信息详情（不超过250个字）"></textarea>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">服务地点</div>
        <select className="sponsor-line-ipt-value" ref={val => this.village = val} required name="" id="">
          <option value ="-1">选择服务地点</option>
          {
            orgInfo.demand_village && orgInfo.demand_village.map((item, index)=>(          <option value={item} key={index}>{item}</option>))
          }
        </select>
        <i className="sponsor-icon-right-arrow"></i>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="sponsor-line sponsor-line-ipt">
        <div className="sponsor-line-ipt-label">详细地址</div>
        <input className="sponsor-line-ipt-value" ref={val => this.addr = val} type="text" placeholder="输入详细服务地址"/>
      </div>
      <div className="sponsor-submit" onClick={this.onSubmit}>提交</div>
    </div>)
  }
}

DemandSponsor.propTypes = {
};

DemandSponsor.title = "求助申请";

export default connect(
  state => ({
    demandSubmitData: state.demand.demandSubmit,
  }),
  dispatch =>
    bindActionCreators(
      {
        demandSubmit
      },
      dispatch
    )
)(DemandSponsor);
