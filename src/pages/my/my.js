/**
 * @file 个人中心入口页面
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import history from '../history';

import {userCenterAction} from './my.store';
import {requestUserInfo} from '../../stores/common';
import Link from '../../components/link/link';
import Star from '../../components/star/star';
import './my.css';
import Avatar from '../../components/avatar/avatar';
import ModalNew from './../../components/ModalNew/ModalNew';
import {Dialog, Gallery, GalleryDelete, Button, Icon} from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";


// 机构码
const orgCode = window.orgCode;
const scoreName = window.orgInfo.score_name;

class MyPage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = ({
            showMultiple: false,
            previewData: [],
            visible: false,
            visibleInstruction: false
        });
    }

    componentWillMount() {
        this.props.requestUserInfo();
        this.props.userCenterAction();
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() {
        this.setState({
            visible: false,
            visibleInstruction: false
        })
    }

    renderPageMymessagesTemplate() {
        return (
            <div className="page-my-header-messages-container">
                {this.props.usercenter.data === null ?
                    <span/> :
                    <span
                        className={classnames({
                            'page-my-header-messages-red-point': this.props.usercenter.data.msg_count >= 1,
                        })
                        }
                    />
                }
            </div>
        );
    }

    onPreview(e) {
        var key = e.target.getAttribute("data-key");
        var arr = [];
        if (!key) {
            key = '/images/my/register.png';
        }
        arr.push(key);
        this.setState({
            previewData: arr,
            showMultiple: true,
            defaultIndex: 0
        });
    }

    showCommonweal() {
        this.setState({
            visible: true,
            visibleInstruction: false
        })
    }

    renderPageMyphotoTemplate() {
        const {user} = this.props;
        return (
            <div className="page-my-photo-container">
                <Avatar src={user.avatars ? user.avatars : ''}
                        data-key={user.avatars || ''} size={{width: 80, radius: 8}}
                        defaultSrc="/images/my/register.png" onClick={this.onPreview}/>
                <div className="page-my-user-info">
                    <p className="page-my-user-info-nick"
                       onClick={this.showCommonweal}>{user.real_name || user.username || '未设置昵称'}<p
                        className="page-my-user-info-nick-commonweal">公益大使</p></p>
                    <p className="page-my-user-info-signature">{user.slogan || '未设置口号'}</p>
                    <div className="page-my-user-info-star">
                        {
                            user.stars ?
                                <Star size={{width: 15, height: 14, score: user.stars}} isBlockEmptyStar/> : null
                        }

                    </div>
                </div>
                <div className="page-my-user-info-nick-commonweal-medal"><Link to="/my/achievemet"><img src="/images/my/commonweal-medal.png" alt=""/><span
                    className="page-my-user-info-nick-commonweal-medal-word">55枚</span></Link></div>
            </div>
        );
    }

    renderPageMyRecordTemplate() {
        const {user} = this.props;
        return (
            <div className="page-my-record-container">

                <Link to="/my/teams">
                    <div className="page-my-record-item">
                        <p className="page-my-record-item-top"><b
                            className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.team_count}</b>个
                        </p>
                        <p className="page-my-record-item-bottom">我的团队</p>
                    </div>
                </Link>

                <Link to="/my/projects">
                    <div className="page-my-record-item">
                        <p className="page-my-record-item-top"><b
                            className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.project_count}</b>个
                        </p>
                        <p className="page-my-record-item-bottom">我的项目</p>
                    </div>
                </Link>
                <Link to="/my/duration">
                    <div className="page-my-record-item">
                        <p className="page-my-record-item-top"><b
                            className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.user.reward_time}</b>小时
                        </p>
                        <p className="page-my-record-item-bottom">志愿时长</p>
                    </div>
                </Link>
                {/* <!-- 积分入口 --> */}
                <Link to="/my/point">
                    <div className="page-my-record-item">
                        <p className="page-my-record-item-top"><b
                            className="page-my-record-item-num">{this.props.usercenter.data == null ? 0 : this.props.usercenter.data.user.score}</b> {scoreName || '星币'}
                        </p>
                        <p className="page-my-record-item-bottom">志愿{scoreName || '星币'}</p>
                    </div>
                </Link>
            </div>
        );
    }

    renderPageMyTop() {
        const {user} = this.props;
        return (
            <div>
                {/*<div className="page-my-header">*/}

                {/*<Link to="/my/setting">*/}
                {/*<div className="page-my-header-setting" />*/}
                {/*</Link>*/}

                {/*<Link to="/my/messages">*/}
                {/*{this.renderPageMymessagesTemplate()}*/}
                {/*</Link>*/}

                {/*</div>*/}

                <div>
                    {this.renderPageMyphotoTemplate()}
                </div>
                {this.renderPageMyRecordTemplate()}
            </div>
        );
    }

    renderPageMyContainer() {
        const {user} = this.props;
        return (
            <ul className="page-my-item-container">
                <li>
                    <div>
                        <Link to="/my/circle">
                            <div className="page-my-item-box">
                                <i className="page-my-item-icon page-my-item-icon-circle">
                                    {this.props.usercenter.data === null ?
                                        <span/> :
                                        <span
                                            className={classnames({
                                                'page-my-item-icon-circle-red-point': this.props.usercenter.data.comment_count >= 1,
                                            })
                                            }
                                        />
                                    }

                                </i>我的志愿圈
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>

                <li>
                    <div>
                        <Link to="/my/messages">
                            <div className="page-my-item-box">
                                {this.renderPageMymessagesTemplate()}
                                我的消息
                                {/*<i className="page-my-item-icon page-my-item-icon-news" />我的消息*/}
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>

                <li>
                    <div>
                        <Link to="/my/profile/detail/user">
                            <div className="page-my-item-box">
                                <i className="page-my-item-icon page-my-item-icon-data"/>个人资料
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>
                <li>
                    <div onClick={this.hasntIdnumber}>
                        <Link to="/my/certificate">
                            <div className="page-my-item-box">
                                <i className="page-my-item-icon page-my-item-icon-certificate"/>我的证书
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>
                <li>
                    <div>
                        <Link to="/my/family">
                            <div className="page-my-item-box">
                                <i className="page-my-item-icon page-my-item-icon-family"/>我的家庭
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>
                <li>
                    <div>
                        <Link to="/my/collects">
                            <div className="page-my-item-box">
                                <i className="page-my-item-icon page-my-item-icon-like"/>我的收藏
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>
                <li>
                    <div>
                        <Link to="/my/duration/applys">
                            <div className="page-my-item-box">
                                <i className="page-my-item-icon page-my-item-icon-applys"/>申请志愿时长
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>
                {
                    orgCode === 'wMvbmOeYAl' ?
                        <li/> :
                        <li>
                            <div>
                                <Link to="/my/service">
                                    <div className="page-my-item-box">
                                        <i className="page-my-item-icon page-my-item-icon-service"/>服务中心
                                    </div>
                                    <span className="page-my-item-big"/>
                                </Link>
                            </div>
                        </li>
                }
                <li>
                    <div>
                        <Link to="/my/setting">
                            <div className="page-my-item-box">
                                <i className="page-my-item-icon page-my-item-icon-setting"/>设置
                            </div>
                            <span className="page-my-item-big"/>
                        </Link>
                        <div className="line1px"/>
                    </div>
                </li>
            </ul>
        );
    }

    closeModalNew() {
        this.setState({
            visible: false
        })
    }

    renderCommonwealLevel() {
        return <div className="commonweal-box">
            <div className="commonweal-box-close" onClick={this.closeModalNew}><img src="/images/my/delete.png" alt=""/>
            </div>
            <div className="commonweal-box-level">
                <div>
                    <p style={{textAlign: 'left'}}>当前等级</p>
                    <p>Lv.22 志愿大使</p>
                </div>
                <div>
                    <p style={{textAlign: 'right'}}>成长值</p>
                    <p>13200/15000</p>
                </div>
            </div>
            <div className="commonweal-box-bar">
                <div style={{width: '10%'}} className="commonweal-box-bar-active"></div>
            </div>
            <div className="commonweal-box-level commonweal-box-level-next">
                <div>
                    <p style={{textAlign: 'left'}}>Lv.22</p>
                    <p>志愿大使</p>
                </div>
                <div>
                    <p style={{textAlign: 'right'}}>Lv.23</p>
                    <p>志愿元老</p>
                </div>
            </div>
            <div className="line1px"></div>
            <div className="commonweal-box-growUp">
                <div className="commonweal-box-growUp-word">成长体系</div>
                <div className="commonweal-box-growUp-box">
                    <div className="commonweal-box-growUp-box-bar">
                        <div style={{height: '18px'}} className="commonweal-box-growUp-box-bar-middle">
                            <div className="commonweal-box-growUp-box-bar-top">志愿新秀</div>
                        </div>
                        <div className="commonweal-box-growUp-box-bar-bot">Lv.0</div>
                    </div>
                    <div className="commonweal-box-growUp-box-bar">
                        <div style={{height: '37px'}} className="commonweal-box-growUp-box-bar-middle">
                            <div className="commonweal-box-growUp-box-bar-top">志愿实习生</div>
                        </div>
                        <div className="commonweal-box-growUp-box-bar-bot">Lv.1</div>
                    </div>
                    <div className="commonweal-box-growUp-box-bar">
                        <div style={{height: '57px'}} className="commonweal-box-growUp-box-bar-middle">
                            <div className="commonweal-box-growUp-box-bar-top">志愿精英</div>
                        </div>
                        <div className="commonweal-box-growUp-box-bar-bot">Lv.2</div>
                    </div>
                    <div className="commonweal-box-growUp-box-bar">
                        <div style={{height: '78px'}} className="commonweal-box-growUp-box-bar-middle">
                            <div className="commonweal-box-growUp-box-bar-top commonweal-box-growUp-box-bar-top-active">
                                志愿大使
                            </div>
                        </div>
                        <div className="commonweal-box-growUp-box-bar-bot">Lv.3</div>
                    </div>
                    <div className="commonweal-box-growUp-box-bar">
                        <div style={{height: '104px'}} className="commonweal-box-growUp-box-bar-middle">
                            <div className="commonweal-box-growUp-box-bar-top">志愿元老</div>
                        </div>
                        <div className="commonweal-box-growUp-box-bar-bot">Lv.4</div>
                    </div>
                    <div className="commonweal-box-growUp-box-bar">
                        <div style={{height: '126px'}} className="commonweal-box-growUp-box-bar-middle">
                            <div className="commonweal-box-growUp-box-bar-top">志愿王者</div>
                        </div>
                        <div className="commonweal-box-growUp-box-bar-bot">Lv.5</div>
                    </div>
                </div>
            </div>
            <div className="commonweal-box-growUp-more">您可以通过更多志愿行为来获得成长值</div>
            <div className="commonweal-box-growUp-red" onClick={this.instruction}>查看成长值获得方法</div>
        </div>
    }

    instruction() {
        this.setState({
            visibleInstruction: true,
        })
    }
    closeModalNewInstruction() {
        this.setState({
            visibleInstruction: false
        })
    }
    renderInstruction() {
        const data = [{label: '志愿时长', value: '10'}, {label: '发表动态', value: '10'}, {
            label: '每日登陆',
            value: '10'
        }, {label: '连续登陆3天', value: '30'}, {label: '分享一次', value: '50'}, {
            label: '实名认证',
            value: '100'
        }, {label: '解锁1级成就1次', value: '200'}, {label: '解锁1级成就2次', value: '400'}, {label: '解锁1级成就3次', value: '1000'}]
        return <div className="commonweal-box">
            <div className="commonweal-box-close" onClick={this.closeModalNewInstruction}><img src="/images/my/delete.png" alt=""/>
            </div>
            <div className="commonweal-box-instruction-how">如何获得成长值？</div>
            <div className="commonweal-box-instruction-list">下列操作可以帮你获得成长值：</div>
            <div className="commonweal-box-instruction-table">
                <table>
                    <thead>
                    <tr>
                        <td>操作</td>
                        <td>获得成长值</td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => <tr>
                        <td>{item.label}</td>
                        <td>{item.value}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="commonweal-box-instruction-btn" onClick={this.closeModalNewInstruction}>我知道了</div>
        </div>
    }

    renderModalInstruction() {
        return <ModalNew maskCloseable={true}
                         visible={this.state.visibleInstruction}
                         platform="ios"
                         transparent={true}
                         animationType="slide"
        >
            {this.renderInstruction()}
        </ModalNew>
    }

    renderModal() {
        return <ModalNew maskCloseable={true}
                         visible={this.state.visible}
                         platform="ios"
                         transparent={true}
                         animationType="slide"
        >
            {this.renderCommonwealLevel()}
        </ModalNew>
    }

    render() {
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
            <div className="page-my">
                <div className="page-my-top">
                    {this.renderPageMyTop()}
                </div>
                <div className="page-my-line"/>
                <div className="page-my-item-container-padding">
                    {this.renderPageMyContainer()}
                    <Gallery src={this.state.previewData} show={this.state.showMultiple}
                             defaultIndex={this.state.defaultIndex}>
                        <Button
                            style={BackButtonStyle}
                            onClick={e => this.setState({showMultiple: false})}
                            plain
                        >
                            Back
                        </Button>
                    </Gallery>
                </div>
                {this.renderModal()}
                {this.renderModalInstruction()}
            </div>
        );
    }
}


