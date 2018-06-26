/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { bindActionCreators } from 'redux';

import {List, Checkbox, DatePicker, Flex ,Stepper  } from 'antd-mobile';

import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/checkbox/style/css';
import 'antd-mobile/lib/Stepper/style/css';
import '../../my/profile/verifyAntd.css';
import './signUp.css';
import '../../my/profile/verify.css';
import {
    requestProjectDetail,
  } from '../detail/detail.store';
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
        extendsArray: {},
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
      this.props.requestProjectDetail(this.projectId)
    
  }
  componentWillReceiveProps(nextProps) {
    const {detail:Ldetail} =this.props;
    const {detail:Ndetail} =nextProps;
    if(Ndetail.data && Ndetail.data.custom_config){
        this.initialPic(Ndetail.data.custom_config);
        this.setState({
            ...this.state,
            customConfig:Ndetail.data.custom_config
        })
    }
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
                    onOk={v => ( this.setState({
                        ...this.state,
                        date: v
                    }), console.log(v), console.log(this.state))}
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
            <div className="page-my-profile-verify-header-box">
                <div className="page-my-profile-verify-fonts">选择时间</div>

                <DatePicker
                mode="time"
                value={this.state.begin}
                onChange={begin => this.setState({ ...this.state, begin })}
                onOk={v => ( this.setState({
                    ...this.state,
                    begin: v
                }), console.log(v), console.log(this.state))}
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
                            <CheckboxItem key="disabled" data-seed="logId"  key={i.key} disabled defaultChecked multipleLine>
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
                            <CheckboxItem key={i.key} onChange={() => this.onChange(i.key)}>
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
      </List>
    )
}
//单选控件
renderOtherInfoSelect(item) {
    const data = item;
    const key = data.key;
    const options = data.options.split(",");
    return (
        <div>
            <div className="page-my-profile-verify-header-box">
                {
                    item.is_required === 1 ?
                        <span className="page-my-profile-verify-header-start">*</span>
                        :
                        null
                }
                <div className="page-my-profile-verify-fonts">{data.label}</div>
                <label htmlFor={`${key}`}>
                    <select id={`${key}`} onChange={this.handleOtherInfoSelectClick}
                    >
                        <option value="-1"/>
                        {options.map((item1, keys) =>
                            <option value={item1} key={keys}>{item1}</option>)}
                    </select>
                </label>
            </div>
            <div className="line1px"/>
        </div>
    )
}

handleOtherInfoSelectClick(e) {
    const key = e.target.id;
    const value = e.target.value;
    this.pushExtendsArray(key, value);
}

//多选控件
handleOtherInfoMoreClick = (key, val) => {
    console.log(val);
    this.pushExtendsArray(key, val, true)
};

renderOtherInfoCheckbox(item1) {
    const CheckboxItem = Checkbox.CheckboxItem;
    let labels = item1.options.split(',');
    let data = [];
    labels.map((item, index) => {
        let obj = {};
        obj.value = index;
        obj.label = item;
        data.push(obj);
    });
    return (
        <div className="page-my-profile-other-title">
            {
                item1.is_required === 1 ?
                    <span className="page-my-profile-verify-header-start page-my-profile-verify-header-other-start">*</span>
                    :
                    null
            }
            <List renderHeader={() => item1.label}>
                {data.map(i => (
                    <CheckboxItem key={`${item1.key}${i.value}`} onChange={() => this.handleOtherInfoMoreClick(item1.key, i.label)}>
                        {i.label}
                    </CheckboxItem>
                ))}
            </List>
        </div>
    )
}

//单行
renderOtherInfoInput(item) {
    const data = item;
    const key = data.key;
    return (
        <div>
            <div>
                <div className="page-my-profile-verify-header-box">
                    {
                        item.is_required === 1 ?
                            <span className="page-my-profile-verify-header-start">*</span>
                            :
                            null
                    }
                    <div className="page-my-profile-verify-fonts">{data.label}</div>
                    <input id={`${key}`} className="page-my-profile-verify-text"
                           onChange={this.handleOtherInfoInputClick}/>
                </div>
                <div className="line1px"/>
            </div>
        </div>
    )
}

handleOtherInfoInputClick(e) {

    const key = e.target.id;
    const value = e.target.value;
    this.pushExtendsArray(key, value);
}

