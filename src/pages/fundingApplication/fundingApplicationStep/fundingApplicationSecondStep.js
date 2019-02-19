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
import UploadPhoto from './../../../components/uploadPhoto/uploadPhoto';


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
            console.log('open');
            location.href='/funding_application/step_three';
        });
    };
    onPhotoChange(images) {
        console.log(images)
        this.setState({
            imagesArr: images.map(item=>item.url)
        })
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        console.log(getFieldProps('projectPrice'))

        return (
            <div className="page-funding-application">
                <div style={{marginBottom: '62px'}}>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">组织名称</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入收益组织名称"
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('orgName', {
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
                            moneyKeyboardAlign="right"
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
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('orgAddress', {
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
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('orgPerson', {
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
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('orgPersonContact', {
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
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('orgPersonContactPhone', {
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
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('orgPersonContactEmail', {
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
                        <Picker
                            data={this.state.serviceArea}
                            cols={1}
                            {
                                ...getFieldProps('serviceAreaValue', {
                                    rules: [{
                                        required: true,
                                        message: '请输入服务领域',
                                    }],
                                })
                            }
                        >
                            <List.Item arrow="horizontal"></List.Item>
                        </Picker>
                    </div>
                    <div className="line1px"></div>
                    <div className="page-funding-application-item-textarea">
                        <div className="page-funding-application-item-label-special">组织简介</div>
                        <TextareaItem
                            {...getFieldProps('projectResult', {
                                rules: [{
                                    required: true,
                                    message: '请输入组织简介',
                                }],
                            })}
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
                <div className="nextStep" onClick={this.onNextStep}>下一步，填写资助项目信息</div>
            </div>
        );
    }
}
const FundingApplicationForm = createForm()(FundingApplication);
FundingApplicationForm.propTypes = {

};
FundingApplication.title = '填写收益组织资料';
export default connect(
    dispatch => bindActionCreators({  }, dispatch),
)(FundingApplicationForm);

