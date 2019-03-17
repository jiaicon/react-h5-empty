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
import {DX} from './../../../utils/funcs';
import store from "../../../stores";
import { fifthStep, secondStep, fourthStep, fundingApplicationPost } from './../fundingApplication.store';
import './../eachStepStyle.css';
import Alert from "react-s-alert";

let count = 1;
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
class Form extends React.Component {
    static propTypes = {
        doAllActive: PropTypes.func,
        fifthStep: PropTypes.func,
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
        // const { check: Ccheck } = this.props;
        // const { check: Ncheck } = nextProps;
        // const { login: cLogin } = this.props;
        // const { login: nLogin } = nextProps;
        // const { fetching: tFetch, failed: tFailed } = this.props.fundingApplicationData.fundingApplicationPost;
        // const { fetching: nFetch, failed: nFailed } = nextProps.fundingApplicationData.fundingApplicationPost;
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
        const { getFieldProps, getFieldValue, setFieldsValue } = this.props.form;
        const formItems = this.state.formContent.length > 0 ? this.state.formContent.map((item, index)=>(
            <div className={classnames({
                'page-funding-application-allBox': index == this.state.formContent.length
            })} key={item} data-index={item}>
                <div className="page-funding-application-item">
                    <div className="page-funding-application-item-label page-funding-application-item-title"><div>项目预算明细（{index+1}）</div>{this.state.formContent.length>1?<div id={item} onClick={(e)=>{this.deleteThis(e)}}>删除</div>:null}</div>
                </div>
                <div className="line1px"></div>
                <div className={classnames({
                    "page-funding-application-item": true,
                    "page-funding-application-item-picker": getFieldValue(`budget_type__${item}`) && getFieldValue(`budget_type__${item}`).length > 0
                })}>
                    <div className="page-funding-application-item-label" style={{width: '100px'}}>预算类型</div>
                    <Picker
                        style={{width: '100%'}}
                        data={budgetType}
                        cols={1}
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
                        type="digit"
                        className="page-funding-application-input"
                        placeholder="请输入单价（保留2位小数）"
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_price__${item}`, {
                                onChange: (val)=>{
                                    this.setState({
                                        [`budget_money__${item}`]: (Number(val) * Number(getFieldProps(`budget_num__${item}`).value)).toFixed(2)
                                    })
                                },
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
                        moneyKeyboardAlign="right"
                        {
                            ...getFieldProps(`budget_num__${item}`, {
                                onChange: (val)=>{
                                    this.setState({
                                        [`budget_money__${item}`]: (Number(val) * Number(getFieldProps(`budget_price__${item}`).value)).toFixed(2)
                                    })
                                },
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
                        type="digit"
                        className="page-funding-application-input page-funding-application-ipt"
                        placeholder="此处自动显示本项预算的小写金额"
                        disabled={true}
                        moneyKeyboardAlign="right"
                        value={this.state[`budget_money__${item}`]}
                        style={{color: '#000'}}
                    />
                </div>
                <div className="page-funding-application-item-DX">{this.state[`budget_money__${item}`] ? <span style={{color: '#000'}}>{DX(this.state[`budget_money__${item}`], '此处自动显示本项预算的大写金额')}</span>:'此处自动显示本项预算的大写金额'}</div>
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
                let arr = ["budget_type",
                    "budget_purpose",
                    "budget_price",
                    "budget_num",
                    "budget_money",
                ];
                let errorMessage = '';
                for (let i = 0 ; i < count ; i++ ) {
                    for (let item_str of arr) {
                        let item = `${item_str}__${i+1}`;
                        if (error[item] && error[item].errors && error[item].errors.length) {
                            console.log(error[item].errors[0].message)
                            errorMessage = `项目预算明细(${i+1})中${error[item].errors[0].message}`;
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
                // this.state[`budget_money__${item}`]
                for(let i in value) {
                    if(formContent[j] === Number(i.split('__')[1])) {
                        if(i.indexOf('type') > -1) {
                            value[i] = value[i][0];
                        }
                        obj[i.split('__')[0]] = value[i];
                    }
                }
                for(let m in this.state) {
                    if(formContent[j] === Number(m.split('__')[1])) {
                        obj[m.split('__')[0]] = this.state[m];
                    }
                }
                data.push(obj);
            }
            if(value.budget_reason) {
                data.budget_reason = value.budget_reason;
            }
            localStorage.setItem('fifthStep', JSON.stringify({budget: data}));
            let allData = {
                budget: data,
                ...JSON.parse(localStorage.getItem('firstStep')),
                ...JSON.parse(localStorage.getItem('secondStep')),
                ...JSON.parse(localStorage.getItem('thirdStep')),
                ...JSON.parse(localStorage.getItem('fourthStep')),
            };
            console.log(allData);
            location.replace('/funding_application/preview');


            // this.props.fundingApplicationPost(allData);
        });
    };
    render() {
        const { getFieldProps, getFieldValue } = this.props.form;
        return(
            <div>
                {this.doHtml()}
                <div className={classnames({
                    "page-funding-application-item-textarea": true,
                    "page-funding-application-item-picker": getFieldValue('budget_reason')&&getFieldValue('budget_reason').length > 0
                })}>
                    <div className="page-funding-application-item-label-special">说明</div>
                    <TextareaItem
                        {...getFieldProps(`budget_reason`)}
                        placeholder="简述预算理由（选填）"
                        autoHeight
                    />
                </div>
                <div className="addActive" onClick={this.onAddActive}><span style={{marginRight: '18px'}}>+</span><span>增加预算项目</span></div>
                <div className="nextStep" onClick={this.onNextStep}>填写完成，预览申请信息</div>
            </div>
        )
    }
}
const FormCreate = connect(
    state=>({
        fifthStepData: state.fundingApplication.fifthStep,
        secondStepData: state.fundingApplication.secondStep,
        fourthStepData: state.fundingApplication.fourthStep,
        fundingApplicationData: state.fundingApplication.fundingApplicationPost
    }),
    dispatch => bindActionCreators({ fifthStep, secondStep, fourthStep, fundingApplicationPost }, dispatch),
)(createForm()(Form));
class FundingApplication extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            htmlContent: []
        };
    }
    onScrollHandle() {
        scrollTop = window.scrollY;
    }
    componentWillMount() {

    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScrollHandle);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollHandle);
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
            <div className="page-funding-application" style={{paddingBottom: '44px'}}>
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
FundingApplication.title = '填写项目预算明细';
// export default connect(
//     state=>({
//         fifthStepData: state.fundingApplication.fifthStep,
//         secondStepData: state.fundingApplication.secondStep,
//     }),
//     dispatch => bindActionCreators({ fifthStep }, dispatch),
// )(FundingApplicationForm);

export default FundingApplicationForm;