// 多行
renderOtherInfoManyInput(item) {
    const data = item;
    const key = data.key;
    return (

        <div>
            <div className="page-my-profile-verify-header-box">
                {
                    item.is_required === 1 ?
                        <span className="page-my-profile-verify-header-start">*</span>
                        :
                        null
                }
                <div className="page-my-profile-verify-fonts">{data.label}</div>
            </div>

            <textarea placeholder={`请输入${data.label}`}
                      id={`${key}`}
                      className="page-my-profile-edit-text" maxLength="200"
                      onKeyUp={this.handleOtherInfoManyInputClick}
            />

            <div className="line1px"/>
        </div>
    )
}

handleOtherInfoManyInputClick(e) {
    const key = e.target.id;
    const value = e.target.value;
    this.pushExtendsArray(key, value);
}

// 选择时间
renderOtherInfoDate(item) {
    const data = item;
    const key = data.key;
    return (
        <div>
            <div className="page-my-profile-verify-header-box">
                {
                    item.is_required === 1 ?
                        <span className="page-my-profile-verify-header-start">*</span>
                        :
                        null
                }
                <div className="page-my-profile-verify-fonts">{data.label}</div>

                <DatePicker
                    mode="date"
                    format="YYYY-MM-DD"
                    value={this.state[key]}
                    extra={`请选择${data.label}`}
                    onOk={v => (this.pushExtendsArray(key, formatDate(v)), this.setState({
                        ...this.state,
                        [key]: v
                    }), console.log(v), console.log(this.state))}
                >

                    <this.CustomChildren/>

                </DatePicker>

            </div>
            <div className="line1px"/>
        </div>
    )
}

renderOtherInfoDateTime(item) {
    const data = item;
    const key = data.key;
    return (
        <div>
            <div className="page-my-profile-verify-header-box">
                {
                    item.is_required === 1 ?
                        <span className="page-my-profile-verify-header-start">*</span>
                        :
                        null
                }
                <div className="page-my-profile-verify-fonts">{data.label}</div>
                <DatePicker
                    mode="datetime"
                    format="YYYY-MM-DD HH:mm"
                    value={this.state[key]}
                    extra={`请选择${data.label}`}
                    onOk={v => (this.pushExtendsArray(key, formatDate(v, true)), this.setState({
                        ...this.state,
                        [key]: v
                    }), console.log(v))}
                >

                    <this.CustomChildren/>
                </DatePicker>
            </div>
            <div className="line1px"/>
        </div>
    )
}
    // 初始化上传照片
    initialPic(data) {
        data.map((item, index) => {
            if (item.type == 5) {
                // this.state[item.key] = [];
                this.setState({
                    [item.key]: [],
                    ...this.state
                })
            }
        })

    }
// 上传图片
onPicClick(e) {
    var key = e.target.id;
    const attachment = this.state[key];
    // count: 3 - attachment.length,
    uploadToWX({

        success: (urls) => {
            if (urls.length == 1) {
                attachment.push(urls[0]);

            } else if (urls.length > 1) {
                for (var i = 0; i < urls.length; i++) {
                    attachment.push(urls[i]);
                }
            }
            // this.state[key] = attachment;
            this.setState({[key]: attachment, ...this.state});
            this.pushExtendsArray(key, attachment)
        },
    });
}

onPicDel(e) {

    const num = e.target.id;
    var key = e.target.getAttribute("data-key");
    const attachment = this.state[key];
    attachment.splice(num, 1);
    // this.state[key] = attachment;
    this.setState({[key]: attachment, ...this.state}),
        this.pushExtendsArray(key, attachment)
}

renderOtherPic(item) {
    const data = item;
    const key = data.key;
    return (
        <div className="page-my-profile-other-title">
            {
                item.is_required === 1 ?
                    <span
                        className="page-my-profile-verify-header-start page-my-profile-verify-header-other-pic-start">*</span>
                    :
                    null
            }
            <div className="page-my-profile-verify-header-box-pic-fonts">{data.label}</div>
            <div className="page-post-container-photo-container">
                {
                    this.state[key].map((item, keys) => (
                        <div className="page-applys-item-render-container">
                            <div className="page-applys-item-view">
                                <Avatar src={item} size={{width: 80, radius: 1}}/>
                            </div>
                            <div className="page-applys-item-render-del" onClick={this.onPicDel} id={keys}
                                 key={item}
                                 data-key={`${key}`}
                            />
                        </div>
                    ))
                }
                {
                    this.state[key].length === 1 ?
                        <div/> :
                        <div
                            className="page-post-item-upload-container" id={`${key}`} onClick={this.onPicClick}
                        />
                }
            </div>
            <div className="line1px"/>
        </div>
    )
}

