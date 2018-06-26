/**
 * @file 登录
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 "jsx-a11y/no-static-element-interactions":"off",
 "react/no-array-index-key":"off" */
import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import history from '../../history';
import Link from '../../../components/link/link';
import Tab from '../../../components/tab/tab';

import './login.css';
import {loginAction, changeIndex ,storeLoginSource} from './login.store';
import Register from './../register/register';
import Avatar from '../../../components/avatar/avatar';

const TAB_URL_MAPS = {
    '/my/register': <Register />
};
class Login extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount() {
        this.props.changeIndex(0);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const {login: cLogin} = this.props;
        const {login: nLogin} = nextProps;
        const realRegister =  window.orgInfo.custom_config ? window.orgInfo.custom_config.real_name_register: 0;
        if (cLogin.fetching && !nLogin.fetching && !nLogin.failed) {
            let target = '/my';
            const {from} = nLogin;
            if (realRegister && !nLogin.data.id_number) {
                if(from) {
                    target = from;
                }
                this.props.storeLoginSource(target);
                history.replace('/my/profile/verify');
            }else{
                
                // 如果登录状态设置了来源（例如从签到页跳转而来）则登录成功后需要跳转回去
                if (from) {
                    target = from;
                }
                history.replace(target);
            }
        }
    }

    componentWillUnmount() {
    }

    onTextChanged() {
        const username = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
        const pwd = this.pwd.value.replace(/(^\s+)|(\s+$)/g, '');

        this.setState({
            username,
            pwd,
        });
    }

    submit() {
        const username = this.state.username;
        const pwd = this.state.pwd;
        const data = {};
        data.username = username;
        if (pwd.length <= 5 || pwd.length >= 19) {
            Alert.warning('密码范围6-20位数字字母组成');
            return;
        }
        data.pwd = pwd;
        this.props.loginAction(data);
    }



    renderLogin() {
        return (
            <div className="page-login-box">
                <div className="page-login">
                    <div className="page-login-item">
                        <input type="text" ref={(c) => { this.username = c; }} onKeyUp={this.onTextChanged}
                               placeholder="手机号或身份证号" className="page-login-item-input"/>
                    </div>
                    <div className="page-login-item">
                        <input type="password" ref={(c) => { this.pwd = c; }} onKeyUp={this.onTextChanged}
                               placeholder="输入密码" className="page-login-item-input"/>
                    </div>
                    <div className="page-login-forget">
                        <Link to="/my/forget">
                            <span className="page-login-forget-item">忘记密码</span>
                        </Link>
                    </div>
                    <div className="page-login-entry " onClick={this.submit}>登录</div>
                </div>
            </div>
        );
    }
    renderQuickLogin() {
        return(
            <div className="page-login-box">
                <div className="page-login">
                    <div className="page-login-item">
                        <input type="text" ref={(c) => { this.username = c; }} onKeyUp={this.onTextChanged}
                               placeholder="请输入手机号" className="page-login-item-input"/>
                    </div>
                    <div className="page-login-item">
                        <input type="password" ref={(c) => { this.pwd = c; }} onKeyUp={this.onTextChanged}
                               placeholder="图形验证码" className="page-login-item-input"/>
                        <img className="page-login-item-code" src="" alt=""/>
                    </div>
                    <div className="page-login-item">
                        <input type="password" ref={(c) => { this.pwd = c; }} onKeyUp={this.onTextChanged}
                               placeholder="手机验证码" className="page-login-item-input"/>
                        <div className="page-login-item-code">获取验证码</div>
                    </div>
                    <div className="page-login-entry page-login-quick-login" onClick={this.submit}>登录/注册</div>
                </div>
                <div className="page-login-agree">
                    提交代表已阅读
                    <Link to="/my/agree">
                        <span className="page-login-agreement">《志多星用户协议》</span>
                    </Link>
                </div>
            </div>
        )
    }

    onTabChange(idx) {
        this.props.changeIndex(idx);
    }
    render() {
        const tabIndex = this.props.login.idx;
        return(
            <div>
                <Tab
                    tabs={[
                        {
                            label: '快速登录',
                            component: this.renderQuickLogin(),
                        },
                        {
                            label: '账号登录',
                            component: this.renderLogin(),
                        },
                    ]}
                    onChange={this.onTabChange}
                    selectedIndex={tabIndex}
                />
            </div>
        )
    }
}

Login.title = '登录';

Login.propTypes = {
    loginAction: PropTypes.func,
    login: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
        from: PropTypes.string,
        idx: PropTypes.number,
        data: PropTypes.shape({
            // TODO:接收回来
            token: PropTypes.string,
            id: PropTypes.number,
            username: PropTypes.string,
            phone: PropTypes.string,
            avatars: PropTypes.string,
            real_name: PropTypes.string,
            nation: PropTypes.string,
            sex: PropTypes.number,
            birthday: PropTypes.string,
            identifier: PropTypes.string,
            slogan: PropTypes.string,
            reward_time: PropTypes.string,
            id_number: PropTypes.string,
            province_id: PropTypes.number,
            province_name: PropTypes.string,
            city_id: PropTypes.number,
            city_name: PropTypes.string,
            county_id: PropTypes.number,
            county_name: PropTypes.string,
            addr: PropTypes.string,
            family_id: PropTypes.number,
            join_family_time: PropTypes.string,
            good_at: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),


};

export default connect(
    state => ({
        login: state.login.login,
    }),
    dispatch => bindActionCreators({loginAction,storeLoginSource ,changeIndex}, dispatch),
)(Login);
