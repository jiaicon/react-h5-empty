/**
 * @file 个人资料
 */
/* eslint
 "jsx-a11y/no-static-element-interactions":"off",
 "react/no-array-index-key":"off",
 "class-methods-use-this": "off"
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { Dialog } from 'react-weui';
import history from '../../history';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';
import Alert from 'react-s-alert';
import { requestUserInfo } from '../../../stores/common';
import { imporvePersonInfo, otherFamilyAction } from './profile.store';
import { alertFamilyPeopleInfo } from './../my.store';
import Link from '../../../components/link/link';
import Avatar from '../../../components/avatar/avatar';
import uploadToWX from '../../../utils/wxupload';
import './profile.css';


function sexName(sex) {
    if (sex === 1) {
        return '男';
    } else if (sex === 2) {
        return '女';
    }

    return '未知';
}
const relations = [{name: '兄弟', id: 0},{name: '姐妹',id: 1},{name: '父子',id: 2},{name: '母女',id: 3}];
class Profile extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.userId = props.route.params.userId;
        this.realRegister = window.orgInfo.real_name_register;
        this.state = ({
            photo: '',
            showDialog: false
        });
        this.dialog = {
            title: '提示',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: () => this.setState({ ...this.state, showDialog: false })
                },
                {
                    type: 'primary',
                    label: '确认',
                    onClick: () => {
                        this.setState({ ...this.state, showDialog: false });
                        this.alertFamilyPeopleProfile();
                    }
                }
            ]
        };
    }

    componentWillMount() {
        const userId = this.props.route.params.userId;
        this.setState({
            ...this.state,
            userId,
        });
        if (userId === 'user') {
            this.props.requestUserInfo();
        } else {
            this.props.otherFamilyAction(userId);
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {}

    onAvatarClick() {
        uploadToWX({
            success: (urls) => {
                const data = {
                    avatars: urls[0],
                };
                this.photo = urls[0];
                this.props.imporvePersonInfo(data);
                this.props.requestUserInfo();
            },
        });
    }

    onOtherHandleClick() {
        Alert.warning('如需修改请登录账号');
    }

    renderOtherRealInfo() {
        const otherfamily = this.props.otherfamily;
        if (!otherfamily.data) {
            return null;
        }
        return (
            <div className="page-profile-bottom-real-info-container">
                <div className="page-profile-title page-profile-realinfo-padding-top">实名认证信息</div>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">姓名</div>
                    <div className="page-profile-initial-fonts">{otherfamily.data.real_name ? otherfamily.data.real_name : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">身份证号</div>
                    <div className="page-profile-initial-fonts">{otherfamily.data.id_number ? otherfamily.data.id_number : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">性别</div>
                    <div className="page-profile-initial-fonts">{otherfamily.data.sex ? sexName(otherfamily.data.sex) : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">民族</div>
                    <div className="page-profile-initial-fonts">{otherfamily.data.nation ? otherfamily.data.nation : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">现住地址</div>
                    <div className="page-profile-initial-fonts">{otherfamily.data.province_name ? otherfamily.data.province_name : ''}-{otherfamily.data.city_name ? otherfamily.data.city_name : ''}-{otherfamily.data.county_name ? otherfamily.data.county_name : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">详细地址</div>
                    <div className="page-profile-initial-fonts">{otherfamily.data.addr ? otherfamily.data.addr : ''}</div>
                </div>
                <div className="page-profile-realinfo-takeup" />
            </div>
        );
    }
    renderRealInfo() {
        const user = this.props.user;

        return (
            <div className="page-profile-bottom-real-info-container">
                <div className="page-profile-title page-profile-realinfo-padding-top">实名认证信息</div>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">姓名</div>
                    <div className="page-profile-initial-fonts">{user.real_name ? user.real_name : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">身份证号</div>
                    <div className="page-profile-initial-fonts">{user.id_number ? user.id_number : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">性别</div>
                    <div className="page-profile-initial-fonts">{user.sex ? sexName(user.sex) : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">民族</div>
                    <div className="page-profile-initial-fonts">{user.nation ? user.nation : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">现住地址</div>
                    <div className="page-profile-initial-fonts">{user.province_name ? user.province_name : ''}-{user.city_name ? user.city_name : ''}-{user.county_name ? user.county_name : ''}</div>
                </div>
                <div className="line1px" />
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">详细地址</div>
                    <div className="page-profile-initial-fonts">{user.addr ? user.addr : ''}</div>
                </div>
                <Link to="/my/profile/applyAlert">
                    <div className="page-profile-apply-alert" onClick={this.applyAlert}>申请修改</div>
                </Link>
            </div>
        );
    }

    renderHost() {
        const user = this.props.user;
        return (
            <div className="page-profile">
                <div>
                    <div className="page-profile-title">基本信息</div>
                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">头像</div>
                        <div className="page-profile-header-uploade-box">
                            <div className="page-profile-header-img-container" onClick={this.onAvatarClick}>
                                <Avatar src={this.photo ? this.photo : user.avatars} size={{ width: 40, radius: 4 }} defaultSrc="/images/my/register.png" />
                            </div>
                            <div className="page-profile-edit-icon" />
                        </div>
                    </div>
                    <div className="line1px" />
                    {this.realRegister ? null :
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">账号</div>
                            <div className="page-profile-edit-box">
                                <div className="page-profile-initial-fonts">{user.username}</div>
                                <div className="page-profile-initial-fonts-take-up" />
                            </div>
                        </div>
                    }
                    {
                        this.realRegister ? null : <div className="line1px" />
                    }

                    <Link to="/my/profile/bind/phone">
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">手机号</div>
                            <div className="page-profile-edit-box">
                                <div className="page-profile-initial-fonts">{user.phone || ''}</div>
                                <div className="page-profile-edit-icon" />
                            </div>
                        </div>
                    </Link>
                    <div className="line1px" />

                    <Link to="/my/profile/bind/mail">
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">邮箱</div>
                            <div className="page-profile-edit-box">
                                <div className="page-profile-initial-fonts">{user.email || ''}</div>
                                <div className="page-profile-edit-icon" />
                            </div>
                        </div>
                    </Link>
                    <div className="line1px" />

                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">志愿者编号</div>
                        <div className="page-profile-edit-box">
                            <div className="page-profile-initial-fonts">{user.identifier}</div>
                            <div className="page-profile-initial-fonts-take-up" />
                        </div>
                    </div>
                    <div className="line1px" />
                    <Link to="/my/profile/checkbox">
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">个人擅长</div>
                            <div className="page-profile-edit-box">
                                {user.good_at != null ?
                                    user.good_at.map((item, index) =>
                                        <span key={index} className="page-profile-initial-fonts" >
                      {item.good_at_name}{index < user.good_at.length - 1 ? '、' : ''}
                    </span>)
                                    : <span />
                                }
                                <div className="page-profile-edit-icon" />
                            </div>

                        </div>
                    </Link>
                    <div className="line1px" />

                    <div>
                        <Link to="/my/profile/edit">
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">志愿者口号</div>
                                <div className="page-profile-edit-icon" />
                            </div>
                            <div className="page-profile-fonts-view">{user.slogan}</div>
                        </Link>
                    </div>
                </div>
                {/* 通过开关判断用户是否实名注册显示渲染列表，或进去BTN */}
                <div
                    className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': !user.id_number,
            'page-profile-display-none': user.id_number,
          })}
                >
                    <Link to="/my/profile/verify">
                        <div className="page-profile-bottom-btn">申请成为实名注册志愿者</div>
                    </Link>
                </div>
                <div
                    className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': user.id_number,
            'page-profile-display-none': !user.id_number,
          })}
                >
                    {this.renderRealInfo()}
                </div>

            </div>
        );
    }
    renderOther() {
        const otherfamily = this.props.otherfamily;
        if (!otherfamily.data) {
            return null;
        }
        return (
            <div className="page-profile">
                <div>
                    <div className="page-profile-title">基本信息</div>
                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">头像</div>
                        <div className="page-profile-header-uploade-box">
                            <div className="page-profile-header-img-container" onClick={this.onOtherHandleClick}>
                                <Avatar src={otherfamily.data.avatars} size={{ width: 40, radius: 4 }} defaultSrc="/images/my/register.png" />
                            </div>

                            <div className="page-profile-edit-icon" />
                        </div>
                    </div>
                    <div className="line1px" />
                    {this.realRegister ? null :
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">账号</div>
                            <div className="page-profile-edit-box">
                                <div className="page-profile-initial-fonts">{otherfamily.data.username}</div>
                                <div className="page-profile-initial-fonts-take-up" />
                            </div>
                        </div>
                    }
                    {
                        this.realRegister ? null : <div className="line1px" />
                    }

                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">志愿者编号</div>
                        <div className="page-profile-edit-box">
                            <div className="page-profile-initial-fonts">{otherfamily.data.identifier}</div>
                            <div className="page-profile-initial-fonts-take-up" />
                        </div>
                    </div>
                    <div className="line1px" />
                    {/** 111 */}
                    <a onClick={this.onOtherHandleClick}>
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">*手机号</div>
                            <div className="page-profile-edit-box">
                                <div className="page-profile-initial-fonts">{otherfamily.data.phone || ''}</div>
                                <div className="page-profile-edit-icon" />
                            </div>
                        </div>
                    </a>
                    <div className="line1px" />

                    <a onClick={this.onOtherHandleClick}>
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">邮箱</div>
                            <div className="page-profile-edit-box">
                                <div className="page-profile-initial-fonts">{otherfamily.data.email || ''}</div>
                                <div className="page-profile-edit-icon" />
                            </div>
                        </div>
                    </a>
                    <div className="line1px" />


                    {/** 111 */}
                    <div className="page-profile-header-box" onClick={this.onOtherHandleClick}>
                        <div className="page-profile-fonts">个人擅长</div>
                        <div className="page-profile-edit-box">
                            {otherfamily.data.good_at != null ?
                                otherfamily.data.good_at.map((item, index) =>
                                    <span key={index} className="page-profile-initial-fonts" >
                {item.good_at_name}{index < otherfamily.data.good_at.length - 1 ? '、' : ''}
              </span>)
                                : <span />
                            }
                            <div className="page-profile-edit-icon" />
                        </div>

                    </div>
                    <div className="line1px" />

                    <div>
                        <div className="page-profile-header-box" onClick={this.onOtherHandleClick}>
                            <div className="page-profile-fonts">志愿者口号</div>
                            <div className="page-profile-edit-icon" />
                        </div>
                        <div className="page-profile-fonts-view">{otherfamily.data.slogan}</div>
                    </div>
                    <div className="page-profile-take-up" />
                </div>
                {/* 通过开关判断用户是否实名注册显示渲染列表，或进去BTN */}
                <div
                    className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': !otherfamily.data.id_number,
            'page-profile-display-none': otherfamily.data.id_number,
          })}
                    onClick={this.onOtherHandleClick}
                >
                    <a>
                        <div className="page-profile-bottom-btn">申请成为实名注册志愿者</div>
                    </a>
                </div>
                <div
                    className={cx({
            'page-profile-bottom': true,
            'page-profile-display-block': otherfamily.data.id_number,
            'page-profile-display-none': !otherfamily.data.id_number,
          })}
                >
                    {this.renderOtherRealInfo()}
                </div>

            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {failed: tFailed, fetching: tFetch} = this.props.alertPeopleInfo;
        const {failed: nFailed, fetching: nFetch} = nextProps.alertPeopleInfo;
        if (tFetch && !nFetch && !nFailed) {
            history.replace('/my/family');
        }
    }

    onTextChange() {
        this.alertPassword = true;
        const userPassword = this.userPassword.value.replace(/(^\s+)|(\s+$)/g, '');
        this.setState({
            userPassword: userPassword
        })
    }
    handlePeopleClick() {
        this.alertRelations = true;
        const relations = this.relations.value.replace(/(^\s+)|(\s+$)/g, '');
        this.setState({
            ...this.state,
            relations: relations
        })
    }
    alertFamilyPeopleProfile() {
        const data = {};
        let userPassword;
        let relations;
        if(this.alertPassword) {
            userPassword = this.state.userPassword;
            if(userPassword.length <= 5) {
                Alert.warning('密码最少6位');
                return;
            }
            data.pwd = userPassword;
        }
        if(this.alertRelations) {
            relations = this.state.relations;
            data.relation = relations;
        }
        if(!this.state.userPassword && !this.state.relations) {
            return;
        }
        this.props.alertFamilyPeopleInfo(this.props.otherfamily.data.id, data)
    }
    renderNewView() {
        const otherFamily = this.props.otherfamily;
        if (!otherFamily.data) {
            return null;
        }
        return (
            <div className="page-profile-header-detail">
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">姓名</div>
                    <div className="page-profile-edit-right-box">{otherFamily.data.real_name}</div>
                </div>
                <div className="line1px"/>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">身份证号</div>
                    <div className="page-profile-edit-right-box">{otherFamily.data.id_number.substring(0,1)}***************{otherFamily.data.id_number.substring(17,18)}</div>
                </div>
                <div className="line1px"/>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">民族</div>
                    <div className="page-profile-edit-right-box">{otherFamily.data.nation}</div>
                </div>
                <div className="page-profile-header-line">现居住地址</div>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">省份</div>
                    <div className="page-profile-edit-right-box">{otherFamily.data.province_name}</div>
                </div>
                <div className="line1px"/>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">城市</div>
                    <div className="page-profile-edit-right-box">{otherFamily.data.city_name}</div>
                </div>
                <div className="line1px"/>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">区县</div>
                    <div className="page-profile-edit-right-box">{otherFamily.data.county_name}</div>
                </div>
                <div className="line1px"/>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">详细地址</div>
                    <div className="page-profile-edit-right-box">{otherFamily.data.addr}</div>
                </div>
                <div className="page-profile-header-cut"></div>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts page-profile-fonts-main">密码</div>
                    <div className="page-profile-edit-right-box">
                        <input type="password" defaultValue="123456" onKeyUp={this.onTextChange} ref={c=>{this.userPassword = c}}/>
                    </div>
                </div>
                <div className="line1px"/>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts page-profile-fonts-main">关系</div>
                    <div className="page-profile-edit-right-box">
                        <label htmlFor="relations">
                            <select id="relations" onChange={this.handlePeopleClick} ref={(c) => { this.relations = c; }}>
                                { relations && relations.map((item, keys) =>
                                    <option value={item.name} selected={otherFamily.data.relation === item.name?'selected' : ''} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="page-profile-edit-btn" onClick={()=>{this.setState({...this.state,showDialog: true})}}>修改</div>
                <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
                    确定要修改成员信息吗？
                </Dialog>
            </div>
        )
    }
    render() {
        const userId = this.userId;

        return (
            <div>
                {
                    userId === 'user' ? this.renderHost() : this.renderNewView()
                    // this.renderNewView()
                }
            </div>
        );
    }
}


Profile.title = '个人资料';

Profile.propTypes = {
    requestUserInfo: PropTypes.func,
    imporvePersonInfo: PropTypes.func,
    otherFamilyAction: PropTypes.func,
    alertFamilyPeopleInfo: PropTypes.func,
    otherfamily: PropTypes.shape({
        token: PropTypes.string,
        id: PropTypes.number,
        username: PropTypes.string,
        phone: PropTypes.string,
        avatars: PropTypes.string,
        real_name: PropTypes.string,
        nation: PropTypes.string,
        sex: PropTypes.number,
        birthday: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        identifier: PropTypes.string,
        slogan: PropTypes.string,
        reward_time: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        id_number: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        province_id: PropTypes.number,
        province_name: PropTypes.string,
        city_id: PropTypes.number,
        city_name: PropTypes.string,
        county_id: PropTypes.number,
        county_name: PropTypes.string,
        addr: PropTypes.string,
        family_id: PropTypes.number,
        join_family_time: PropTypes.string,
        good_at: PropTypes.arrayOf(PropTypes.shape({

        })),
    }),
    user: PropTypes.shape({
        token: PropTypes.string,
        id: PropTypes.number,
        username: PropTypes.string,
        phone: PropTypes.string,
        avatars: PropTypes.string,
        real_name: PropTypes.string,
        nation: PropTypes.string,
        sex: PropTypes.number,
        birthday: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        identifier: PropTypes.string,
        slogan: PropTypes.string,
        reward_time: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        id_number: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        province_id: PropTypes.number,
        province_name: PropTypes.string,
        city_id: PropTypes.number,
        city_name: PropTypes.string,
        county_id: PropTypes.number,
        county_name: PropTypes.string,
        addr: PropTypes.string,
        family_id: PropTypes.number,
        join_family_time: PropTypes.string,
        good_at: PropTypes.arrayOf(PropTypes.shape({

        }))

    }),
    alertPeopleInfo: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool
    }),
    route: PropTypes.shape({
        params: PropTypes.shape({
            userId: PropTypes.string,
        }),
    })
};

export default connect(
    state => ({
        user: state.user,
        info: state.info.person,
        alertPeopleInfo: state.my.alertFamilyPeopleInfo,
        otherfamily: state.info.otherfamily,
    }),
    dispatch => bindActionCreators({ requestUserInfo,
        imporvePersonInfo,
        otherFamilyAction,
        alertFamilyPeopleInfo
    }, dispatch),
)(Profile);