/*
* 数组排序
* oldArr   标准的数组
* newArr   要排序的数组
* */
softArr(oldArr, newArr) {
    let softArr = [];
    oldArr.map(i => {
        newArr.map(k => {
            if (i === k) {
                softArr.push(k);
            }
        })
    });
    return softArr;
}

// push 数组
/*
* key 键
* value 值
* isMany 是否多选 true是 false否
* */
pushExtendsArray(key, value, isMany) {
    const extendsArray = this.state.extendsArray;
    const windowOrgConfig = this.state.customConfig;
    if (!isMany) {
        if (value == '-1') {
            if (key in extendsArray) {
                delete extendsArray[key];
            } else {
                return;
            }
        } else {
            extendsArray[key] = value;
        }
    } else {
        //多选
        if (key in extendsArray) {
           
            //判断多选选项是否已被选，有的话去掉
            if (extendsArray[key].indexOf(value) !== -1) {
                //已存在,需要排序
                let extendsArrays = extendsArray[key].split(',');
                let itemIndex = extendsArrays.indexOf(value);
                extendsArrays.splice(itemIndex, 1);
                if (extendsArrays.length <= 0) {
                    delete extendsArray[key];
                } else {
                    extendsArray[key] = extendsArrays.join(',');
                }
            } else {
                //没有被选择,需要排序.
                extendsArray[key] = String(extendsArray[key]) + ',' + value;
            }
            if (key in extendsArray && extendsArray[key].split(',').length > 1) {
                //长度大于1时进行排序
                windowOrgConfig.map(i => {
                    if (i.key === key) {
                        extendsArray[key] = this.softArr(i.options.split(','), extendsArray[key].split(',')).join(',');
                        return;
                    }
                })
            }
        } else {
            //不在多extendsArray里，直接添加。
            extendsArray[key] = value;
        }
    }
    console.log(extendsArray)
    this.setState({
        ...this.state,
        extendsArray,

    })
}

renderOtherInfo() {
    // const winOrgStateInfo = this.state.winOrgInfo;
    // const {data:{custom_config:winOrgStateInfo}} =this.props.detail;
 
    if(this.props.detail.data === null || this.props.detail.data.custom_config === null ){
        return null
    }
    return (
        <div>
            {
                this.props.detail.data.custom_config && this.props.detail.data.custom_config.length ?
                this.props.detail.data.custom_config.map((item, index) => {
                        switch (Number(item.type)) {//单项选择
                            case 1:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoSelect(item)}
                                    </div>
                                );
                                break;
                            //多项选择
                            case 2:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoCheckbox(item)}
                                    </div>
                                );
                                break;
                            //单行输入
                            case 3:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoInput(item)}
                                    </div>
                                );
                                break;
                            //多行输
                            case 4:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoManyInput(item)}
                                    </div>
                                );
                                break;

                            //上传图片
                            case 5:
                                return (
                                    <div key={index}>
                                        {this.renderOtherPic(item)}
                                    </div>
                                );
                                break;
                            //日期空间
                            case 6:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoDate(item)}
                                    </div>
                                );
                                break;
                            //日期时间空间
                            case 7:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoDateTime(item)}
                                    </div>
                                );
                                break;
                            default:
                                return
                        }

                    })
                    :
                    null
            }
        </div>
    )
}
  render() {
  


    return (
      <div className="page-project-signUp">
        {/* {this.renderOtherInfoInput()}
        {this.renderOtherInfoManyInput()}
        {this.renderOtherInfoDate()}
        {this.renderTime()} */}
         {
          //自定义信息
          this.renderOtherInfo()
        }
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

export default connect(
    state => ({
      detail: state.project.detail,
    
    }),
    dispatch => bindActionCreators({
      requestProjectDetail,
 
    }, dispatch),
  )(SignUpPage);