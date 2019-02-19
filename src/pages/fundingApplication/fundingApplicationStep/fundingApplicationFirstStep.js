/* global wx:false */

/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Picker, List, InputItem, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form'
import classnames from 'classnames';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import './../fundingApplication.css';
import { getCity, getAreaProvince } from './../../home/home.store'
import { firstStep } from './../fundingApplication.store';


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
        this.props.getCity();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)

    }

    componentWillUnmount() {

    }
    onTextChanged() {

    }
    onNextStep = ()=>{
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            localStorage.setItem('firstStep', JSON.stringify(value));
            // store.dispatch(firstStep(value));
            console.log('open');
            location.href='/funding_application/step_two';
        });
    };
    provincePickerOk(val) {
        console.log(val);
        if(val.length) {
            this.props.getAreaProvince(val[0]);
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { cityData: { data: listData },areaData: { data: areaListData } } = this.props;
        let provinceList = listData&&listData.list.map((line)=>{
            return {
                label: line.name,
                value: line.name
            };
        });
        let areaList = areaListData&&areaListData.list.map((line)=>{
            return {
                label: line.name,
                value: line.name
            };
        });
        return (
            <div className="page-funding-application">
                <div style={{marginBottom: '62px'}}>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">申请人姓名</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入你的姓名"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('user_name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入申请人姓名',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">所属业务区域(省)</div>
                        <Picker
                            data={provinceList&&provinceList}
                            onOk={this.provincePickerOk}
                            cols={1}
                            {
                                ...getFieldProps('user_business_province', {
                                    rules: [{
                                        required: true,
                                        message: '请输入所属业务区域',
                                    }],
                                })
                            }
                        >
                            <List.Item arrow="horizontal"></List.Item>
                        </Picker>
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">所属业务区域(市)</div>
                        <Picker
                            data={areaList&&areaList}
                            cols={1}
                            {
                                ...getFieldProps('user_business_city', {
                                    rules: [{
                                        required: true,
                                        message: '请输入所属业务区域',
                                    }],
                                })
                            }
                        >
                            <List.Item arrow="horizontal"></List.Item>
                        </Picker>
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">所属门店（部门）</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入所属门店（部门）"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('user_store', {
                                    rules: [{
                                        required: true,
                                        message: '请输入所属门店（部门）',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">职位</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入职位"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('user_position', {
                                    rules: [{
                                        required: true,
                                        message: '请输入职位',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">工号</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入工号"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('user_job_num', {
                                    rules: [{
                                        required: true,
                                        message: '请输入工号',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">联系电话</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入联系电话"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('user_phone', {
                                    rules: [{
                                        required: true,
                                        message: '请输入联系电话',
                                    },{
                                        pattern: /^1[345678]\d{9}$/,
                                        message: '请输入正确格式的联系电话'
                                    }]
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">电子邮箱</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入电子邮箱"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('user_email', {
                                    rules: [{
                                        required: true,
                                        message: '请输入电子邮箱',
                                    },{
                                        type: 'email',
                                        message: '请输入正确格式的邮箱',
                                    }]
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item-textarea">
                        <div className="page-funding-application-item-label-special">申请理由</div>
                        <TextareaItem
                            {...getFieldProps('user_apply_rsason', {
                                rules: [{
                                    required: true,
                                    message: '请输入申请理由',
                                }],
                            })}
                            placeholder="请简要描述与该机构过去的合作，以及此次申请的理由（300字内）"
                            autoHeight
                            count={300}
                        />
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">申请金额</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入申请金额"
                            moneyKeyboardAlign="right"
                            type='money'
                            {
                                ...getFieldProps('user_apply_monry', {
                                    rules: [{
                                        required: true,
                                        message: '请输入申请金额',
                                    }],
                                })
                            }
                        />
                    </div>
                    <div className="line1px"></div>
                </div>
                 <div className="nextStep" onClick={this.onNextStep}>下一步，填写受益组织资料</div>
            </div>
        );
    }
}
const FundingApplicationForm = createForm()(FundingApplication);
FundingApplicationForm.propTypes = {

};
FundingApplicationForm.title = "填写申报人信息";
export default connect(
    state=>({
        firstStepData: state.fundingApplication.firstStep,
        cityData: state.home.getCity,
        areaData: state.home.getAreaProvince,
    }),
    dispatch => bindActionCreators({ firstStep, getCity, getAreaProvince }, dispatch),
)(FundingApplicationForm);
