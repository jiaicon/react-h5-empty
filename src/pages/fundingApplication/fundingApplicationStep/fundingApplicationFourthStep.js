/* global wx:false */

/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
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

let count = 0;

class Form extends React.Component {
    static propTypes = {
        doAllActive: PropTypes.func
    };
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            formContent: [],
            html : []
        };
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
    }
    onAddActive=()=>{
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
    doHtml() {
        console.log(this.state.formContent);
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
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`projectNameAid__${item}`, {
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
                        {...getFieldProps(`start_time_aid__${item}`, {
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
                        disabled={getFieldProps(`start_time_aid__${item}`).value ? false : true}
                        minDate={new Date(+getFieldProps(`start_time_aid__${item}`).value)}
                        {...getFieldProps(`end_time_aid__${item}`, {
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
                            ...getFieldProps(`activeGoal__${item}`, {
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
                            ...getFieldProps(`bookPeopleNum__${item}`, {
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
                        {...getFieldProps(`applyReason__${item}`, {
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
        this.setState({
            html :formItems
        })
    }
    deleteThis(e) {
        let arr = this.state.formContent;
        let html = this.state.html;
        const index = arr.indexOf(Number(e.target.id));
        if(index > -1) {
            arr.splice(index, 1);
            html.splice(index, 1);
        }
        this.props.doAllActive(arr);
        this.setState({
            ...this.state,
            formContent: arr,
            html: html
        }, ()=>{
            this.doHtml();
        });
    }
    render() {

        return(
            <div>
                {this.state.html}
                <div className="addActive" onClick={this.onAddActive}><span style={{marginRight: '18px'}}>+</span><span>增加活动</span></div>
            </div>
        )
    }
}
const FormCreate = createForm()(Form);

class FundingApplication extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            serviceArea: window.serviceArea,
            serviceAreaValue: '',
            activeCount: 1,
            allActive: [],
            htmlContent: []
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
            let data = [];
            for(let j = 0; j < this.state.activeCount; j++) {
                let obj = {};
                for(let i in value) {
                    console.log(i.split('__')[1], j)
                    if(j+1 === Number(i.split('__')[1])) {
                        obj[i.split('__')[0]] = value[i];
                    }
                }
                data.push(obj);
            }
            console.log(data);
            location.href='/funding_application/step_four';
        });
    };

    onAddActive=()=>{
        this.props.form.validateFields((error, value) => {
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            let data = [];
            for(let j = 0; j < this.state.activeCount; j++) {
                let obj = {};
                for(let i in value) {
                    console.log(i.split('__')[1], j)
                    if(j+1 === Number(i.split('__')[1])) {
                        obj[i.split('__')[0]] = value[i];
                    }
                }
                data.push(obj);
            }
            console.log(data)

            this.setState({
                activeCount: this.state.activeCount+1
            })
        });
        let htmlContent = this.state.htmlContent;
        count+=1;
        htmlContent.push(count);
        console.log('htmlContent', htmlContent)
        this.setState({
            htmlContent: htmlContent
        })
    };
    onDeleteThis(num) {
        console.log(num);

    }
    renderBasic(num) {
        const { getFieldProps } = this.props.form;

        return <div className={classnames({
            'page-funding-application-allBox': num == this.state.activeCount
        })} key={num} data-index={num}>
            <div className="page-funding-application-item">
                <div className="page-funding-application-item-label page-funding-application-item-title"><div>项目执行计划（{num}）</div>{this.state.activeCount>1?<div data-index="1" onClick={(num)=>{this.this.onDeleteThis(num)}}>删除</div>:null}</div>
            </div>
            <div className="line1px"></div>
            <div className="page-funding-application-item">
                <div className="page-funding-application-item-label">活动名称</div>
                <InputItem
                    className="page-funding-application-input"
                    placeholder="请输入活动名称"
                    moneyKeyboardAlign="right"
                    {
                        ...getFieldProps(`projectNameAid__${num}`, {
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
                    {...getFieldProps(`start_time_aid__${num}`, {
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
                    disabled={getFieldProps(`start_time_aid__${num}`).value ? false : true}
                    minDate={new Date(+getFieldProps(`start_time_aid__${num}`).value)}
                    {...getFieldProps(`end_time_aid__${num}`, {
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
                        ...getFieldProps(`activeGoal__${num}`, {
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
                        ...getFieldProps(`bookPeopleNum__${num}`, {
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
                    {...getFieldProps(`applyReason__${num}`, {
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
    }
    deleteThisHtml(num) {
        console.log(this.state.htmlContent)
        console.log(num)
        let arr = this.state.htmlContent;
        arr.splice(num, 1);
        // ReactDOM.unmountComponentAtNode(document.getElementById(`id${num}`));
        this.setState({
            htmlContent: arr
        });
    }
    doAllActive(arr) {
        console.log(arr);
        this.setState({
            htmlContent: arr
        })
    }

    render() {
        return (
            <div className="page-funding-application">
                {
                    // activeCountArr.map((item, index)=>{
                    //     return this.renderBasic(item)
                    // })
                }
                <FormCreate
                    formContent={this.state.htmlContent}
                    doAllActive={this.doAllActive}
                />
                {/*<div className="addActive" onClick={this.onAddActive}><span style={{marginRight: '18px'}}>+</span><span>增加活动</span></div>*/}
                <div className="nextStep" onClick={this.onNextStep}>下一步，填写项目预算明细</div>
            </div>
        );
    }
}
const FundingApplicationForm = createForm()(FundingApplication);
FundingApplicationForm.propTypes = {

};
FundingApplication.title = '填写项目执行计划';
export default connect(
    dispatch => bindActionCreators({  }, dispatch),
)(FundingApplicationForm);

