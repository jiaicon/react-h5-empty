/* global wx:false */

/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Picker, List, InputItem, TextareaItem, DatePicker, Modal, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form'
import classnames from 'classnames';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/modal/style/css';
import 'antd-mobile/lib/checkbox/style/css';
import './../fundingApplication.css';
import './../eachStepStyle.css';
import moment from 'moment';
import {DX} from './../../../utils/funcs';
import store from "../../../stores";
import { thirdStep } from './../fundingApplication.store';
import Alert from "react-s-alert";

const CheckboxItem = Checkbox.CheckboxItem;

class FundingApplication extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        let serviceArea = window.serviceArea;
        serviceArea = serviceArea.map((item)=>{
            item.defaultChecked=false;
            return item;
        });
        this.state = {
            serviceArea: serviceArea,
            serviceAreaValue: '',
            modal_project_field: false,
            hasChooseArea: []
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }
    onTextChanged() {

    }
    onNextStep = ()=>{
        this.props.form.validateFields((error, value) => {
            // if(this.state.project_money_DX&&this.state.project_money_DX.length) {
            //     value.project_money = this.state.project_money_DX;
            // }else {
            //     error.project_money = {
            //         errors: [{
            //             field: "project_money",
            //             message: "请填写项目总预算"
            //         }]
            //     }
            // }
            // console.log(error, value);
            if (error) {
                let arr = ["project_name",
                    "project_field",
                    "project_start",
                    "project_end",
                    "project_addr",
                    "project_money",
                    "project_info",
                    "project_effect",
                    "project_object",
                    "project_resources"
                ];
                let errorMessage =  '';
                for (let item of arr) {
                    if (error[item] && error[item].errors && error[item].errors.length) {
                        console.log(error[item].errors[0].message)
                        errorMessage = error[item].errors[0].message;
                        break;
                    }
                }
                Alert.warning(errorMessage);
                return;
            }
            if(this.state.hasChooseArea.length>0) {
                value.project_field=this.state.hasChooseArea;
            }
            console.log(value);
            // if(value.project_field) {
            //     value.project_field=value.project_field[0]
            // }
            localStorage.setItem('thirdStep', JSON.stringify(value));

            location.href='/funding_application/step_four';
        });
    };
    openProjectFiled() {
        this.setState({
            modal_project_field: true
        })
    }
    onCloseModalProjectFiled() {
        console.log('close')
        this.setState({
            modal_project_field: false
        })
    }
    onChangeCheckbox = (val) => {
        console.log(val);
        let hasChooseArea = this.state.hasChooseArea;
        let serviceArea = this.state.serviceArea;
        serviceArea = serviceArea.map((item)=>{
            if(item.value == val) {
                item.defaultChecked=!item.defaultChecked
            }
            return item;
        });
        if(hasChooseArea.length>0) {
            let flag = false;
            for(let i = 0; i < hasChooseArea.length; i++) {
                if(hasChooseArea[i] == val) {
                    hasChooseArea.splice(i,1);
                    this.setState({
                        hasChooseArea: hasChooseArea,
                        serviceArea: serviceArea
                    });
                    return;
                }else {
                    flag=true;
                }
            }
            if(flag) {
                hasChooseArea.push(val);
            }
        }else {
            hasChooseArea.push(val);
        }
        this.setState({
            hasChooseArea: hasChooseArea,
            serviceArea: serviceArea
        })
    };
    projectMoneyChange() {
        if(this.state.project_money_DX&&this.state.project_money_DX.length) {
            this.setState({
                project_money_DX: Number(this.state.project_money_DX).toFixed(2)
            })
        }
    }

    renderModalHeader() {
        return <div className="renderModalHeader">
            <div className="renderModalHeader-left" onClick={this.onCloseModalProjectFiled}>取消</div>
            <div>选择服务领域</div>
            <div className="renderModalHeader-right" onClick={this.onCloseModalProjectFiled}>确定</div>
        </div>
    }
    render() {
        const { getFieldProps, getFieldValue,  } = this.props.form;

        return (
            <div className="page-funding-application">
                <div style={{marginBottom: '62px'}}>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">项目名称</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入资助项目项目名称"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('project_name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入资助项目项目名称',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className={classnames({
                        "page-funding-application-item": true,
                        "page-funding-application-item-picker": this.state.hasChooseArea.length>0
                    })}>
                        <div className="page-funding-application-item-label">项目领域</div>
                        <List renderHeader={()=>{
                            if(this.state.hasChooseArea.length>0) {
                                return this.state.hasChooseArea.join(',');
                            }else {
                                return'请选择项目领域';
                            }
                        }} onClick={this.openProjectFiled}/>
                    </div>
                    <div className="line1px"></div>
                    <div className={classnames({
                        "page-funding-application-item": true,
                        "page-funding-application-item-picker": getFieldValue('project_start') > 0
                    })}>
                        <div className="page-funding-application-item-label">实施开始时间</div>
                        <DatePicker
                            mode="date"
                            {...getFieldProps('project_start', {
                                rules: [
                                    { required: true, message: '请选择开始时间' },
                                ],
                            })}
                        >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                    </div>
                    <div className="line1px"></div>
                    <div className={classnames({
                        "page-funding-application-item": true,
                        "page-funding-application-item-picker": getFieldValue('project_end') > 0
                    })}>
                        <div className="page-funding-application-item-label">实施结束时间</div>
                        <DatePicker
                            mode="date"
                            disabled={getFieldProps('project_start').value ? false : true}
                            minDate={new Date(+getFieldProps('project_start').value)}
                            {...getFieldProps('project_end', {
                                rules: [
                                    { required: true, message: '请选择结束时间' },
                                ],
                            })}
                        >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">实施地点</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入实施地点"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('project_addr', {
                                    rules: [{
                                        required: true,
                                        message: '请输入资助项目实施地点',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">项目总预算</div>
                        <InputItem
                            type="digit"
                            className="page-funding-application-input"
                            placeholder="请输入资助项目总预算（保留两位小数）"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('project_money', {
                                    normalize: (v, prev) => {
                                        if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                            if (v === '.') {
                                                return '0.';
                                            }
                                            return prev;
                                        }
                                        return v;
                                    },
                                    rules: [{
                                        required: true,
                                        message: '请输入资助项目实施地点',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="page-funding-application-item-DX">{getFieldValue('project_money') ? DX(Number(getFieldValue('project_money'))):'此处自动显示项目总预算的大写数值'}</div>
                    <div className="line1px"></div>
                    <div className={classnames({
                        "page-funding-application-item-textarea": true,
                        "page-funding-application-item-picker": getFieldValue('project_info')&&getFieldValue('project_info').length > 0
                    })}>
                        <div className="page-funding-application-item-label-special">项目概述</div>
                        <TextareaItem
                            {...getFieldProps('project_info', {
                                rules: [{
                                    required: true,
                                    message: '请输入项目概述',
                                }],
                            })}
                            placeholder="简述项目针对问题，以及通过何种方式达到何种目标
（400字内）"
                            autoHeight
                            count={400}
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className={classnames({
                        "page-funding-application-item-textarea": true,
                        "page-funding-application-item-picker": getFieldValue('project_effect')&&getFieldValue('project_effect').length > 0
                    })}>
                        <div className="page-funding-application-item-label-special">项目实施成效</div>
                        <TextareaItem
                            {...getFieldProps('project_effect', {
                                rules: [{
                                    required: true,
                                    message: '请输入项目实施成效',
                                }],
                            })}
                            placeholder="项目实现后期望达成的具体成效（300字内）"
                            autoHeight
                            count={300}
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className={classnames({
                        "page-funding-application-item-textarea": true,
                        "page-funding-application-item-picker": getFieldValue('project_object')&&getFieldValue('project_object').length > 0
                    })}>
                        <div className="page-funding-application-item-label-special">项目收益对象</div>
                        <TextareaItem
                            {...getFieldProps('project_object', {
                                rules: [{
                                    required: true,
                                    message: '请输入项目收益对象',
                                }],
                            })}
                            placeholder="要求清晰界定本项目可以服务到的对象，并提供基数量、
基本特征、具体需求或问题状况等信息（400字内）"
                            autoHeight
                            count={400}
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className={classnames({
                        "page-funding-application-item-textarea": true,
                        "page-funding-application-item-picker": getFieldValue('project_resources')&&getFieldValue('project_resources').length > 0
                    })}>
                        <div className="page-funding-application-item-label-special">需要额外提供的资源</div>
                        <TextareaItem
                            {...getFieldProps('project_resources')}
                            placeholder="请描述需要额外提供的其他资源，如场地、志愿者等
（选填）"
                            autoHeight
                            count={400}
                        />
                    </div>
                    <div className="line1px"></div>
                </div>
                <div className="nextStep" onClick={this.onNextStep}>下一步，填写项目执行计划</div>
                <Modal
                    className="review-modal-css"
                    popup
                    platform="ios"
                    visible={this.state.modal_project_field}
                    animationType="slide-up"
                    onClose={this.onCloseModalProjectFiled}
                    afterClose={() => { console.log('afterClose'); }}
                    title={this.renderModalHeader()}
                >
                    <List className="popup-list">
                        {
                            this.state.serviceArea.map((item, index)=>(
                                <CheckboxItem
                                    key={index}
                                    defaultChecked={item.defaultChecked}
                                    onChange={()=>this.onChangeCheckbox(item.value)}
                                >
                                    {item.label}
                                </CheckboxItem>
                            ))
                        }
                    </List>
                </Modal>
            </div>
        );
    }
}
const FundingApplicationForm = createForm()(FundingApplication);
FundingApplicationForm.propTypes = {

};
FundingApplicationForm.title = '填写资助项目信息';
export default connect(
    state=>({
        thirdStepData: state.fundingApplication.thirdStep
    }),
    dispatch => bindActionCreators({ thirdStep }, dispatch),
)(FundingApplicationForm);

