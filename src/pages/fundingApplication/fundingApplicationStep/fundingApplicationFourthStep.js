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
import store from "../../../stores";
import { fourthStep } from './../fundingApplication.store';
import './../eachStepStyle.css';
import Alert from "react-s-alert";


let count = 1;

class Form extends React.Component {
    static propTypes = {
        doAllActive: PropTypes.func,
    };
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            formContent: [1],
            html : []
        };
    }
    componentWillMount() {
        this.doHtml();
    }
    componentWillReceiveProps(nextProps) {
    }
    onAddActive=()=>{
        this.props.form.validateFields((error, value) => {
            // if(error) {
            //     console.log('error');
            //     return;
            // }
            let formContent = this.state.formContent;
            console.log(formContent)
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

    doHtml() {
        const { getFieldProps, getFieldValue } = this.props.form;
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
                <div className={classnames({
                    "page-funding-application-item": true,
                    "page-funding-application-item-picker": getFieldValue(`activity_start__${item}`) > 0
                })}>
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
                <div className={classnames({
                    "page-funding-application-item": true,
                    "page-funding-application-item-picker": getFieldValue(`activity_end__${item}`) > 0
                })}>
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
                        type="number"
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
                <div className={classnames({
                    "page-funding-application-item-textarea": true,
                    "page-funding-application-item-picker": getFieldValue(`activity_info__${item}`)&&getFieldValue(`activity_info__${item}`).length > 0
                })}>
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
    onNextStep = ()=>{
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            if (error) {
                let arr = ["activity_name",
                    "activity_start",
                    "activity_end",
                    "activity_objective",
                    "activity_people",
                    "activity_info",
                ];
                let errorMessage = '';
                for (let i = 0 ; i < count ; i++ ) {
                    for (let item_str of arr) {
                        let item = `${item_str}__${i+1}`;
                        if (error[item] && error[item].errors && error[item].errors.length) {
                            console.log(error[item].errors[0].message)
                            errorMessage = `项目执行计划(${i+1})中${error[item].errors[0].message}`;
                            break;
                        }
                    }
                    if (errorMessage.length)  break;
                }
            
                Alert.warning(errorMessage);
                return;
            }
            let data = [];
            let formContent = this.state.formContent;
            for(let j = 0; j < formContent.length; j++) {
                let obj = {};
                for(let i in value) {
                    if(formContent[j] === Number(i.split('__')[1])) {
                        obj[i.split('__')[0]] = value[i];
                    }
                }
                data.push(obj);
            }
            console.log(data);
            // store.dispatch(fourthStep(data));
            localStorage.setItem('fourthStep', JSON.stringify({plan: data}));

            // this.props.fourthStep(data);
            location.href='/funding_application/step_five';
        });
    };
    render() {
        return(
            <div>
                {this.doHtml()}
                <div className="addActive" onClick={this.onAddActive}><span style={{marginRight: '18px'}}>+</span><span>增加活动</span></div>
                <div className="nextStep" onClick={this.onNextStep}>下一步，填写项目预算明细</div>
            </div>
        )
    }
}
 const FormCreate = connect(
    state=>({
        fourthStepData: state.fundingApplication.fourthStep
    }),
    dispatch => bindActionCreators({ fourthStep }, dispatch),
)(createForm()(Form));


class FundingApplication extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
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
    doAllActive(arr) {
        console.log(arr);
        this.setState({
            htmlContent: arr
        })
    }
    render() {
        return (
            <div className="page-funding-application">
                <FormCreate
                    doAllActive={this.doAllActive}
                />
            </div>
        );
    }
}
const FundingApplicationForm = createForm()(FundingApplication);
FundingApplicationForm.propTypes = {

};
FundingApplicationForm.title = '填写项目执行计划';
// export default connect(
//     state=>({
//         fourthStepData: state.fundingApplication.fourthStep
//     }),
//     dispatch => bindActionCreators({ fourthStep }, dispatch),
// )(FundingApplicationForm);


export default FundingApplicationForm;
