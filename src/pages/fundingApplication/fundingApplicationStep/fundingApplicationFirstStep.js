/* global wx:false */

/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Picker, List, InputItem, TextareaItem, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import classnames from 'classnames';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import 'antd-mobile/lib/modal/style/css';
import './../fundingApplication.css';
import './../eachStepStyle.css';
import Image from "../../../components/image/image";
import { getCity, getAreaProvince } from './../../home/home.store'
import { firstStep } from './../fundingApplication.store';
import Alert from "react-s-alert";
import { userCenterAction } from './../../my/my.store';
let scrollTop = 0;
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
const imgContainer = [
    {src: '/images/preview/team.png',content: '填写申报人信息'},
    {src: '/images/preview/org.png',content: '填写受益组织资料'},
    {src: '/images/preview/information.png',content: '填写资助项目信息'},
    {src: '/images/preview/strategy.png',content: '填写项目执行计划'},
    {src: '/images/preview/money.png',content: '填写经费预算明细'},
    {src: '/images/preview/eye.png',content: '预览&修改申报信息'},
    {src: '/images/preview/time.png',content: '申请完成，等待审核'},
];
class FundingApplication extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            serviceArea: window.serviceArea,
            serviceAreaValue: '',
            showModal: true
        };
        this.slickSettings = {
            dots: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            dotsClass: 'slick-dots dotsClass'
        };
    }
    play() {
        this.slider.slickPlay();
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }
    componentWillMount() {
        if(!this.props.isLogin) {
            this.props.userCenterAction();
        }
        this.props.getCity();
    }
    onScrollHandle() {
        scrollTop = window.scrollY;
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
    onNextStep = ()=>{
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            if (error) {
                let arr = ["user_name",
                    "user_business_province",
                    "user_business_city",
                    "user_store",
                    "user_position",
                    "user_job_num",
                    "user_phone",
                    "user_email",
                    "user_apply_rsason",
                    "user_apply_monry"
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
            if(value.user_business_province) value.user_business_province = value.user_business_province[0];
            if(value.user_business_city) value.user_business_city = value.user_business_city[0];
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
    onCloseModal(key){
        this.setState({
            [key]: false
        })
    };
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    };
    iPhoneBlur() {
        window.scroll(0, 0 || scrollTop);
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
            <div className="page-funding-application">
                <div style={{marginBottom: '62px'}}>
                    <div className="page-funding-application-item">
                        <div className="page-funding-application-item-label">申请人姓名</div>
                        <InputItem
                            className="page-funding-application-input"
                            placeholder="请输入你的姓名"
                            onBlur={this.iPhoneBlur}
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
                    <div className={classnames({
                        "page-funding-application-item": true,
                        "page-funding-application-item-picker": getFieldValue('user_business_province')&&getFieldValue('user_business_province').length > 0
                    })}>
                        <div className="page-funding-application-item-label">所属业务区域(省)</div>
                        <Picker
                            data={provinceList&&provinceList}
                            onOk={this.provincePickerOk}
                            cols={1}
                            {
                                ...getFieldProps('user_business_province', {
                                    rules: [{
                                        required: true,
                                        message: '请输入所属业务区域(省)',
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
                        "page-funding-application-item-picker": getFieldValue('user_business_city')&&getFieldValue('user_business_city').length > 0
                    })}>
                        <div className="page-funding-application-item-label">所属业务区域(市)</div>
                        <Picker
                            data={areaList&&areaList}
                            cols={1}
                            {
                                ...getFieldProps('user_business_city', {
                                    rules: [{
                                        required: true,
                                        message: '请输入所属业务区域(市)',
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
                            onBlur={this.iPhoneBlur}
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
                            onBlur={this.iPhoneBlur}
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
                            onBlur={this.iPhoneBlur}
                            moneyKeyboardAlign="right"
                            {
                                ...getFieldProps('user_phone', {
                                    rules: [{
                                        required: true,
                                        message: '请输入联系电话',
                                    }
                                    ,{
                                        pattern: /^[0-9|-]*$/,
                                        message: '请输入正确格式的联系电话'
                                    }
                                    ]
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
                    <div className={classnames({
                        "page-funding-application-item-textarea": true,
                        "page-funding-application-item-picker": getFieldValue('user_apply_rsason')&&getFieldValue('user_apply_rsason').length > 0
                    })}>
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
                            onBlur={this.iPhoneBlur}
                            rows="4"
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
                            onBlur={this.iPhoneBlur}
                            type='digit'
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
                <Modal
                    visible={this.state.showModal}
                    transparent
                    closable={true}
                    maskClosable={false}
                    onClose={()=>{this.onCloseModal('showModal')}}
                    title="申请流程"
                    footer={[{ text: '开始申报', onPress: () => { console.log('ok'); this.setState({showModal: false})} }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => {  }}
                >
                    <div>
                        <Slick {...this.slickSettings}>
                            {
                                imgContainer.map((item, index)=>(
                                    <div key={index} style={{width: '165px', height: '165px'}}>
                                        <Image
                                            src={item.src}
                                            className="image"
                                            resize={{ width: 1500, height: 165 }}
                                        />
                                        <p style={{marginTop: '10px'}}>{item.content}</p>
                                    </div>
                                ))
                            }

                        </Slick>
                    </div>
                </Modal>
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
        userCenterData: state.my.userCenter,
        userInfo: state.user
    }),
    dispatch => bindActionCreators({ firstStep, getCity, getAreaProvince, userCenterAction }, dispatch),
)(FundingApplicationForm);
