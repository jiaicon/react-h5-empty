/* global wx:false */

/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accordion, List, Picker, InputItem, TextareaItem, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'antd-mobile/lib/accordion/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import 'antd-mobile/lib/date-picker/style/css';
import {DX} from './../../../utils/funcs';

import UploadPhoto from './../../../components/uploadPhoto/uploadPhoto';

import './../fundingApplication.css';
import './preview.css';
import classnames from 'classnames';
import moment from 'moment';

import { getCity, getAreaProvince } from './../../home/home.store';
import { fundingApplicationPost } from './../fundingApplication.store';
let count=1;
let countBudget=1;
const budgetType = [
    {
        label: '活动成本',
        value: '活动成本'
    },
    {
        label: '管理成本',
        value: '管理成本'
    },
    {
        label: '服务费',
        value: '服务费'
    }
];
let doCountArr = function (count) {
    let formContent = [];
    if(count > 1) {
        for(let i = 1; i <= count; i++) {
            formContent.push(i);
        }
        return formContent;
    }else {
        return [1];
    }
};
class Preview extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            previewData: {},
            stepDisabled1: true,
            stepDisabled2: true,
            stepDisabled3: true,
            stepDisabled4: true,
            stepDisabled5: true,
            serviceArea: window.serviceArea,
            serviceAreaValue: '',
            formContent: [],
            html : [],
            formContentBudget: [],
            htmlBudget : []
        };
    }

    componentWillMount() {
        this.props.getCity();
        let allData = {
            ...JSON.parse(localStorage.getItem('firstStep')),
            ...JSON.parse(localStorage.getItem('secondStep')),
            ...JSON.parse(localStorage.getItem('thirdStep')),
            ...JSON.parse(localStorage.getItem('fourthStep')),
            ...JSON.parse(localStorage.getItem('fifthStep')),
        };
        count = JSON.parse(localStorage.getItem('fourthStep')).plan&&JSON.parse(localStorage.getItem('fourthStep')).plan.length;
        countBudget = JSON.parse(localStorage.getItem('fifthStep')).budget&&JSON.parse(localStorage.getItem('fifthStep')).budget.length;

        this.setState({
            previewData: allData,
            formContent: doCountArr(count),
            formContentBudget: doCountArr(countBudget),
        })
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const { fetching: tFetch, failed: tFailed } = this.props.fundingApplicationData;
        const { fetching: nFetch, failed: nFailed } = nextProps.fundingApplicationData;
        if(tFetch && !tFailed && !nFetch && !nFailed) {
            console.log('提交成功');
            location.href='/my';
        }
    }

    componentWillUnmount() {

    }
    deleteThis(e) {
        let arr = this.state.formContent;
        let html = this.state.html;
        const index = arr.indexOf(Number(e.target.id));
        if(index > -1) {
            arr.splice(index, 1);
            html.splice(index, 1);
        }
        // this.props.doAllActive(arr);
        this.setState({
            ...this.state,
            formContent: arr,
            html: html
        }, ()=>{
            this.doHtml();
        });
    }
    deleteBudgetThis(e) {
        let arr = this.state.formContentBudget;
        let html = this.state.htmlBudget;
        const index = arr.indexOf(Number(e.target.id));
        if(index > -1) {
            arr.splice(index, 1);
            html.splice(index, 1);
        }
        // this.props.doAllActive(arr);
        this.setState({
            ...this.state,
            formContentBudget: arr,
            htmlBudget: html
        }, ()=>{
            this.doHtmlBudget();
        });
    }
    doHtml() {
        let fourthStep = JSON.parse(localStorage.getItem('fourthStep'));
        const { getFieldProps } = this.props.form;
        const formItems = this.state.formContent.length > 0 ? this.state.formContent.map((item, index)=>(
            <div className={classnames({
                'page-funding-application-allBox': index == this.state.formContent.length
            })} key={item} data-index={item}>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label page-funding-application-item-title"><div>项目执行计划（{index+1}）</div>{this.state.formContent.length>1?<div id={item} onClick={(e)=>{this.deleteThis(e)}}>删除</div>:null}</div>
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">活动名称</div>
                    <InputItem
                        className="page-funding-application-input"
                        placeholder="请输入活动名称"
                        disabled={this.state.stepDisabled4}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`activity_name__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入活动名称',
                                }],
                            })
                        }
                    />
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">活动开始时间</div>
                    <DatePicker
                        mode="date"
                        {...getFieldProps(`activity_start__${item}`, {
                            rules: [
                                { required: true, message: '请选择活动开始时间' },
                            ],
                        })}
                    >
                        <List.Item arrow="horizontal"></List.Item>
                    </DatePicker>
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">活动结束时间</div>
                    <DatePicker
                        mode="date"
                        disabled={getFieldProps(`activity_start__${item}`).value ? false : true}
                        minDate={new Date(+getFieldProps(`activity_start__${item}`).value)}
                        {...getFieldProps(`activity_end__${item}`, {
                            rules: [
                                { required: true, message: '请选择活动结束时间' },
                            ],
                        })}
                    >
                        <List.Item arrow="horizontal"></List.Item>
                    </DatePicker>
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">活动目的</div>
                    <InputItem
                        className="page-funding-application-input"
                        placeholder="请输入活动目的"
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`activity_objective__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入活动目的',
                                }],
                            })
                        }
                    />
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">预估受益人数</div>
                    <InputItem
                        className="page-funding-application-input"
                        placeholder="请输入预估受益人数"
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`activity_people__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入预估受益人数',
                                }],
                            })
                        }
                    />
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item-textarea">
                    <div className="page-funding-application-item-label-special">申请理由</div>
                    <TextareaItem
                        {...getFieldProps(`activity_info__${item}`, {
                            rules: [{
                                required: true,
                                message: '请输入申请理由',
                            }],
                        })}
                        placeholder="包括活动形式、地点、参与人数等"
                        autoHeight
                    />
                </div>
                <div className="line1px"></div>
            </div>
        )) : <div></div>;
        return formItems;
    }
    doHtmlBudget() {
        const { getFieldProps } = this.props.form;
        const formItems = this.state.formContentBudget.length > 0 ? this.state.formContentBudget.map((item, index)=>(
            <div className={classnames({
                'page-funding-application-allBox': index == this.state.formContentBudget.length
            })} key={item} data-index={item}>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label page-funding-application-item-title"><div>项目预算明细（{index+1}）</div>{this.state.formContentBudget.length>1?<div id={item} onClick={(e)=>{this.deleteBudgetThis(e)}}>删除</div>:null}</div>
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">预算类型</div>
                    <Picker
                        data={budgetType}
                        cols={1}
                        disabled={this.state.stepDisabled5}
                        {
                            ...getFieldProps(`budget_type__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入预算类型',
                                }],
                            })
                        }
                    >
                        <List.Item arrow="horizontal"></List.Item>
                    </Picker>
                </div>
                <div className="page-funding-application-item-DX" style={{textAlign: 'left'}}>注：活动成本（指开展活动必须的物料、交通、人员等）管理成本（指开展活动必需的行政成本等，不得超过10%）</div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">预算用途</div>
                    <InputItem
                        className="page-funding-application-input"
                        placeholder="请输入预算用途"
                        disabled={this.state.stepDisabled5}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_purpose__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入预算用途',
                                }],
                            })
                        }
                    />
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">单价</div>
                    <InputItem
                        type="money"
                        className="page-funding-application-input"
                        placeholder="请输入单价（保留2位小数）"
                        disabled={this.state.stepDisabled5}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_price__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入单价',
                                }],
                            })
                        }
                    />
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">数量</div>
                    <InputItem
                        className="page-funding-application-input"
                        placeholder="请输入预算预计购买数量"
                        disabled={this.state.stepDisabled5}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_num__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入预算预计购买数量',
                                }],
                            })
                        }
                    />
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">金额</div>
                    <InputItem
                        type="money"
                        className="page-funding-application-input"
                        placeholder="请输入金额"
                        disabled={this.state.stepDisabled5}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_money__${item}`, {
                                rules: [{
                                    required: true,
                                    message: '请输入金额',
                                }],
                            })
                        }
                    />
                </div>
                <div className="page-funding-application-item-DX">{getFieldProps(`budget_money__${item}`)&&getFieldProps(`budget_money__${item}`).value&&getFieldProps(`budget_money__${item}`).value.length>0 ? DX(getFieldProps(`budget_money__${item}`).value):'此处自动显示项目总预算的大写数值'}</div>
                <div className="line1px"></div>
            </div>
        )) : <div></div>;
        return formItems;
    }


    provincePickerOk(val) {
        console.log(val);
        if(val.length) {
            this.props.getAreaProvince(val[0]);
        }
    }
    alertFirstStep(e) {
        let obj = {
            stepDisabled1: true,
            stepDisabled2: true,
            stepDisabled3: true,
            stepDisabled4: true,
            stepDisabled5: true,
        };
        for(let i = 1; i <= 5; i++) {
            if(Number(e.target.getAttribute('data-id')) === i) {
                obj[`stepDisabled${e.target.getAttribute('data-id')}`]= false;
            }
        }
        this.setState({
            ...obj
        }, ()=>{
            // this.inputRef.focus();
        });
    }
    saveFirstStep(e) {
        console.log(e.target.getAttribute('data-id'))
        this.setState({
            [`stepDisabled${e.target.getAttribute('data-id')}`]: true
        });
        this.props.form.validateFields((error, value) => {
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            console.log(value);
        });
    }
    onPhotoChange(images) {
        console.log(images);
        this.setState({
            imagesArr: images.map(item=>item.url)
        })
    }
    onAddActive=()=>{
        this.props.form.validateFields((error, value) => {
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            let formContent = this.state.formContent;
            count+=1;
            formContent.push(count);
            this.setState({
                ...this.state,
                formContent: formContent
            }, ()=>{
                this.doHtml();
            });
        });
    };
    onAddBudgetActive() {
        this.props.form.validateFields((error, value) => {
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            let formContent = this.state.formContentBudget;
            console.log(formContent)
            console.log(count)
            countBudget+=1;
            formContent.push(countBudget);
            this.setState({
                ...this.state,
                formContentBudget: formContent
            }, ()=>{
                this.doHtmlBudget();
            });
        });
    }
    onSubmitInfo() {
        this.props.form.validateFields((error, value) => {
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            let formContentData = [];
            let formContentBudgetData = [];
            let formContent = this.state.formContent;
            let formContentBudget = this.state.formContentBudget;
            for(let j = 0; j < formContent.length; j++) {
                let obj = {};
                for(let i in value) {
                    if(formContent[j] === Number(i.split('__')[1])&&i.split('_')[0]==='activity') {
                        obj[i.split('__')[0]] = value[i];
                        if(i.indexOf('activity_start') > -1 || i.indexOf('activity_end') > -1) {
                            obj[i.split('__')[0]] = moment(value[i]).format('YYYY-MM-DD');
                        }
                    }

                }
                formContentData.push(obj);
            }
            for(let j = 0; j < formContentBudget.length; j++) {
                let obj = {};
                for(let i in value) {
                    if(formContentBudget[j] === Number(i.split('__')[1])&&i.split('_')[0]==='budget') {
                        obj[i.split('__')[0]] = value[i];
                    }
                }
                formContentBudgetData.push(obj);
            }
            // if(value.budget_reason) {
            //     data.budget_reason = value.budget_reason;
            // }
            for(let i in value) {
                if(i==='project_start' || i==='project_end') {
                    value[i] = moment(value[i]).format('YYYY-MM-DD');
                }
            }
            value.plan=formContentData;
            value.budget=formContentBudgetData;
            console.log('allData::::', value);
            this.props.fundingApplicationPost(value);
        });
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
            <div className="page-funding-application-preview">
                <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="申请人信息">
                        <div className="page-funding-application">
                            <div style={{marginBottom: '62px'}}>
                                <div className="page-funding-application-item" style={{justifyContent: 'flex-end'}}>
                                    {
                                        this.state.stepDisabled1 ?
                                            <div data-id="1" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                            :
                                            <div data-id="1" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>
                                    }
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">申请人姓名</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入你的姓名"
                                        ref={el=> this.inputRef = el}
                                        moneyKeyboardAlign="right"
                                        disabled={this.state.stepDisabled1}
                                        {
                                            ...getFieldProps('user_name', {
                                                initialValue: this.state.previewData&&this.state.previewData.user_name
                                            },{
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                                        disabled={this.state.stepDisabled1}
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
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="受益组织资料" className="pad">
                        <div className="page-funding-application">
                            <div style={{marginBottom: '62px'}}>
                                <div className="page-funding-application-item" style={{justifyContent: 'flex-end'}}>
                                    {
                                        this.state.stepDisabled2 ?
                                            <div data-id="2" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                            :
                                            <div data-id="2" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>
                                    }
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">组织名称</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入收益组织名称"
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_name', {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入收益组织名称',
                                                }],
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">统一社会信用代码</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入统一社会信用代码（选填）"
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="group_credit_num"
                                        {
                                            ...getFieldProps('projectPosition')
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">组织地址</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入受益组织地址"
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_addr', {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入受益组织地址',
                                                }],
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">法人／负责人</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入受益组织法人／负责人姓名"
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_legal_person', {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入受益组织法人／负责人姓名',
                                                }],
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">联系人</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入受益组织联系人姓名"
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_user', {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入受益组织联系人姓名',
                                                }],
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">联系人电话</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入受益组织联系人电话"
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_user_phone', {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入受益组织联系人电话',
                                                },{
                                                    pattern: /^1[345678]\d{9}$/,
                                                    message: '请输入正确格式的联系电话'
                                                }],
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">联系人邮箱</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入联系人邮箱"
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_user_email', {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入联系人邮箱',
                                                },{
                                                    type: 'email',
                                                    message: '请输入正确格式的联系人邮箱',
                                                }]
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">服务领域</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入服务领域"
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_service', {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入服务领域',
                                                }]
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item-textarea">
                                    <div className="page-funding-application-item-label-special">组织简介</div>
                                    <TextareaItem
                                        {...getFieldProps('group_info', {
                                            rules: [{
                                                required: true,
                                                message: '请输入组织简介',
                                            }],
                                        })}
                                        disabled={this.state.stepDisabled2}
                                        placeholder="请简要描述该机构的目标和愿景，开展的主要项目，
资质等（300字内）"
                                        autoHeight
                                        count={300}
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item-textarea">
                                    <div className="page-funding-application-item-label-special">登记证书（选填）</div>
                                    <UploadPhoto  onChange={this.onPhotoChange} multiple={true} length={3}/>
                                </div>
                                <div className="line1px"></div>
                            </div>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="资助项目信息" className="pad">
                        <div className="page-funding-application">
                            <div style={{marginBottom: '62px'}}>
                                <div className="page-funding-application-item" style={{justifyContent: 'flex-end'}}>
                                    {
                                        this.state.stepDisabled3 ?
                                            <div data-id="3" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                            :
                                            <div data-id="3" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>
                                    }
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">项目名称</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入资助项目项目名称"
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={getFieldProps('project_start').value ? this.state.stepDisabled3 : true}
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
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={this.state.stepDisabled3}
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
                                        disabled={this.state.stepDisabled3}
                                        {...getFieldProps('project_resources')}
                                        placeholder="请描述需要额外提供的其他资源，如场地、志愿者等
（选填）"
                                        autoHeight
                                        count={400}
                                    />
                                </div>
                                <div className="line1px"></div>
                            </div>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="项目执行计划" className="pad">
                        <div className="page-funding-application-item" style={{justifyContent: 'flex-end'}}>
                            {
                                this.state.stepDisabled4 ?
                                    <div data-id="4" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                    :
                                    <div data-id="4" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>
                            }
                        </div>
                        <div className="line1px"></div>
                        {this.doHtml()}
                        <div className="addActive" onClick={this.onAddActive}><span style={{marginRight: '18px'}}>+</span><span>增加活动</span></div>
                    </Accordion.Panel>
                    <Accordion.Panel header="项目预算明细" className="pad">
                        <div className="page-funding-application-item" style={{justifyContent: 'flex-end'}}>
                            {
                                this.state.stepDisabled5 ?
                                    <div data-id="5" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                    :
                                    <div data-id="5" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>
                            }
                        </div>
                        <div className="line1px"></div>

                        {this.doHtmlBudget()}
                        <div className="page-funding-application-item-textarea">
                            <div className="page-funding-application-item-label-special">说明</div>
                            <TextareaItem
                                {...getFieldProps(`budget_reason`)}
                                placeholder="简述预算理由（选填）"
                                autoHeight
                            />
                        </div>
                        <div className="addActive" onClick={this.onAddBudgetActive}><span style={{marginRight: '18px'}}>+</span><span>增加预算项目</span></div>
                    </Accordion.Panel>
                </Accordion>

                <div className="nextStep" onClick={this.onSubmitInfo}>填写完成，提交申请</div>
            </div>
        );
    }
}
const PreviewForm = createForm()(Preview);
PreviewForm.propTypes = {

};
PreviewForm.title = '预览申请信息';
export default connect(
    state=>({
        cityData: state.home.getCity,
        areaData: state.home.getAreaProvince,
        fundingApplicationData: state.fundingApplication.fundingApplicationPost
    }),
    dispatch => bindActionCreators({ getCity, getAreaProvince, fundingApplicationPost }, dispatch),
)(PreviewForm);