MyPage.title = '个人中心';

MyPage.propTypes = {
    userCenterAction: PropTypes.func,
    requestUserInfo: PropTypes.func,
    user: PropTypes.shape({
        data: PropTypes.shape({
            isLogin: PropTypes.bool,
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
    }),
    usercenter: PropTypes.shape({
        data: PropTypes.shape({
            msg_count: PropTypes.number,
            project_count: PropTypes.number,
            team_count: PropTypes.number,
            user: PropTypes.shape({
                addr: PropTypes.string,
                avatars: PropTypes.string,
                birthday: PropTypes.string,
                province_id: PropTypes.number,
                province_name: PropTypes.string,
                city_id: PropTypes.number,
                city_name: PropTypes.string,
                county_id: PropTypes.number,
                county_name: PropTypes.string,
                token: PropTypes.string,
                good_at: PropTypes.arrayOf(PropTypes.shape({})),
                family_id: PropTypes.number,
                id: PropTypes.number,
                id_number: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                ]),
                identifier: PropTypes.string,
                join_family_time: PropTypes.string,
                nation: PropTypes.string,
                phone: PropTypes.string,
                real_name: PropTypes.string,
                reward_time: PropTypes.string,
                sex: PropTypes.number,
                slogan: PropTypes.string,
                username: PropTypes.string,
            }),
        }),
    }),

};

export default connect(
    state => ({
        usercenter: state.my.usercenter,
        user: state.user,
    }),
    dispatch => bindActionCreators({
            userCenterAction,
            requestUserInfo
        },
        dispatch),
)(MyPage);
