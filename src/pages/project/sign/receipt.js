/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import classnames from 'classnames';
import uploadToWX from '../../../utils/wxupload';
import UploadPhoto from '../../../components/uploadPhoto/uploadPhoto';
import { bindActionCreators } from 'redux';
import uploadImage from "../../../utils/uploadImage";
import CheckboxStepper from '../../../components/checkboxStepper/index'
import { List, Checkbox, DatePicker, Radio } from 'antd-mobile';
import history from '../../history';
import Avatar from '../../../components/avatar/avatar';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/checkbox/style/css';
import 'antd-mobile/lib/Stepper/style/css';
import 'antd-mobile/lib/Radio/style/css';
import '../../my/profile/verifyAntd.css';
import './signUp.css';
import {
    requestProjectDetail,
} from '../detail/detail.store';
import {
    joinPayProject,
    joinProjectAction
} from '../sign/sign.store';



class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.sn = props.route.params.sn;

        this.state = {
            
        };

    }

    componentWillMount() {
        // this.props.requestProjectDetail(this.projectId)

    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillDidmount() {
  

    }
    componentWillUnmount() {
        
    }


  
    render() {

        return <div className="page-project-receipt">
            <img src="/images/wechaticon.png" className="page-project-receipt-wechaticon" />
            <div className="page-project-receipt-title">
              正在尝试打开微信客户端
            </div>
            <div className="page-project-receipt-paragph">
              1.如果未打开微信客户端或未完成付款，请点击“继续支付”;
            </div>
            <div className="page-project-receipt-paragph">
              2.如果你已完成，请点击“已完成付款”。
            </div>
            <div className="page-project-receipt-btn" style={{ background: "#08C062", color: "#fff", marginTop: "20px" }}>
              继续支付
            </div>
            <div className="page-project-receipt-btn">已完成付款</div>
            <div className="page-project-receipt-btn">支付遇到问题</div>
            {window.orgInfo && window.orgInfo.name ?
                <div className="page-projrct-receipt-orgname">
                    {window.orgInfo && window.orgInfo.name}
                </div>:null
            }
           
          </div>;
    }
}

SignUpPage.propTypes = {
    requestProjectDetail: PropTypes.func,
    joinPayProject: PropTypes.func,
    joinProjectAction: PropTypes.func,
    detail: PropTypes.shape({
        fetchingId: PropTypes.string,
        data: PropTypes.shape({}),
        tabIndex: PropTypes.number,
    }),
    joinPay: PropTypes.shape({
    }),
    join: PropTypes.shape({
    }),
    route: PropTypes.shape({
        params: PropTypes.shape({
            projectId: PropTypes.string,
        }),
    }),
};

SignUpPage.title = "项目支付";

export default connect(
    state => ({
        detail: state.project.detail,
        joinPay: state.project.projectSign.joinPayProject,
        join: state.project.projectSign.joinProject,
    }),
    dispatch => bindActionCreators({
        requestProjectDetail,
        joinPayProject,
        joinProjectAction
    }, dispatch),
)(SignUpPage);