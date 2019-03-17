/* global wx:false */

/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accordion, List, Picker, InputItem, TextareaItem, DatePicker, Checkbox, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'antd-mobile/lib/accordion/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/checkbox/style/css';
import 'antd-mobile/lib/modal/style/css';
import {DX,getQueryString} from './../../../utils/funcs';

import UploadPhoto from './../../../components/uploadPhoto/uploadPhoto';

import './../fundingApplication.css';
import './preview.css';
import classnames from 'classnames';
import moment from 'moment';

import { getCity, getAreaProvince } from './../../home/home.store';
import { fundingApplicationPost, resubmitApply, revokeApply } from './../fundingApplication.store';
let count=1;
let countBudget=1;
let scrollTop = 0;
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
const CheckboxItem = Checkbox.CheckboxItem;

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
        let serviceArea = window.serviceArea;
        serviceArea = serviceArea.map((item)=>{
            item.defaultChecked=false;
            return item;
        });
        this.state = {
            previewData: {},
            stepDisabled1: true,
            stepDisabled2: true,
            stepDisabled3: true,
            stepDisabled4: true,
            stepDisabled5: true,
            modal_project_field: false,
            imagesArr: [],
            hasChooseArea: [],
            serviceArea: serviceArea,
            serviceAreaValue: '',
            formContent: [],
            html : [],
            formContentBudget: [],
            htmlBudget : [],
            alertBtn: getQueryString('isHasApply')&&getQueryString('isHasApply').length>0 ? false : true,
            openAccordion: 0,   //当前打开的手风琴
        };
    }

    componentWillMount() {
        this.props.getCity();
        let allData = {};
        if(getQueryString('isHasApply')&&getQueryString('isHasApply').length>0) {
            //已提交的申请
            let allApplyData = JSON.parse(localStorage.getItem('applyData')).list;
            allApplyData.map(item=>{
                if(item.id == getQueryString('isHasApply')) {
                    allData = item;

                    allData.plan=item.plan;
                    if(allData.budget&&allData.budget.length>0) {
                        allData.budget = item.budget.map((line, idx) => {
                            if (line.budget_type) {
                                line.budget_type = [line.budget_type];
                            }
                            return line;
                        });
                    }
                    allData.user_business_province = [item.user_business_province];
                    allData.project_field = item.project_field;
                    allData.user_business_city = [item.user_business_city];
                    if(allData.user_business_province.length) {
                        this.props.getAreaProvince(allData.user_business_province[0]);
                    }
                    count = allData.plan.length;
                    countBudget = allData.budget.length;
                }
            });
        }else {
             allData = {
                ...JSON.parse(localStorage.getItem('firstStep')),
                ...JSON.parse(localStorage.getItem('secondStep')),
                ...JSON.parse(localStorage.getItem('thirdStep')),
                ...JSON.parse(localStorage.getItem('fourthStep')),
                ...JSON.parse(localStorage.getItem('fifthStep')),
            };
             if(allData.budget&&allData.budget.length>0) {
                 allData.budget = allData.budget.map((line, idx)=>{
                     if(line.budget_type) {
                         line.budget_type = [line.budget_type];
                     }
                     return line;
                 });
             }
            allData.user_business_province = [allData.user_business_province];
            allData.user_business_city = [allData.user_business_city];
            allData.project_field = allData.project_field;
            if(allData.user_business_province.length) {
                this.props.getAreaProvince(allData.user_business_province[0]);
            }
            count = JSON.parse(localStorage.getItem('fourthStep')).plan&&JSON.parse(localStorage.getItem('fourthStep')).plan.length;
            countBudget = JSON.parse(localStorage.getItem('fifthStep')).budget&&JSON.parse(localStorage.getItem('fifthStep')).budget.length;
        }
        console.log(allData);

        this.setState({
            previewData: allData,
            imagesArr: allData.group_certificate || [],
            formContent: doCountArr(count),
            formContentBudget: doCountArr(countBudget),
            hasChooseArea: allData.project_field,
            serviceArea: this.concatArray(this.state.serviceArea, allData.project_field)
        })
    }
    concatArray(arr1, arr2) {
        if(arr2.length>0) {
            arr1.map(item=>{
                arr2.map(line=>{
                    if(item.value == line) {
                        item.defaultChecked = true;
                    }
                })
            });
        }
        return arr1;
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScrollHandle);
    }

    componentWillReceiveProps(nextProps) {
        const { fetching: tFetch, failed: tFailed } = this.props.fundingApplicationData;
        const { fetching: nFetch, failed: nFailed } = nextProps.fundingApplicationData;
        const { fetching: rtFetch, failed: rtFailed } = this.props.resubmitApplyData;
        const { fetching: rnFetch, failed: rnFailed } = nextProps.resubmitApplyData;

        const { fetching: revokerFetch, failed: revokerFailed } = this.props.revokeApplyData;
        const { fetching: revokenFetch, failed: revokenFailed } = nextProps.revokeApplyData;
        if(tFetch && !tFailed && !nFetch && !nFailed) {
            console.log('提交成功');
            location.replace('/my');
        }
        if(rtFetch && !rtFailed && !rnFetch && !rnFailed) {
            console.log('提交成功');
            location.replace('/my');
        }
        if(revokerFetch && !revokerFailed && !revokenFetch && !revokenFailed) {
            console.log('撤销成功');
            location.replace('/my');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollHandle);
    }
    onScrollHandle() {
        scrollTop = window.scrollY;
    }
    iPhoneBlur() {
        window.scroll(0, scrollTop || 0);
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
        // console.log(this.state.formContent);
        const formItems = this.state.formContent.length > 0 ? this.state.formContent.map((item, index)=>(
            <div className={classnames({
                'page-funding-application-allBox': index == this.state.formContent.length
            })} key={item} data-index={item}>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label page-funding-application-item-title"><div>项目执行计划（{index+1}）</div>{this.state.alertBtn&&this.state.formContent.length>1?<div id={item} onClick={(e)=>{this.deleteThis(e)}}>删除</div>:null}</div>
                </div>
                <div className="line1px"></div>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label">活动名称</div>
                    <InputItem
                        className="page-funding-application-input"
                        placeholder="请输入活动名称"
                        onBlur={this.iPhoneBlur}
                        disabled={this.state.stepDisabled4}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`activity_name__${item}`, {
                                initialValue: this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan.length>index ? this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan[index].activity_name : null,
                                rules: [{
                                    required: true,
                                    message: '请输入活动名称',
                                }],
                            })
                        }
                    />
                </div>
                <div className="line1px"></div>
                <div className={classnames({
                    "page-funding-application-item": true,
                    "page-funding-application-item-disabled-color": !this.state.stepDisabled4
                })}>
                    <div className="page-funding-application-item-label">活动开始时间</div>
                    <DatePicker
                        mode="date"
                        {...getFieldProps(`activity_start__${item}`, {
                            initialValue: this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan.length>index ? this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan[index].activity_start&&new Date(this.state.previewData.plan[index].activity_start) : null,
                            rules: [
                                { required: true, message: '请选择活动开始时间' },
                            ],
                        })}
                    >
                        <List.Item arrow="horizontal"></List.Item>
                    </DatePicker>
                </div>
                <div className="line1px"></div>
                <div className={classnames({
                    "page-funding-application-item": true,
                    "page-funding-application-item-disabled-color": !this.state.stepDisabled4
                })}>
                    <div className="page-funding-application-item-label">活动结束时间</div>
                    <DatePicker
                        mode="date"
                        disabled={getFieldProps(`activity_start__${item}`).value ? false : true}
                        minDate={new Date(+getFieldProps(`activity_start__${item}`).value)}
                        {...getFieldProps(`activity_end__${item}`, {
                            initialValue: this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan.length>index ? this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan[index].activity_end&&new Date(this.state.previewData.plan[index].activity_end) : null,
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
                        onBlur={this.iPhoneBlur}
                        disabled={this.state.stepDisabled4}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`activity_objective__${item}`, {
                                initialValue: this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan.length>index ? this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan[index].activity_objective : null,
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
                        onBlur={this.iPhoneBlur}
                        disabled={this.state.stepDisabled4}
                        moneyKeyboardAlign="right"
                        type="number"
                        {
                            ...getFieldProps(`activity_people__${item}`, {
                                initialValue: this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan.length>index ? this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan[index].activity_people : null,
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
                            initialValue: this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan.length>index ? this.state.previewData&&this.state.previewData.plan&&this.state.previewData.plan[index].activity_info : null,
                            rules: [{
                                required: true,
                                message: '请输入申请理由',
                            }],
                        })}
                        onBlur={this.iPhoneBlur}
                        rows="4"
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
                    <div className="page-funding-application-item-label page-funding-application-item-title"><div>项目预算明细（{index+1}）</div>{!this.state.stepDisabled5&&this.state.formContentBudget.length>1?<div id={item} onClick={(e)=>{this.deleteBudgetThis(e)}}>删除</div>:null}</div>
                </div>
                <div className="line1px"></div>
                <div className={classnames({
                    "page-funding-application-item": true,
                    "page-funding-application-item-disabled-color": !this.state.stepDisabled5
                })}>
                    <div className="page-funding-application-item-label">预算类型</div>
                    <Picker
                        data={budgetType}
                        cols={1}
                        disabled={this.state.stepDisabled5}
                        {
                            ...getFieldProps(`budget_type__${item}`, {
                                initialValue: this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_type : [],
                                rules: [{
                                    required: true,
                                    message: '请选择预算类型',
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
                        onBlur={this.iPhoneBlur}
                        disabled={this.state.stepDisabled5}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_purpose__${item}`, {
                                initialValue: this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_purpose : null,
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
                        onBlur={this.iPhoneBlur}
                        disabled={this.state.stepDisabled5}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_price__${item}`, {
                                normalize: (v, prev) => {
                                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                        if (v === '.') {
                                            return '0.';
                                        }
                                        return prev;
                                    }
                                    return v;
                                },
                                onChange: (val)=>{
                                    if (val && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(val)) {
                                        if (val === '.') {
                                            val= '0.';
                                        }
                                        val = `${val.split('.')[0]}.${val.split('.')[1].substring(0, 2)}`;
                                    }
                                    console.log(val)
                                    let money = getFieldProps(`budget_num__${item}`).value ?
                                        getFieldProps(`budget_num__${item}`).value : this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_num : 0;
                                    this.setState({
                                        [`budget_money__${item}`]: (Number(val) * Number(money)).toFixed(2)
                                    })
                                },
                                initialValue: this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_price : null,
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
                        type="digit"
                        className="page-funding-application-input"
                        placeholder="请输入预算预计购买数量"
                        onBlur={this.iPhoneBlur}
                        disabled={this.state.stepDisabled5}
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_num__${item}`, {
                                onChange: (val)=>{
                                    let money = getFieldProps(`budget_price__${item}`).value ?
                                        getFieldProps(`budget_price__${item}`).value : this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_price : 0;
                                    this.setState({
                                        [`budget_money__${item}`]: (Number(val) * Number(money)).toFixed(2)
                                    })
                                },
                                initialValue: this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_num : null,
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
                        className="page-funding-application-input"
                        placeholder="请输入金额"
                        onBlur={this.iPhoneBlur}
                        disabled={true}
                        value={this.state[`budget_money__${item}`] ? this.state[`budget_money__${item}`] : ((this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? Number(this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_price) : 0) * (this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? Number(this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_num) : 0))}
                        moneyKeyboardAlign="right"
                    />
                </div>
                <div className="page-funding-application-item-DX">{
                    this.state[`budget_money__${item}`] ? DX(Number(this.state[`budget_money__${item}`])) : DX(((this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? Number(this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_price) : 0) * (this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget.length>index ? Number(this.state.previewData&&this.state.previewData.budget&&this.state.previewData.budget[index].budget_num) : 0)))
                    }</div>
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
    alertFirstStep=(e)=> {
        e.stopPropagation();
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
        e.stopPropagation();
        this.setState({
            [`stepDisabled${e.target.getAttribute('data-id')}`]: true
        });
    }
    onPhotoChange(images) {
        console.log(images.length);
        if(images.length<=0) {
            this.setState({
                imagesArr: []
            });
            return;
        }
        this.setState({
            imagesArr: images.map(item=>item.url)
        })
    }
    onAddActive=()=>{
        if(!this.state.alertBtn||this.state.stepDisabled4) {
            return;
        }
        let formContent = this.state.formContent;
        count+=1;
        formContent.push(count);
        this.setState({
            ...this.state,
            formContent: formContent
        }, ()=>{
            this.doHtml();
        });
    };
    onAddBudgetActive=()=> {
        console.log(this)
        if(!this.state.alertBtn || this.state.stepDisabled5) {
            return;
        }
        let formContent = this.state.formContentBudget;
        countBudget+=1;
        formContent.push(countBudget);
        this.setState({
            ...this.state,
            formContentBudget: formContent
        }, ()=>{
            this.doHtmlBudget();
        });
    }
    //撤销
    onRevokeThis() {
        if(getQueryString('isHasApply')&&getQueryString('isHasApply').length>0) {
            this.props.revokeApply({id: getQueryString('isHasApply'), status: 3});
        }
    }
    //重新提交
    onreSubmitThis() {
        if(getQueryString('isHasApply')&&getQueryString('isHasApply').length>0) {
            this.props.revokeApply({id: getQueryString('isHasApply'), status: 0});
        }
    }
    //修改后提交
    onreSubmitThisDefault() {
        this.doValue((value)=>{
            if(getQueryString('isHasApply')&&getQueryString('isHasApply').length>0) {
                this.props.revokeApply({id: getQueryString('isHasApply'), status: 0, ...value});
            }
        });
    }

    doValue(callback) {
        this.props.form.validateFields((error, value) => {
            if(error) {
                console.log('error', error);
                alert('存在未填写信息，请填写后重试');
                return;
            }
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
            console.log(this.state)
            for(let j = 0; j < formContentBudget.length; j++) {
                let obj = {};
                for(let i in value) {
                    if(formContentBudget[j] === Number(i.split('__')[1])&&i.split('_')[0]==='budget') {
                        // value[i] = value[i];
                        obj[i.split('__')[0]] = value[i];
                    }
                }

                for(let m = 0; m < this.state.previewData.budget.length;m++) {
                    obj.budget_money = this.state.previewData.budget[m].budget_money
                }
                for(let m in this.state) {
                    if(formContent[j] === Number(m.split('__')[1])) {
                        obj[m.split('__')[0]] = this.state[m];
                    }
                }
                formContentBudgetData.push(obj);
            }
            for(let i in value) {
                if(i==='project_start' || i==='project_end') {
                    value[i] = moment(value[i]).format('YYYY-MM-DD');
                }
            }
            value.plan=JSON.stringify(formContentData);
            value.budget=JSON.stringify(formContentBudgetData);
            if(this.state.hasChooseArea.length>0) {
                value.project_field=this.state.hasChooseArea;
            }else {
                let serviceArea = this.state.serviceArea;
                let hasChooseArea = [];
                serviceArea.map(item=>{
                    if(item.defaultChecked) hasChooseArea.push(item.value)
                });
                value.project_field = hasChooseArea;
            }
            value.group_certificate=[];
            if(this.state.imagesArr.length>0) {
                value.group_certificate = this.state.imagesArr;
            }
            value.user_business_province = value.user_business_province[0];
            value.user_business_city = value.user_business_city[0];
            console.log('allData::::', value);
            if(callback&&typeof callback === 'function') {
                callback(value);
            }
        });
    }
    onSubmitInfo() {
        this.doValue((value)=>{
            if(getQueryString('isHasApply')&&getQueryString('isHasApply').length>0) {
                //修改后再提交的
                value.id=getQueryString('isHasApply');
                this.props.resubmitApply(value);
            }else {
                this.props.fundingApplicationPost(value);
            }
        });
    }
    alertBtn() {
        this.setState({
            alertBtn: !this.state.alertBtn
        })
    }
    openProjectFiled() {
        if(!this.state.alertBtn||this.state.stepDisabled3) {
            return;
        }
        let hasChooseArea = this.state.hasChooseArea;
        let serviceArea = this.state.serviceArea;
        if(!hasChooseArea.length) {
            serviceArea.map(item=>{
                item.defaultChecked = false;
            })
        }else {
            for(let i = 0; i < serviceArea.length;i++) {
                let flag = false;
                for(let j = 0; j<hasChooseArea.length;j++) {
                    if(serviceArea[i].value == hasChooseArea[j]) {
                        //存在相等的  已选择
                        flag = true;
                    }
                }
                if(flag) {
                    serviceArea[i].defaultChecked = true;
                }else {
                    serviceArea[i].defaultChecked = false;
                }
            }
        }

        this.setState({
            ...serviceArea,
            modal_project_field: true,
        })
    }
    onCloseModalProjectFiled() {
        console.log('close')
        this.setState({
            modal_project_field: false
        })
    }
    onChangeCheckbox = (val) => {
        let {hasChooseArea: hasChoose, serviceArea: serviceArea} = this.state;
        serviceArea.map((item)=>{
            if(item.value == val) {
                item.defaultChecked=!item.defaultChecked
            }
            return item;
        });
        if(hasChoose.length>0) {
            for(let i = 0; i < hasChoose.length; i++) {
                if(hasChoose[i] == val) {
                    this.setState({
                        serviceArea: serviceArea
                    });
                    return;
                }
            }

        }
        this.setState({
            serviceArea: serviceArea
        })
    };
    addChooseProjectFiled() {
        let serviceArea = this.state.serviceArea;
        let hasChooseArea = [];
        serviceArea.map(item=>{
            if(item.defaultChecked) hasChooseArea.push(item.value)
        });
        this.setState({
            hasChooseArea: hasChooseArea,
            modal_project_field: false
        })
    }
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
            <div className="renderModalHeader-right" onClick={this.addChooseProjectFiled}>确定</div>
        </div>
    }
    renderFirstTitle() {
        ()=>{
            return <div className="page-funding-application-item" style={{justifyContent: 'flex-end'}}>
                <div>申请人信息</div>
            </div>
        }
    }
    //点击手风琴，事件，保存了当前打开的openAccordion = 0;，并滚动到当前
    onAccordionChange(key) {
        if(key != undefined) {
            window.scroll(0, key * 44, 0);
            console.log(key)
            this.setState({
                openAccordion: key
            })
        }else {
            this.setState({
                openAccordion: -1,
                stepDisabled1: true,
                stepDisabled2: true,
                stepDisabled3: true,
                stepDisabled4: true,
                stepDisabled5: true,
            })
        }
    }
    render() {
        const { getFieldProps, getFieldValue } = this.props.form;
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
            <div className="page-funding-application-preview" style={{paddingBottom: 44}}>
                <Accordion accordion defaultActiveKey="0" openAnimation={{}} className="my-accordion" onChange={this.onAccordionChange}>
                    <Accordion.Panel header={<div className="page-funding-application-header">
                        <div>申请人信息</div>
                        {
                            this.state.alertBtn && this.state.openAccordion == 0 ?
                                (this.state.stepDisabled1 ?
                                    <div data-id="1" className="page-funding-application-item-label" style={{position: 'relative', zIndex: '99999'}} onClick={this.alertFirstStep}>修改</div>
                                    :
                                    <div data-id="1" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>)
                                :null
                        }
                    </div>}>
                        <div className="page-funding-application">
                            <div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">申请人姓名</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入你的姓名"
                                        ref={el=> this.inputRef = el}
                                        moneyKeyboardAlign="right"
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled1}
                                        {
                                            ...getFieldProps('user_name', {
                                                initialValue: this.state.previewData&&this.state.previewData.user_name,
                                                    rules: [{
                                                        required: true,
                                                        message: '请输入申请人姓名',
                                                    }]
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className={classnames({
                                    "page-funding-application-item": true,
                                    "page-funding-application-item-disabled-color": !this.state.stepDisabled1
                                })}
                                >
                                    <div className="page-funding-application-item-label">所属业务区域(省)</div>
                                    <Picker
                                        data={provinceList&&provinceList}
                                        onOk={this.provincePickerOk}
                                        disabled={this.state.stepDisabled1}
                                        cols={1}
                                        {
                                            ...getFieldProps('user_business_province',{
                                                initialValue: this.state.previewData&&this.state.previewData.user_business_province,
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
                                <div className={classnames({
                                    "page-funding-application-item": true,
                                    "page-funding-application-item-disabled-color": !this.state.stepDisabled1
                                })}>
                                    <div className="page-funding-application-item-label">所属业务区域(市)</div>
                                    <Picker
                                        data={areaList&&areaList}
                                        cols={1}
                                        disabled={this.state.stepDisabled1}
                                        {
                                            ...getFieldProps('user_business_city',{
                                                initialValue: this.state.previewData&&this.state.previewData.user_business_city,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled1}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('user_store',{
                                                initialValue: this.state.previewData&&this.state.previewData.user_store,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled1}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('user_position',{
                                                initialValue: this.state.previewData&&this.state.previewData.user_position,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled1}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('user_job_num',{
                                                initialValue: this.state.previewData&&this.state.previewData.user_job_num,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled1}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('user_phone',{
                                                initialValue: this.state.previewData&&this.state.previewData.user_phone,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入联系电话',
                                                },{
                                                    pattern: /^[0-9|-]*$/,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled1}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('user_email',{
                                                initialValue: this.state.previewData&&this.state.previewData.user_email,
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
                                <div className={classnames({
                                    "page-funding-application-item-textarea": true,
                                    "page-funding-application-item-textarea-disabled-color": !this.state.stepDisabled1
                                })}>
                                    <div className="page-funding-application-item-label-special">申请理由</div>
                                    <TextareaItem
                                        {...getFieldProps('user_apply_rsason', {
                                            initialValue: this.state.previewData&&this.state.previewData.user_apply_rsason,
                                            rules: [{
                                                required: true,
                                                message: '请输入申请理由',
                                            }],
                                        })}
                                        disabled={this.state.stepDisabled1}
                                        placeholder="请简要描述与该机构过去的合作，以及此次申请的理由（300字内）"
                                        onBlur={this.iPhoneBlur}
                                        rows="4"
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled1}
                                        moneyKeyboardAlign="right"
                                        type='digit'
                                        {
                                            ...getFieldProps('user_apply_monry', {
                                                normalize: (v, prev) => {
                                                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                                        if (v === '.') {
                                                            return '0.';
                                                        }
                                                        return prev;
                                                    }
                                                    return v;
                                                },
                                                initialValue: this.state.previewData&&this.state.previewData.user_apply_monry,
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
                    <Accordion.Panel header={<div className="page-funding-application-header">
                        <div>受益组织资料</div>
                        {
                            this.state.alertBtn && this.state.openAccordion == 1 ?
                                (this.state.stepDisabled2 ?
                                    <div data-id="2" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                    :
                                    <div data-id="2" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>)
                                :null
                        }
                    </div>} className="pad">
                        <div className="page-funding-application">
                            <div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">组织名称</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入收益组织名称"
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_name', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_name,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_credit_num', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_credit_num
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">组织地址</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入受益组织地址"
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_addr', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_addr,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_legal_person', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_legal_person,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_user', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_user,
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
                                        type="number"
                                        className="page-funding-application-input"
                                        placeholder="请输入受益组织联系人电话"
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_user_phone', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_user_phone,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入受益组织联系人电话',
                                                },{
                                                    pattern: /^[0-9|-]*$/,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_user_email', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_user_email,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled2}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('group_service', {
                                                initialValue: this.state.previewData&&this.state.previewData.group_service,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入服务领域',
                                                }]
                                            })
                                        }
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className={classnames({
                                    "page-funding-application-item-textarea": true,
                                    "page-funding-application-item-textarea-disabled-color": !this.state.stepDisabled2
                                })}>
                                    <div className="page-funding-application-item-label-special">组织简介</div>
                                    <TextareaItem
                                        {...getFieldProps('group_info', {
                                            initialValue: this.state.previewData&&this.state.previewData.group_info,
                                            rules: [{
                                                required: true,
                                                message: '请输入组织简介',
                                            }],
                                        })}
                                        disabled={this.state.stepDisabled2}
                                        placeholder="请简要描述该机构的目标和愿景，开展的主要项目，
资质等（300字内）"
                                        onBlur={this.iPhoneBlur}
                                        rows="4"
                                        autoHeight
                                        count={300}
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className="page-funding-application-item-textarea">
                                    <div className="page-funding-application-item-label-special">登记证书（选填）</div>
                                    <UploadPhoto defaultPhoto={this.state.previewData&&this.state.previewData.group_certificate} selectable={this.state.alertBtn&&!this.state.stepDisabled2 ? true : false}  onChange={this.onPhotoChange} multiple={true} length={3}/>
                                </div>
                                <div className="line1px"></div>
                            </div>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header={<div className="page-funding-application-header">
                        <div>资助项目信息</div>
                        {
                            this.state.alertBtn  && this.state.openAccordion == 2 ?
                                (this.state.stepDisabled3 ?
                                    <div data-id="3" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                    :
                                    <div data-id="3" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>)
                                :null
                        }
                    </div>} className="pad">
                        <div className="page-funding-application">
                            <div>
                                <div className="page-funding-application-item">
                                    <div className="page-funding-application-item-label">项目名称</div>
                                    <InputItem
                                        className="page-funding-application-input"
                                        placeholder="请输入资助项目项目名称"
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled3}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('project_name', {
                                                initialValue: this.state.previewData&&this.state.previewData.project_name,
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
                                    "page-funding-application-item-disabled-default-color": !this.state.stepDisabled3
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
                                    "page-funding-application-item-disabled-color": !this.state.stepDisabled3
                                })}>
                                    <div className="page-funding-application-item-label">实施开始时间</div>
                                    <DatePicker
                                        mode="date"
                                        disabled={this.state.stepDisabled3}
                                        {...getFieldProps('project_start', {
                                            initialValue: this.state.previewData&&this.state.previewData.project_start&&new Date(this.state.previewData.project_start),
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
                                    "page-funding-application-item-disabled-color": !this.state.stepDisabled3
                                })}>
                                    <div className="page-funding-application-item-label">实施结束时间</div>
                                    <DatePicker
                                        mode="date"
                                        disabled={getFieldProps('project_start').value ? this.state.stepDisabled3 : true}
                                        minDate={new Date(+getFieldProps('project_start').value)}
                                        {...getFieldProps('project_end', {
                                            initialValue: this.state.previewData&&this.state.previewData.project_end&&new Date(this.state.previewData.project_end),
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled3}
                                        moneyKeyboardAlign="right"
                                        {
                                            ...getFieldProps('project_addr', {
                                                initialValue: this.state.previewData&&this.state.previewData.project_addr,
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
                                        onBlur={this.iPhoneBlur}
                                        disabled={this.state.stepDisabled3}
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
                                                initialValue: this.state.previewData&&this.state.previewData.project_money,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入资助项目实施地点',
                                                }],
                                            })
                                        }
                                    />
                                </div>
                                <div className="page-funding-application-item-DX">{this.state.previewData&&this.state.previewData.project_money ? DX(this.state.previewData.project_money): getFieldValue('project_money') ? Number(Number(getFieldValue('project_money'))) : '此处自动显示项目总预算的大写数值'}</div>
                                <div className="line1px"></div>
                                <div className={classnames({
                                    "page-funding-application-item-textarea": true,
                                    "page-funding-application-item-textarea-disabled-color": !this.state.stepDisabled3
                                })}>
                                    <div className="page-funding-application-item-label-special">项目概述</div>
                                    <TextareaItem
                                        disabled={this.state.stepDisabled3}
                                        {...getFieldProps('project_info', {
                                            initialValue: this.state.previewData&&this.state.previewData.project_info,
                                            rules: [{
                                                required: true,
                                                message: '请输入项目概述',
                                            }],
                                        })}
                                        placeholder="简述项目针对问题，以及通过何种方式达到何种目标
（400字内）"
                                        onBlur={this.iPhoneBlur}
                                        rows="4"
                                        autoHeight
                                        count={400}
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className={classnames({
                                    "page-funding-application-item-textarea": true,
                                    "page-funding-application-item-textarea-disabled-color": !this.state.stepDisabled3
                                })}>
                                    <div className="page-funding-application-item-label-special">项目实施成效</div>
                                    <TextareaItem
                                        {...getFieldProps('project_effect', {
                                            initialValue: this.state.previewData&&this.state.previewData.project_effect,
                                            rules: [{
                                                required: true,
                                                message: '请输入项目实施成效',
                                            }],
                                        })}
                                        disabled={this.state.stepDisabled3}
                                        placeholder="项目实现后期望达成的具体成效（300字内）"
                                        autoHeight
                                        onBlur={this.iPhoneBlur}
                                        rows="4"
                                        count={300}
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className={classnames({
                                    "page-funding-application-item-textarea": true,
                                    "page-funding-application-item-textarea-disabled-color": !this.state.stepDisabled3
                                })}>
                                    <div className="page-funding-application-item-label-special">项目收益对象</div>
                                    <TextareaItem
                                        {...getFieldProps('project_object', {
                                            initialValue: this.state.previewData&&this.state.previewData.project_object,
                                            rules: [{
                                                required: true,
                                                message: '请输入项目收益对象',
                                            }],
                                        })}
                                        disabled={this.state.stepDisabled3}
                                        placeholder="要求清晰界定本项目可以服务到的对象，并提供基数量、
基本特征、具体需求或问题状况等信息（400字内）"
                                        autoHeight
                                        onBlur={this.iPhoneBlur}
                                        rows="4"
                                        count={400}
                                    />
                                </div>
                                <div className="line1px"></div>
                                <div className={classnames({
                                    "page-funding-application-item-textarea": true,
                                    "page-funding-application-item-textarea-disabled-color": !this.state.stepDisabled3
                                })}>
                                    <div className="page-funding-application-item-label-special">需要额外提供的资源</div>
                                    <TextareaItem
                                        disabled={this.state.stepDisabled3}
                                        {...getFieldProps('project_resources', {
                                            initialValue: this.state.previewData&&this.state.previewData.project_resources
                                        })}
                                        placeholder="请描述需要额外提供的其他资源，如场地、志愿者等
（选填）"
                                        onBlur={this.iPhoneBlur}
                                        rows="4"
                                        autoHeight
                                        count={400}
                                    />
                                </div>
                                <div className="line1px"></div>
                            </div>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header={<div className="page-funding-application-header">
                        <div>项目执行计划</div>
                        {
                            this.state.alertBtn && this.state.openAccordion == 3 ?
                                (this.state.stepDisabled4 ?
                                    <div data-id="4" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                    :
                                    <div data-id="4" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>)
                                :null
                        }
                    </div>} className="pad">
                        {this.doHtml()}
                        {
                            !this.state.stepDisabled4 ? <div className="addActive" onClick={this.onAddActive}><span style={{marginRight: '18px'}}>+</span><span>增加活动</span></div> : null
                        }
                    </Accordion.Panel>
                    <Accordion.Panel header={<div className="page-funding-application-header">
                        <div>项目预算明细</div>
                        {
                            this.state.alertBtn && this.state.openAccordion == 4 ?
                                (this.state.stepDisabled5 ?
                                    <div data-id="5" className="page-funding-application-item-label" onClick={this.alertFirstStep}>修改</div>
                                    :
                                    <div data-id="5" className="page-funding-application-item-label" onClick={this.saveFirstStep}>保存</div>)
                                :null
                        }
                    </div>} className="pad">
                        {this.doHtmlBudget()}
                        <div className="page-funding-application-item-textarea">
                            <div className="page-funding-application-item-label-special">说明</div>
                            <TextareaItem
                                {...getFieldProps(`budget_reason`, {
                                    initialValue: this.state.previewData&&this.state.previewData.budget_reason
                                })}
                                onBlur={this.iPhoneBlur}
                                rows="4"
                                placeholder="简述预算理由（选填）"
                                autoHeight
                            />
                        </div>
                        {
                            !this.state.stepDisabled5 ? <div className="addActive" onClick={this.onAddBudgetActive}><span style={{marginRight: '18px'}}>+</span><span>增加预算明细</span></div> : null
                        }
                    </Accordion.Panel>
                </Accordion>
                {
                    this.state.previewData&&this.state.previewData.status != 1 ? <div className="submitBtn">
                        <div onClick={this.alertBtn}>{this.state.alertBtn ? '取消修改' : '修改' }</div>

                        {
                            this.state.alertBtn&&this.state.previewData&&this.state.previewData.status == 0 ? <div onClick={this.onSubmitInfo}>提交</div> : (this.state.previewData.status == 3 ? <div onClick={this.onreSubmitThis}>再次提交</div> : <div onClick={this.onRevokeThis}>撤销</div>)
                        }
                    </div>:null
                }

                {
                    getQueryString('isHasApply')&&getQueryString('isHasApply').length>0 ? null : <div className="nextStep" onClick={this.onSubmitInfo}>填写完成，提交申请</div>
                }
                <Modal
                    className="review-modal-css"
                    popup
                    visible={this.state.modal_project_field}
                    animationType="slide-up"
                    onClose={this.onCloseModalProjectFiled}
                    title={this.renderModalHeader()}
                    afterClose={() => { console.log('afterClose'); }}
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
const PreviewForm = createForm()(Preview);
PreviewForm.propTypes = {

};
PreviewForm.title = '预览申请信息';
export default connect(
    state=>({
        cityData: state.home.getCity,
        areaData: state.home.getAreaProvince,
        fundingApplicationData: state.fundingApplication.fundingApplicationPost,
        resubmitApplyData: state.fundingApplication.resubmitApply,
        revokeApplyData: state.fundingApplication.revokeApply,
    }),
    dispatch => bindActionCreators({ getCity, getAreaProvince, fundingApplicationPost, resubmitApply, revokeApply }, dispatch),
)(PreviewForm);

