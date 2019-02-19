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


class FundingApplication extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            serviceArea: window.serviceArea,
            serviceAreaValue: '',
            activeCount: 1,
            allActive: []
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
                activeCount: data+1
            })
        });
    };
    renderBasic(num) {
        const { getFieldProps } = this.props.form;

        return <div className={classnames({
            'page-funding-application-allBox': num == this.state.activeCount
        })} key={num}>
            <div className="page-funding-application-item">
                <div className="page-funding-application-item-label">项目预算明细（{num}）</div>
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
    render() {
        let activeCountArr = [];
        for(let i = 0; i < this.state.activeCount; i++) {
            activeCountArr.push(i+1);
        }
        return (
            <div className="page-funding-application">
                {
                    activeCountArr.map((item, index)=>{
                        return this.renderBasic(item)
                    })
                }
                <div className="addActive" onClick={this.onAddActive}><span style={{marginRight: '18px'}}>+</span><span>增加预算项目</span></div>
                <div className="nextStep" onClick={this.onNextStep}>填写完成，预览申请信息</div>
            </div>
        );
    }
}
const FundingApplicationForm = createForm()(FundingApplication);
FundingApplicationForm.propTypes = {

};
FundingApplication.title = '填写项目预算明细';
export default connect(
    dispatch => bindActionCreators({  }, dispatch),
)(FundingApplicationForm);

