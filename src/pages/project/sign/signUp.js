/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import classnames from 'classnames';


import '../../my/profile/verify.css';
import {List, Checkbox, DatePicker, Flex ,Stepper  } from 'antd-mobile';


import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/checkbox/style/css';
import 'antd-mobile/lib/Stepper/style/css';
import './signUp.css';
function formatDate(x, y) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const date = new Date(x);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (y) {
        return `${dateStr} ${timeStr}`;
    } else {
        return `${dateStr}`;
    }
}
const CheckboxItem = Checkbox.CheckboxItem;
class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.projectId = props.route.params.projectId;
    // this.lastId = props.route.params.lastId;
    this.state = {
        val:1
    };
    this.CustomChildren = ({extra, onClick}) => (

        <div
            onClick={onClick}
            style={{height: '40px', lineHeight: '40px', color: '#565656'}}
        >
        <span
            className="page-my-profile-verify-text page-my-profile-verify-text-lineheight"
        >
          {extra}</span>

        </div>
    );
  }

  componentWillMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    
  }
  componentWillDidmount() {

  }
  componentWillUnmount() {
    // document.title = '标题';
  }
  //单行
  renderOtherInfoInput() {

    return (
        <div>
            <div>
                <div className="page-my-profile-verify-header-box">

                    <div className="page-my-profile-verify-fonts">单行输入标题</div>
                    <input id='one' className="page-my-profile-verify-text"
                    placeholder={`请输入多行输入标题`}
                           onChange={this.handleOtherInfoInputClick}/>
                </div>
                <div className="line1px"/>
            </div>
        </div>
    )
}
handleOtherInfoInputClick(e) {
    
}

// 多行
renderOtherInfoManyInput() {
    return (

        <div>
            <div className="page-my-profile-verify-header-box">
                
                <div className="page-my-profile-verify-fonts">多行输入标题</div>
            </div>

            <textarea placeholder={`请输入多行输入标题`}
                      id='double'
                      className="page-my-profile-edit-text" maxLength="200"
                      onKeyUp={this.handleOtherInfoManyInputClick}
            />

            <div className="line1px"/>
        </div>
    )
}

handleOtherInfoManyInputClick(e) {
    // const key = e.target.id;
    // const value = e.target.value;
    // this.pushExtendsArray(key, value);
}
 // 选择日期
 renderOtherInfoDate() {
  
    return (
        <div>
            <div className="page-my-profile-verify-header-box">
               
                <div className="page-my-profile-verify-fonts">选择日期</div>

                <DatePicker
                    mode="date"
                    format="YYYY-MM-DD"
                    value={this.state.date}
                    extra={`请选择选择日期`}
                    onOk={v => (
                         this.setState({
                        ...this.state,
                        date: formatDate(v)
                    }))}
                >

                    <this.CustomChildren/>

                </DatePicker>

            </div>
            <div className="line1px"/>
        </div>
    )
}
// 选择时间
renderTime(){
    return(
        <div>
        <div className="page-doctor-publish-item-container">

            <DatePicker
            mode="time"
            value={this.state.begin}
            onChange={begin => this.setState({ ...this.state, begin })}
            >
            <this.CustomChildren/>

            </DatePicker>

        </div>
        <div className="line1px" />
        </div>
    )
}
onChange = (val) => {
    // console.log(val);
    this.setState({ val });
  }
// 多选
renderOrder (){
    const data = [ 
        {   value: 0, 
            label: '志多星公益T恤',
            key: "test1",
            amount:100.00,
            is_required:1,
        },
        {   value: 1, 
            label: '志多星公益短裤',
            key: "test2",
            amount:100.00,
            is_required:0,
        },
        {   value: 2, 
            label: '志多星公益帽子',
            key: "test3",
            amount:100.00,
            is_required:0,
        }
    ];
    return(
        <List>
            {
                data.map((i,index)=>{
                    return(
                        <div>
                        {
                            i.is_required? 
                            <CheckboxItem key="disabled" data-seed="logId"  key={i.value} disabled defaultChecked multipleLine>
                               <div>{i.label}</div>
                               <div className="page-singnuo-checkbox-container">
                                  <span className="page-singnuo-checkbox-money">¥{i.amount}</span>
                                  <List>
                                    <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                        style={{ width: '100%', minWidth: '100px' }}
                                        showNumber
                                        max={10}
                                        min={1}
                                        value={this.state.val}
                                        onChange={this.onChange}
                                        />}
                                    >
                                    </List.Item>
                                    
                                </List>
                               </div>
                            </CheckboxItem>:
                            <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                                 <div>{i.label}</div>
                               <div className="page-singnuo-checkbox-container">
                                  <span className="page-singnuo-checkbox-money">¥{i.amount}</span>
                                  <List>
                                    <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                        style={{ width: '100%', minWidth: '100px' }}
                                        showNumber
                                        max={10}
                                        min={1}
                                        value={this.state.val}
                                        onChange={this.onChange}
                                        />}
                                    >
                                    </List.Item>
                                    
                                </List>
                               </div>
                            </CheckboxItem>
                        }

                        </div>
                    )
                })
            }
            {/* {data.map(i => (
                {
                    i.is_required? 
                    <CheckboxItem key="disabled" data-seed="logId"  key={i.value} disabled defaultChecked multipleLine>
                    {i.label}
                    </CheckboxItem>:
                    <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                    {i.label}
                </CheckboxItem>
                }
           
              </div>
            ))
            } */}
      </List>
    )
}
  render() {
  


    return (
      <div className="page-project-signUp">
        {this.renderOtherInfoInput()}
        {this.renderOtherInfoManyInput()}
        {this.renderOtherInfoDate()}
        {this.renderTime()}
        {this.renderOrder()}
      </div>
    );
  }
}

SignUpPage.propTypes = {
  requestProjectDetail: PropTypes.func,
  feelingAction: PropTypes.func,
  collectProject: PropTypes.func,
  unCollectProject: PropTypes.func,
  joinProject: PropTypes.func,
  saveProjectTabIndex: PropTypes.func,
  requestUserInfo: PropTypes.func,
  quitProject: PropTypes.func,
  detail: PropTypes.shape({
    fetchingId: PropTypes.string,
    data: PropTypes.shape({}),
    tabIndex: PropTypes.number,
  }),
  user: PropTypes.shape({
    isLogin: PropTypes.bool,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
};

SignUpPage.title = '报名信息';

export default SignUpPage