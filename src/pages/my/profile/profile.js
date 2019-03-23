/**
 * @file 个人资料
 */
/* eslint
 "jsx-a11y/no-static-element-interactions":"off",
 "react/no-array-index-key":"off",
 "class-methods-use-this": "off"
 */

import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cx from 'classnames';
import history from '../../history';
import Alert from 'react-s-alert';
import {requestUserInfo} from '../../../stores/common';
import {imporvePersonInfo, otherFamilyAction} from './profile.store';
import {alertFamilyPeopleInfo} from './../my.store';
import UploadAvatar from './../../../components/uploadAvatar/uploadAvatar';
import Link from '../../../components/link/link';
import Avatar from '../../../components/avatar/avatar';
import './profile.css';
import { DatePicker, List } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/list/style/css';
import { Dialog, Gallery, GalleryDelete, Button, Icon } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
function sexName(sex) {
    if (sex === 1) {
        return '男';
    } else if (sex === 2) {
        return '女';
    }

    return '未知';
}

const relations = [{name: '儿子', id: 0}, {name: '女儿', id: 1}, {name: '丈夫', id: 2}, {name: '妻子', id: 3},
    {name: '母亲', id: 4}, {name: '父亲', id: 5}, {name: '爷爷', id: 6}, {name: '奶奶', id: 7}, {name: '其他', id: 8}];

