/* global wx:false */

/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Picker, List, InputItem, TextareaItem, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form'
import classnames from 'classnames';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import 'antd-mobile/lib/date-picker/style/css';
import './../fundingApplication.css';
import moment from 'moment';
import {DX} from './../../../utils/funcs';
import store from "../../../stores";
import { thirdStep } from './../fundingApplication.store';

class FundingApplication extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            serviceArea: window.serviceArea,
            serviceAreaValue: ''
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
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            // store.dispatch(thirdStep(value));
            console.log('open');
            localStorage.setItem('thirdStep', JSON.stringify(value));

            location.href='/funding_application/step_four';
        });
    };
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        console.log(getFieldProps('projectPrice'))

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
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">项目领域</div>
                        <Picker
                            data={this.state.serviceArea}
                            cols={1}
                            {
                                ...getFieldProps('project_field', {
                                    rules: [{
                                        required: true,
                                        message: '请选择资助项目项目领域',
                                    }],
                                })
                            }
                        >
                            <List.Item arrow="horizontal"></List.Item>
                        </Picker>
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
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
                    <div className="page-funding-application-item">
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
                            type="money"
                            className="page-funding-application-input"
                            placeholder="请输入资助项目总预算（保留两位小数）"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('project_money', {
                                    rules: [{
                                        required: true,
                                        message: '请输入项目总预算',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="page-funding-application-item-DX">{getFieldProps('project_money')&&getFieldProps('project_money').value&&getFieldProps('project_money').value.length>0 ? DX(getFieldProps('project_money').value):'此处自动显示项目总预算的大写数值'}</div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item-textarea">
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
                    <div className="page-funding-application-item-textarea">
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
                    <div className="page-funding-application-item-textarea">
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
                    <div className="page-funding-application-item-textarea">
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
            </div>
        );
    }
}
const FundingApplicationForm = createForm()(FundingApplication);
FundingApplicationForm.propTypes = {

};
FundingApplication.title = '填写资助项目信息';
export default connect(
    state=>({
        thirdStepData: state.fundingApplication.thirdStep
    }),
    dispatch => bindActionCreators({ thirdStep }, dispatch),
)(FundingApplicationForm);

