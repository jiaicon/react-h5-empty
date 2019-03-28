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
import { requestVerifyCode, register } from '../register/register.store';
import Avatar from '../../../components/avatar/avatar';
import { API_HOST } from '../../../utils/config';
import { format } from 'url';

class Login extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            captchaUrl: `${API_HOST}/api/captcha?t=${Date.now()}`,
            buttonString: '获取验证码',
            timer: null,
            countDownTrigger: true,
        };
    }

    componentWillMount() {
        this.props.changeIndex(0);

        
    }

    componentDidMount() {
        const tabIndex = this.props.login.idx;
        this.props.changeIndex(tabIndex);
    }

    componentWillReceiveProps(nextProps) {
        const {login: cLogin} = this.props;
        const {login: nLogin} = nextProps;
        const realRegister =  window.orgInfo.real_name_register;
        if (cLogin.fetching && !cLogin.failed && !nLogin.fetching && !nLogin.failed) {
          
            let target = '/my';
            const {from} = nLogin;
         
            if (realRegister && !nLogin.data.id_number) {
                if(from) {
                    target = from;
                }
                
                this.props.storeLoginSource(target);

                if (window.orgCode === 'oBDbDkxal2') {
                    window.location.replace(`/my/profile/verifyStarbucks?target=${target}`);
                    return;
                }

            
                window.location.replace(`/my/profile/verify?target=${target}`);
               
               
                // history.replace('/my/profile/verify');
            }else{
                
                // 如果登录状态设置了来源（例如从签到页跳转而来）则登录成功后需要跳转回去
                
                if (from) {
                    console.log("登录状态设置了来源，from是：：：：：：",from);
                    target = from;
                }
                if (from === '/my/login') {
                    target = '/my';
                }
                window.location.replace(target);
                // history.replace(target);
            }
        }
        const { code: cCode, forget: cForget } = this.props;
        const { code: nCode, forget: nForget } = nextProps;

        console.log(nextProps,this.props);

        if (cCode.fetching && !cCode.failed && !nCode.fetching && !nCode.failed) {
        this.onStartCountDown();
        this.setState({
            countDownTrigger: false,
        });
        }//请求成功
        if (cCode.fetching && !cCode.failed && !nCode.fetching && nCode.failed) {
            this.refreshCaptcha();
        }//请求失败
    }

    componentWillUnmount() {
    }

    onTextChanged() {
        const tabIndex = this.props.login.idx;
        let username,pwd =null;
        if(tabIndex == 0){
            username = this.quickUsername.value.replace(/(^\s+)|(\s+$)/g, '');
            pwd = this.usercode.value.replace(/(^\s+)|(\s+$)/g, '');
            const captcha =this.captcha.value.replace(/(^\s+)|(\s+$)/g, '');
          
            this.setState({
                ...this.state,
                username,
                pwd,
                captcha,
            });
   
        }else if(tabIndex == 1){
             username = this.loginUsername.value.replace(/(^\s+)|(\s+$)/g, '');
             pwd = this.pwd.value.replace(/(^\s+)|(\s+$)/g, '');
             this.setState({
                ...this.state,
                username,
                pwd,
            });
        }
    }


    componentWillUnmount() {
        const timer = this.state.timer;
        clearInterval(timer);
        this.setState({
            
          buttonString: '获取验证码',
          timer: null,
        });
    }
    onStartCountDown() {
        let timer = this.state.timer;
        let num = 60;
        const that = this;
        this.setState({
          ...this.state,
          buttonString: num,
          countDownTrigger: false,
        });
        timer = setInterval(() => {
          num -= 1;
          that.setState({
            ...this.state,
            buttonString: num,
            timer,
          });
          if (num === 0) {
            clearInterval(timer);
            that.setState({
              ...this.state,
              buttonString: '获取验证码',
              timer: null,
              countDownTrigger: true,
            });
          }
        }, 1000);
      }
    refreshCaptcha() {
        this.setState({
          ...this.state,
          captchaUrl: `${API_HOST}/api/captcha?t=${Date.now()}`,
        });
      }
    onSend() {
        const phone = this.state.username;
        const captcha = this.state.captcha;
        const countDownTrigger = this.state.countDownTrigger;
        const data = {};
        if (phone && captcha) {
            if (countDownTrigger === true) {
            data.phone = phone;
            data.captcha_code = captcha;
            this.props.requestVerifyCode(data);
            } else {
            Alert.warning('同一时间内不能多次点击');
            }
        } else if (!phone) {
            Alert.warning('请输入手机号');
        } else {
            Alert.warning('请输入验证码');
        }
    }
    submit() {
        const tabIndex = this.props.login.idx;
        const data = {};
        if(tabIndex == 0){
            const username = this.state.username;
            const pwd = this.state.pwd;
            data.phone =username;
            
            data.verify_code =pwd;
            data.type =tabIndex;
          
   
        }else if(tabIndex == 1){
            const username = this.state.username;
            const pwd = this.state.pwd;
            // if (pwd.length <= 5 || pwd.length >= 20) {
            //     Alert.warning('密码范围6-20位数字字母组成');
            //     return;
            // }
            data.username =username;
            data.pwd = pwd;
            data.type =tabIndex;
        
        }
        this.props.loginAction(data);
    }
    renderLogin() {
        return (
            <div className="page-login-box">
                <div className="page-login">
                    <div className="page-login-item">
                        <input type="text" ref={(c) => { this.loginUsername = c; }} onChange={this.onTextChanged}
                               placeholder="手机号或证件号码" className="page-login-item-input"/>
                    </div>
                    <div className="page-login-item">
                        <input type="password" ref={(c) => { this.pwd = c; }} onChange={this.onTextChanged}
                               placeholder="输入密码" className="page-login-item-input" />
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
                        <input type="number" ref={(c) => { this.quickUsername = c; }} onChange={this.onTextChanged}
                               placeholder="请输入手机号" className="page-login-item-input"/>
                    </div>
                    <div className="page-login-item">
                        <input type="text"ref={(c) => { this.captcha = c; }} onChange={this.onTextChanged}
                               placeholder="图形验证码" className="page-login-item-input"/>
                        <img className="page-login-item-code" src={this.state.captchaUrl} 
                         alt="" onClick={this.refreshCaptcha} />
                    </div>
                    <div className="page-login-item">
                        <input type="number" ref={(c) => { this.usercode = c; }} onChange={this.onTextChanged}
                               placeholder="手机验证码" className="page-login-item-input"/>
                        <div className="page-login-item-code" onClick={this.onSend}>{this.state.buttonString}</div>
                    </div>
                    <div className="page-login-entry page-login-quick-login" onClick={this.submit}>登录/注册</div>
                </div>
                <div className="page-login-agree">
                    提交代表已阅读
                    {
                        window.orgCode == 'joQeZJepZV' ?
                        <Link to="/my/agree">
                            <span className="page-login-agreement">《长春志愿者用户协议》</span>
                        </Link>
                        :
                        <Link to="/my/agree">
                            <span className="page-login-agreement">《用户协议》</span>
                        </Link>
                    }
                  
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
    requestVerifyCode: PropTypes.func,
    register: PropTypes.func,
    code: PropTypes.shape({
      fetching: PropTypes.bool,
      failed: PropTypes.bool,
      data: PropTypes.shape({
      }),
    }),
    regis: PropTypes.shape({
      fetching: PropTypes.bool,
      failed: PropTypes.bool,
      data: PropTypes.shape({
        id: PropTypes.number,
        token: PropTypes.string,
      }),
    }),


};

export default connect(
    state => ({
        login: state.login.login,
        code: state.register.code,
        regis: state.register.register,
    }),
    dispatch => bindActionCreators({loginAction,storeLoginSource ,changeIndex ,requestVerifyCode, register}, dispatch),
)(Login);