class Profile extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.userId = props.route.params.userId;
        this.realRegister = window.orgInfo.custom_config;
        this.state = ({
            photo: '',
            showDialog: false,
            winOrgInfo: window.orgInfo.custom_config,
            showMultiple: false,
            previewData: []
        });
        this.dialog = {
            title: '提示',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: () => this.setState({...this.state, showDialog: false})
                },
                {
                    type: 'primary',
                    label: '确认',
                    onClick: () => {
                        this.setState({...this.state, showDialog: false});
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

    componentWillUnmount() {
    }
    addChildren(winOrgInfo, exTends) {
        var objArray = [];
        for (const info in exTends) {
            for (const keys in winOrgInfo) {
                if (info == winOrgInfo[keys].key) {
                    var obj = {}
                    obj.value = exTends[info];
                    Object.assign(obj, winOrgInfo[keys])
                    objArray.push(obj)

                    this.setState({
                        ...this.state,
                        objArray
                    })
                }
            }
        }

    }

    renderRealInfo() {
        const user = this.props.user;
        let num_type = '';
        if(user.num_type) {
            switch(user.num_type) {
                case 1:
                    num_type='内地身份证';
                    break;
                case 2:
                    num_type='香港';
                    break;
                case 3:
                    num_type='澳门';
                    break;
                case 4:
                    num_type='台湾';
                    break;
                case 5:
                    num_type='护照';
                    break;
                default:
                    num_type='内地身份证';
                    break;
            }
        };
        return (
            <div className="page-profile-bottom-real-info-container">
                <div className="page-profile-title page-profile-realinfo-padding-top">实名认证信息</div>
                {
                    user.real_name ?
                        <div>
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">姓名</div>
                                <div className="page-profile-initial-fonts">{user.real_name ? user.real_name : ''}</div>
                            </div>
                            <div className="line1px"/>
                        </div> :
                        null
                }
                {
                    user.num_type ?
                        <div>
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">证件类型</div>
                                <div className="page-profile-initial-fonts">{num_type}</div>
                            </div>
                            <div className="line1px"/>
                        </div> :
                        null
                }
                {
                    user.id_number ?
                        <div>
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">身份证号</div>
                                <div className="page-profile-initial-fonts">{user.id_number ? user.id_number : ''}</div>
                            </div>
                            <div className="line1px"/>
                        </div> :
                        null
                }
                {
                        <div>
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">出生日期</div>
                                <div className="page-profile-edit-right-box" style={{justifyContent: 'flex-end'}}>{user.birthday}</div>
                            </div>
                            <div className="line1px"/>
                        </div>
                }
                {
                    user.sex ?
                        <div>
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">性别</div>
                                <div className="page-profile-initial-fonts">{user.sex ? sexName(user.sex) : ''}</div>
                            </div>
                            <div className="line1px"/>
                        </div> :
                        null
                }
                {
                    user.nation ?
                    <div>
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">民族</div>
                            <div className="page-profile-initial-fonts">{user.nation ? user.nation : ''}</div>
                        </div>
                        <div className="line1px"/>
                    </div>
                        : null
                }
                {
                    user.province_name ?
                        <div>
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">现住地址</div>
                                <div
                                    className="page-profile-initial-fonts">{user.province_name ? user.province_name : ''}-{user.city_name ? user.city_name : ''}-{user.county_name ? user.county_name : ''}</div>
                            </div>
                            <div className="line1px"/>
                            <div className="page-profile-header-box">
                                <div className="page-profile-fonts">详细地址</div>
                                <div className="page-profile-initial-fonts">{user.addr ? user.addr : ''}</div>
                            </div>
                            <div className="line1px"/>
                        </div>
                        : null
                }
                {this.renderRealInfoExtends()}

                <Link to="/my/profile/bind_profile/alert">
                    <div className="page-profile-apply-alert">修改资料</div>
                </Link>
                <Link to="/my/profile/applyAlert">
                    <div style={{textAlign: 'center',marginTop: '10px',textDecoration: 'underline'}}><a href="javascript:;">需要帮助？</a></div>
                </Link>
            </div>
        );
    }

    onPreview(e) {
        var src = e.target.getAttribute("data-key");
        var arr = [];
        if (!key) {
            key = '/images/my/register.png';
        }
        arr.push(src)
        this.setState({
            previewData: arr,
            showMultiple: true,
            defaultIndex: 0
        });
    }

    renderRealInfoExtends() {
        const userId = this.state.userId;
        const user = userId === 'user' ? this.props.user : this.props.otherfamily.data;


        return (
            <div className="page-profile-extends">
                {
                    user.extends !== null && this.state.objArray ?
                        <div>
                            {
                                this.state.objArray.map((item, index) => {
                                    switch (Number(item.type)) {
                                        //单项选择
                                        case 1:
                                            return (
                                                <div key={index}>
                                                    <div className="page-profile-header-box">
                                                        <div className="page-profile-fonts-single">{item.label}</div>
                                                    </div>
                                                    <div className="page-profile-fonts-view">{item.value}</div>

                                                    <div className="line1px"/>
                                                </div>
                                            );
                                            break;
                                        //多项选择
                                        case 2:
                                            return (
                                                <div key={index}>
                                                    <div className="page-profile-header-box">
                                                        <div className="page-profile-fonts-single">{item.label}</div>
                                                    </div>
                                                    <div className="page-profile-fonts-view">{item.value}</div>
                                                    <div className="line1px"/>
                                                </div>
                                            );
                                            break;
                                        //单行输入
                                        case 3:
                                            return (
                                                <div key={index}>
                                                    <div className="page-profile-header-box">
                                                        <div className="page-profile-fonts-single">{item.label}</div>
                                                    </div>
                                                    <div className="page-profile-fonts-view">{item.value}</div>
                                                    <div className="line1px"/>
                                                </div>
                                            );
                                            break;
                                        //多行输
                                        case 4:
                                            return (
                                                <div key={index}>
                                                    <div className="page-profile-header-box">
                                                        <div className="page-profile-fonts-single">{item.label}</div>
                                                    </div>
                                                    <div className="page-profile-fonts-view">{item.value}</div>
                                                    <div className="line1px"/>
                                                </div>
                                            );
                                            break;

                                        //上传图片
                                        case 5:
                                            return (
                                                <div key={index}>
                                                    <div className="page-profile-header-box">
                                                        <div className="page-profile-fonts-single">{item.label}</div>
                                                    </div>
                                                    <div className="page-profile-fonts-view-img">
                                                        <Avatar src={item.value} data-key={item.value}
                                                                size={{width: 80, radius: 1}} onClick={this.onPreview}/>

                                                    </div>
                                                    <div className="line1px"/>
                                                </div>
                                            );
                                            break;
                                        //日期空间
                                        case 6:
                                            return (
                                                <div key={index}>
                                                    <div className="page-profile-header-box">
                                                        <div className="page-profile-fonts">{item.label}</div>
                                                        <div className="page-profile-initial-fonts">{item.value}</div>
                                                    </div>
                                                    <div className="line1px"/>

                                                </div>
                                            );
                                            break;
                                        //日期时间空间
                                        case 7:
                                            return (
                                                <div key={index}>
                                                    <div className="page-profile-header-box">
                                                        <div className="page-profile-fonts">{item.label}</div>
                                                        <div className="page-profile-initial-fonts">{item.value}</div>
                                                    </div>
                                                    <div className="line1px"/>
                                                </div>

                                            );
                                            break;
                                        default:
                                            return
                                    }

                                })
                            }


                        </div>
                        : null
                }
            </div>
        )
    }

    onPhotoChange(avatar) {
        this.setState({
            avatar: avatar
        });
        const data = {
            avatars: avatar,
        };
        this.photo = avatar;
        this.props.imporvePersonInfo(data);
    }

    renderHost() {
        const user = this.props.user;
        let verifyRouter = "/my/profile/verify";

        if (window.orgCode === 'oBDbDkxal2') {
            verifyRouter = "/my/profile/verifyStarbucks";
        }
        return <div className="page-profile">
            <div>
                <div className="page-profile-title">基本信息</div>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">头像</div>
                    <div className="page-profile-header-uploade-box">
                        <UploadAvatar onChange={this.onPhotoChange} avatar={user.avatars}/>
                        <div className="page-profile-edit-icon"/>
                    </div>
                </div>
                <div className="line1px"/>
                {this.realRegister !== null && this.realRegister.real_name_register ? null :
                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">账号</div>
                        <div className="page-profile-edit-box">
                            <div className="page-profile-initial-fonts">
                                {user.username}
                            </div>
                            <div className="page-profile-initial-fonts-take-up"/>
                        </div>
                    </div>}
                {this.realRegister !== null && this.realRegister.real_name_register ? null : <div className="line1px"/>}

                <Link to="/my/profile/bind/phone">
                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">手机号</div>
                        <div className="page-profile-edit-box">
                            <div className="page-profile-initial-fonts">
                                {user.phone || ""}
                            </div>
                            <div className="page-profile-edit-icon"/>
                        </div>
                    </div>
                </Link>
                <div className="line1px"/>

                <Link to="/my/profile/bind/mail">
                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">邮箱</div>
                        <div className="page-profile-edit-box">
                            <div className="page-profile-initial-fonts">
                                {user.email || ""}
                            </div>
                            <div className="page-profile-edit-icon"/>
                        </div>
                    </div>
                </Link>
                <div className="line1px"/>

                <div className="page-profile-header-box">
                    <div className="page-profile-fonts">志愿者编号</div>
                    <div className="page-profile-edit-box">
                        <div className="page-profile-initial-fonts">
                            {user.identifier}
                        </div>
                        <div className="page-profile-initial-fonts-take-up"/>
                    </div>
                </div>
                <div className="line1px"/>
                {/* TODO: user.good_at == null*/}
                <Link to="" onClick={() => {
                    user.good_at != null && localStorage.setItem("goodAt", `${JSON.stringify(user.good_at)}`);
                    window.location.href = "/my/profile/checkbox";
                }}>
                    <div className="page-profile-header-box">
                        <div className="page-profile-fonts">个人擅长</div>
                        <div className="page-profile-edit-box">
                            {user.good_at != null ? user.good_at.map(
                                (item, index) => (
                                    <span
                                        key={index}
                                        className="page-profile-initial-fonts"
                                    >
                            {item.good_at_name}
                                        {index < user.good_at.length - 1
                                            ? "、"
                                            : ""}
                          </span>
                                )
                            ) : <span/>}
                            <div className="page-profile-edit-icon"/>
                        </div>
                    </div>
                </Link>
                <div className="line1px"/>

                <div>
                    <Link to="/my/profile/edit">
                        <div className="page-profile-header-box">
                            <div className="page-profile-fonts">志愿者口号</div>
                            <div className="page-profile-edit-icon"/>
                        </div>
                        <div className="page-profile-fonts-view">
                            {user.slogan}
                        </div>
                    </Link>
                </div>
            </div>
            {/* 通过开关判断用户是否实名注册显示渲染列表，或进去BTN */}
            <div className={cx({
                "page-profile-bottom": true,
                "page-profile-display-block":
                this.state.winOrgInfo !== null,
                "page-profile-display-none":
                this.state.winOrgInfo === null,
                "page-profile-display-extends-block":
                !user.id_number && this.state.winOrgInfo !== null,
                "page-profile-display-extends-none": user.id_number
            })}>
                <Link to={verifyRouter}>
                    <div className="page-profile-bottom-btn">
                        申请成为实名注册志愿者
                    </div>
                </Link>
            </div>

            <div className={cx({
                "page-profile-bottom": true,
                "page-profile-display-extends-block": user.id_number,
                "page-profile-display-extends-none ": !user.id_number
            })}>
                {this.renderRealInfo()}
            </div>
        </div>;
    }


    componentWillReceiveProps(nextProps) {
        const {failed: tFailed, fetching: tFetch} = this.props.alertPeopleInfo;
        const {failed: nFailed, fetching: nFetch} = nextProps.alertPeopleInfo;
        if (tFetch && !nFetch && !nFailed) {
            window.location.replace('/my/family');
        }
        const userId = this.state.userId;

        if (userId === 'user') {
            const detailData = nextProps.user;
            if (detailData && detailData.id && detailData.extends !== null) {
                if (this.state.winOrgInfo) {

                    this.addChildren(this.state.winOrgInfo.extends, detailData.extends);
                }
            }
        } else {
            const detailData = nextProps.otherfamily.data;
            if (detailData && detailData.id && detailData.extends !== null) {
                if (this.state.winOrgInfo) {

                    this.addChildren(this.state.winOrgInfo.extends, detailData.extends);
                }
            }
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
        if (this.alertPassword) {
            userPassword = this.state.userPassword;
            if (userPassword.length <= 5) {
                Alert.warning('密码最少6位');
                return;
            }
            data.pwd = userPassword;
        }
        if (this.alertRelations) {
            relations = this.state.relations;
            data.relation = relations;
        }
        if (!this.state.userPassword && !this.state.relations) {
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
                    <div className="page-profile-edit-right-box">{otherFamily.data.id_number.substring(0, 1)}***************{otherFamily.data.id_number.substring(17, 18)}</div>
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
                        <input type="password" defaultValue="123456" onKeyUp={this.onTextChange} ref={c => {
                            this.userPassword = c
                        }}/>
                    </div>
                </div>
                <div className="line1px"/>
                <div className="page-profile-header-box">
                    <div className="page-profile-fonts page-profile-fonts-main">关系</div>
                    <div className="page-profile-edit-right-box">
                        <label htmlFor="relations">
                            <select id="relations" onChange={this.handlePeopleClick} ref={(c) => {
                                this.relations = c;
                            }}>
                                {relations && relations.map((item, keys) =>
                                    <option value={item.name}
                                            selected={otherFamily.data.relation === item.name ? 'selected' : ''}
                                            key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px"/>
                {this.renderRealInfoExtends()}
                <div className="page-profile-edit-btn" onClick={() => {
                    this.setState({...this.state, showDialog: true})
                }}>修改
                </div>
                <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
                    确定要修改成员信息吗？
                </Dialog>
            </div>
        )
    }

    render() {
        const userId = this.userId;
        const BackButtonStyle = {
            display: "block",
            width: "100%",
            color: "white",
            border: "none",
            position: "absolute",
            top: "-55px",
            left: "0"
        };
        return (
            <div>
                {
                    userId === 'user' ?
                        this.renderHost()

                        : this.renderNewView()
                }
                <Gallery src={this.state.previewData} show={this.state.showMultiple} defaultIndex={this.state.defaultIndex}>
                    <Button
                        style={BackButtonStyle}
                        onClick={e => this.setState({ showMultiple: false })}
                        plain
                    >
                        Back
                    </Button>
                </Gallery>
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
        good_at: PropTypes.arrayOf(PropTypes.shape({})),
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
        good_at: PropTypes.arrayOf(PropTypes.shape({}))

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
        userDefinedInfo: state
    }),
    dispatch => bindActionCreators({
        requestUserInfo,
        imporvePersonInfo,
        otherFamilyAction,
        alertFamilyPeopleInfo
    }, dispatch),
)(Profile);
