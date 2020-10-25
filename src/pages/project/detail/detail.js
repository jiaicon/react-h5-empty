/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import Alert from "react-s-alert";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Dialog, ActionSheet } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";

import { connect } from "react-redux";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import WXShare from "../../../components/share";
import { parseTimeStringToDateString, getQueryString } from "../../../utils/funcs";
import "./detail.css";
import Link from "../../../components/link/link";
import Image from "../../../components/image/image";
import Avatar from "../../../components/avatar/avatar";
import Tab from "../../../components/tab/tab";
import CommunityItem from "../../../components/community_item/index";
import ShareTip from "../../../components/sharetip/sharetip";
import ModalNew from "../../../components/posterModal/ModalNew";
import { PostDataModel_Project } from "../../../components/posterModal/PostDataModel";
import {
    feelingAction,
    observeAction,
    unObserveAction,
    deleteFeelingAction
} from "../../my/circle/circle.store";
import {
    requestProjectDetail,
    collectProject,
    unCollectProject,
    joinProject,
    quitProject,
    saveProjectTabIndex
} from "./detail.store";
import { requestUserInfo } from "../../../stores/common";
import history from "../../history";
import { userCenterAction } from "../../my/my.store";
import { storeLoginSource } from "../../my/login/login.store";
import { translate } from 'react-i18next';
import i18next from 'i18next';

class ProjectDetailContent extends React.Component {
    static propTypes = {
        data: PropTypes.shape({})
    };
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {};
    }
    componentWillMount() {
        const { data: detailData, t } = this.props;
        var arr = [];
        for (let attr in detailData) {
            if (attr == "service_object_public" && detailData.service_object_public) {
                const serviceObjects = detailData.service_object
                    .map(obj => obj.service_object_name)
                    .join("、");
                arr.push({ label: t('服务对象'), value: serviceObjects, islast: false });
            } else if (attr == "join_end_public" && detailData.join_end_public) {
                arr.push({
                    label: t('招募截止'),
                    value: detailData.join_end,
                    islast: false
                });
            } else if (attr == "begin_public" && detailData.begin_public) {
                arr.push({
                    label: t('项目日期'),
                    value: `${parseTimeStringToDateString(
                        detailData.begin
                    )}-${parseTimeStringToDateString(detailData.end)}`,
                    islast: false
                });
            } else if (
                attr == "reward_time_public" &&
                detailData.reward_time_public
            ) {
                arr.push({
                    label: t('服务时长'),
                    value: `${detailData.reward_time}${t('小时')}`,
                    islast: false
                });
            } else if (
                attr == "contact_phone_public" &&
                detailData.contact_phone_public
            ) {
                arr.push({
                    label: t('联系人姓名'),
                    value: detailData.contact_name,
                    islast: false
                });
                arr.push({
                    label: t('联系人电话'),
                    value: detailData.contact_phone,
                    islast: false
                });
            }
        }
        if (arr && arr.length > 0) {
            arr[arr.length - 1].islast = true;
        }
        this.setState({
            content: arr.slice(0)
        });
    }
    render() {
        const { content } = this.state;
        const { data: detailData, t } = this.props;
        return (
            <div>
                <div className="project-detail-list">
                    <ul>
                        {content &&
                            content.length > 0 &&
                            content.map((item, index) => {
                                if (item.label === t('联系人电话')) {
                                    var temphref = `tel:${item.value}`;
                                    return (
                                        <li>
                                            <div className="item-point" />
                                            {item.islast ? null : <div className="line1px-v" />}

                                            <div style={{ display: "flex" }}>
                                                <div className="detail-title">{item.label}</div>
                                                <a className="detail-content" href={temphref}>{item.value}</a>
                                            </div>
                                        </li>
                                    );
                                }
                                return (
                                    <li>
                                        <div className="item-point" />
                                        {item.islast ? null : <div className="line1px-v" />}

                                        <div style={{ display: "flex" }}>
                                            <div className="detail-title">{item.label}</div>
                                            <div className="detail-content">{item.value}</div>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                    {detailData.volunteer_security_public ? (
                        <div className="project-guard">
                            <img src="/images/icon_safeguard.png" alt="保障" />
                            <span>{t('志愿保障')}</span>
                            <div className="line1px-v" />
                            <div className="guard-detail">
                                {detailData.volunteer_security
                                    ? detailData.volunteer_security
                                    : t('无')}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

class ProjectDetailPage extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.projectId = props.route.params.projectId;
        const {t} = props;
        this.state = {
            showShareTip: false,
            actionSheet: false,
            visible: false,
            menus: [],
            actions: [
                {
                    label: t('取消'),
                    onClick: this.hide
                }
            ],
            dialogType: true,
            showDialog: false
        };

        this.slickSettings = {
            dots: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 6000
        };

        this.dialog = {
            title: `${this.state.dialogType ? t('退出报名') : t('登录提示')}`,
            buttons: [
                {
                    type: "default",
                    label: t('取消'),
                    onClick: () => this.setState({ ...this.state, showDialog: false })
                },
                {
                    type: "primary",
                    label: t('确认'),
                    onClick: () => {
                        if (this.state.dialogType) {
                            this.setState({ ...this.state, showDialog: false });
                            this.props.quitProject(this.projectId);
                        } else {
                            this.setState({ ...this.state, showDialog: false });
                            this.props.storeLoginSource(`/project/detail/${this.projectId}`);

                            window.location.href = `/my/login`;
                        }
                    }
                }
            ]
        };
    }

    componentWillMount() {
      const {t} = this.props;
        if (window.userAgent) {
            this.setState({
                ...this.state,
                menus: [
                    {
                        label: t('转发给好友'),
                        onClick: () => {
                            this.setState(
                                {
                                    actionSheet: false
                                },
                                () => {
                                    this.handleShareClick();
                                }
                            );
                        }
                    },
                    {
                        label: t('分享到朋友圈'),
                        onClick: () => {
                            this.setState(
                                {
                                    actionSheet: false
                                },
                                () => {
                                    this.handleShareClick();
                                }
                            );
                        }
                    },
                    {
                        label: t('保存海报'),
                        onClick: () => {
                            this.setState(
                                {
                                    actionSheet: false,
                                    visible: true,
                                },
                                () => {
                                    // this.showModal();
                                })
                        }
                    }
                ]
            });
        } else {
            this.setState({
                ...this.state,
                menus: [
                    {
                        label: t('保存海报'),
                        onClick: () => {
                            console.log(1222)
                            this.setState(
                                {
                                    actionSheet: false,
                                    visible: true
                                },
                                () => {
                                    console.log(this.state.visible)
                                    // this.showModal();
                                }
                            );
                        }
                    }
                ]
            });
        }

        const {
            detail: { data: detailData, tabIndex, lastProjectId },
            user
        } = this.props;
        if (user.isLogin) {
            this.props.requestUserInfo();
        }
        this.props.feelingAction({
            type: 2,
            relation_id: this.projectId,
            page_size: 1000
        });
        this.props.requestProjectDetail(this.projectId);
        if (lastProjectId === 0) {
            this.props.saveProjectTabIndex(0, this.projectId);
        } else if (lastProjectId !== this.projectId) {
            this.props.saveProjectTabIndex(0, this.projectId);
        } else if (lastProjectId === this.projectId) {
            this.props.saveProjectTabIndex(tabIndex, this.projectId);
        }
    }

    onTabChange(idx) {
        this.props.saveProjectTabIndex(idx);
    }
    hide() {
        this.setState({ actionSheet: false });
    }
    componentWillReceiveProps(nextProps) {
        const newProjectId = nextProps.route.params.projectId;
        if (newProjectId !== this.projectId) {
            this.projectId = newProjectId;
            this.props.requestProjectDetail(this.projectId);
        }
        const detailData = nextProps.detail.data;
        if (
            detailData &&
            detailData.id === parseInt(this.projectId, 10) &&
            !this.wxRegistered
        ) {
            document.title = detailData.name;
            if (window.userAgent) {
                wx.ready(() => {
                    WXShare({
                        title: detailData.name,
                        desc: detailData.content,
                        image: detailData.photo && detailData.photo[0],
                        success: () => this.hideShareTip()
                    });
                });
            }

            this.wxRegistered = true;
        }
        const { deleteFeeling: LdeleteFeeling } = this.props;
        const { deleteFeeling: NdeleteFeeling } = nextProps;
        // const { detail: {fetching: lastFetch, failed: lastFailed} } = this.props.de;
        // const { detail: {fetching: nextFetch, failed: nextFailed} } = nextProps;
        // if(!lastFailed && lastFetch && !nextFailed && !nextFetch) {
        //     this.props.requestProjectDetail(this.projectId);
        // }
        if (
            LdeleteFeeling.fetching &&
            !NdeleteFeeling.fetching &&
            !NdeleteFeeling.failed
        ) {
            window.location.replace(`/project/detail/${this.projectId}`);
        }

        const { observe: Lobserve, unObserve: LunObserve } = this.props;
        const { observe: Nobserve, unObserve: NunObserve } = nextProps;
        if (Lobserve.fetching && !Nobserve.fetching && !Nobserve.failed) {
            this.props.feelingAction({
                type: 2,
                relation_id: this.projectId,
                page_size: 1000
            });
        }
        if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
            this.props.feelingAction({
                type: 2,
                relation_id: this.projectId,
                page_size: 1000
            });
        }
    }
    componentDidMount() {
        console.log(getQueryString('visible'));
        if (getQueryString('visible')) {
            this.setState({
                visible: true,
            });
        }
    }

    componentWillUnmount() {
        // document.title = '标题';
    }

    handleFavoriteClick() {
        const {
            detail: { data: detailData }
        } = this.props;

        if (detailData.collection_status) {
            this.props.unCollectProject(detailData.id);
        } else {
            this.props.collectProject(detailData.id);
        }
    }

    hideShareTip() {
        this.setState({
            ...this.state,
            showShareTip: false
        });
    }

    handleShareClick() {
        // eslint-disable-line
        this.setState({
            ...this.state,
            showShareTip: true
        });
    }
    handleActionClickSitch(action, projectId, customConfig, paymentConfig) {
        if (action === "join") {
            if (projectId == 1035) {
                window.location.href = "http://lxi.me/17i1a";
                return;
            } else if (projectId == 1043) {
                window.location.href = "http://lxi.me/4hwr6";
                return;
            } else if (projectId == 2129) {
                window.location.href =
                    "http://wx.zgzyzfw.n.gongyibao.cn/#/donform?accId=cc0b9f9a-2cef-4b0c-829f-d2f29ee87534&proId=bdb2cac7-ac34-4446-bcd9-5d3ee4f4c3ad&paymethod=1&projectTitle=%E5%BE%AE%E7%88%B1%E7%89%B5%E6%89%8B&rf=0.30765105282089134";
                return;
            }
            if (!customConfig && !paymentConfig) {
                const {
                    detail: { data: detailData }
                } = this.props;
                this.props.joinProject(projectId, detailData.join_verify_status);
            } else if (customConfig || paymentConfig) {
                // window.location.replace(`/project/signup/${projectId}`)
                window.location.href = `/project/signup/${projectId}`;
                // history.replace(`/project/signup/${projectId}`)
            }
        } else if (action === "quit") {
            this.setState({ ...this.state, showDialog: true });
        }
    }
    handleActionClick(action) {
        const { projectId } = this;
        const realRegister = window.orgInfo.real_name_register;
        const {
          user,
          detail: { data: detailData },
          t,
        } = this.props;
        const customConfig = detailData.custom_config || null;
        const paymentConfig = detailData.custom_payment_config || null;

        return () => {
            // in_blacklist 黑名单 0不在，1在
            // realRegister 机构实名 1 要求  0 否

            if (!user.isLogin) {
                this.props.storeLoginSource(`/project/detail/${this.projectId}`);
                history.replace("/my/login");
                // this.props.userCenterAction();
            } else if (user.isLogin && !user.in_blacklist) {
                // 不要求实名
                if (realRegister == 0) {
                    this.handleActionClickSitch(
                        action,
                        projectId,
                        customConfig,
                        paymentConfig
                    );
                    // 要求实名切用户未实名过，通过ID判断
                } else if (realRegister == 1 && user.isLogin) {
                    // 验证自定义信息必填
                    const custom_config = window.orgInfo.custom_config;
                    let isVerify = false;
                    if (custom_config.open_id_number && !user.id_number.length) {
                        isVerify = true;
                    }
                    if (custom_config.open_real_name && !user.real_name.length) {
                        isVerify = true;
                    }
                    if (custom_config.open_nation && !user.nation.length) {
                        isVerify = true;
                    }
                    if (custom_config.open_avatars && !user.avatars.length) {
                        isVerify = true;
                    }
                    if (custom_config.open_addr && !user.addr.length) {
                        isVerify = true;
                    }
                    let is_has_required = false;
                    custom_config.extends && custom_config.extends.length && custom_config.extends.forEach(item => {
                        if (item.is_required) {
                            is_has_required = true;
                        }
                    })
                    if (is_has_required && !user.extends) {
                        isVerify = true;
                    }
                    if (user.extends && is_has_required) {
                        custom_config.extends.forEach(item => {
                            if (item.is_required && (!user.extends[item.key] || (user.extends[item.key] && !user.extends[item.key].length))) {
                                isVerify = true;
                            }
                        })
                    }
                    this.props.storeLoginSource(`/project/detail/${this.projectId}`);
                    if (isVerify && user.have_pwd == 1) {
                        let bindlink = '/my/profile/bind_profile/alert';
                        if (window.orgCode === 'oBDbDkxal2') {
                          bindlink = '/my/profile/bind_profile_starbucks/alert';
                        }
                        if (window.orgCode === 'mWZdPNwaKg') {
                          bindlink = '/my/profile/bind_profile_BMW/alert';
                        }
                        window.location.replace(bindlink);
                    } else if (isVerify) {
                        window.location.replace(`/my/profile/verify`);

                        let bindlink = '/my/profile/verify';
                        if (window.orgCode === 'oBDbDkxal2') {
                            bindlink = '/my/profile/verifyStarbucks';
                        }
                        if (window.orgCode === 'mWZdPNwaKg') {
                            bindlink = '/my/profile/verifyBMW';
                        }
                        window.location.replace(bindlink);
                    } else {
                        this.handleActionClickSitch(
                            action,
                            projectId,
                            customConfig,
                            paymentConfig
                        );
                    }
                }
            } else if (user.isLogin && user.in_blacklist) {
                Alert.warning(t('您已被添加到黑名单，请联系客服'));
            }
        };
    }

    renderSlick() {
        const {
            detail: { data: detailData }
        } = this.props;
        if (!detailData.photo || !detailData.photo.length) {
            return <div className="slick-container slick-container-empty" />;
        }

        return (
            <div className="slick-container">
                <Slick {...this.slickSettings}>
                    {detailData.photo.map((item, index) => (
                        <Image
                            key={index}
                            src={item}
                            className="image"
                            defaultSrc="/images/default_banner.png"
                        />
                    ))}
                </Slick>
            </div>
        );
    }
    showModal() {
        this.setState({
            ...this.state,
            visible: true,
        })
    }
    closeModal() {
        this.setState({
            ...this.state,
            visible: false
        })
    }
    renderModal() {
        const {
            detail: { data: detailData, tabIndex },
            user
        } = this.props;

        const postData = PostDataModel_Project(detailData, user);
        return this.state.visible ? <ModalNew postData={postData} visible={this.state.visible} maskCloseable={this.closeModal} /> : null;
    }
    handleActionClickTwo() {
        window.location.href =
            "http://wx2.gongyibao.cn/H5page/ProdetailsNew.aspx?id=bf014416-f7c9-49ff-a326-c18e77f223b0";
    }
    renderTwoBtn() {
      const {t} = this.props;
        return (
            <div className="project-action-main-two">
                <Link
                    to=""
                    onClick={this.handleActionClickTwo}
                    className={`project-action-main project-action-main-color`}
                >
                  {t('我要捐款')}
                </Link>
                <Link
                    to=""
                    onClick={this.handleActionClick("join")}
                    className={`project-action-main project-action-available`}
                >
                  {t('我要报名')}
                </Link>
            </div>
        );
    }
    renderBasic() {
        const {
          detail: { data: detailData, tabIndex },
          user: { isLogin },
          t,
        } = this.props;
        const currentProjectId = parseInt(this.projectId, 10);
        const dataProjectId = detailData ? detailData.id : "";

        if (currentProjectId !== dataProjectId) {
            return null;
        }

        const content = detailData.content;
        // join_status: [integer] 0审核中 1通过 2驳回, 详情页下发，登陆后如加入项目才有此字段
        // activity_status: [integer] 活动状态 1 招募中，2进行中 3已结束
        const joined =
            isLogin && (detailData.join_status === 0 || detailData.join_status === 1);
        const fulled = detailData.join_people_count === detailData.people_count;
        const serviceCategories = detailData.category.map(
            category => category.service_category_name
        );

        let actionLabel = "";
        let actionClassName = "";
        let action = "";
        if (detailData.activity_status === 3 || detailData.project_status === 5) {
            actionLabel = t('已结束');
            actionClassName = "project-action-end";
        } else if (!joined && detailData.project_status === 4) {
            actionLabel = t('已满员');
            actionClassName = "project-action-full";
        } else if (!joined && detailData.project_status === 3) {
            actionLabel = t('进行中');
            actionClassName = "project-action-full";
        } else if (!joined && detailData.project_status === 6) {
            actionLabel = t('招募截止');
            actionClassName = "project-action-full";
        } else if (!joined && detailData.project_status > 9) {
            actionLabel = t('项目审核中');
            actionClassName = "project-action-full";
        } else if (!joined) {
            actionLabel = t('我要报名');
            actionClassName = "project-action-available";
            action = "join";
        } else if (isLogin && detailData.join_status === 0 && detailData.join_verify_status === 1) {
            actionLabel = t('等待审核');
            actionClassName = "project-action-audit";
        } else if (joined) {
            actionLabel = t('我要退出');
            actionClassName = "project-action-quit";
            action = "quit";
        }
        if (detailData.id === 2129) {
            actionLabel = t('申请助养');
            action = "join";
        }
        if (detailData.id === 2009) {
            action = "two";
        }
        return (
            <div>
                <div className="header">
                    {this.renderSlick()}
                    <Link
                        to={`/team/detail/${detailData.team.id}`}
                        className="header-addition"
                    >
                        <div className="team-info">
                            <Avatar
                                src={detailData.team.logo}
                                size={{ width: 30, radius: 4 }}
                            />
                            <span style={{ marginLeft: "10px" }}>{detailData.team.name}</span>
                        </div>
                        <img src="/images/my/more.png" />
                    </Link>
                </div>
                <div className="body">
                    <div className="project-name">{detailData.name}</div>
                    <div className="project-category">
                        <div style={{ color: "#666666", marginBottom: "4px" }}>
                            {detailData.category_public
                                ? `# ${serviceCategories.join("、")}`
                                : null}
                        </div>
                        <div>{detailData.created_at.split(" ")[0]}</div>
                    </div>

                    {detailData.addr_public ? (
                        <div className="project-category">
                            <div
                                style={{
                                    background: "url(/images/projectdetailaddr.png) no-repeat",
                                    backgroundSize: "8px 13px",
                                    paddingLeft: "15px",
                                    backgroundPosition: "3px 3px"
                                }}
                            >
                                {detailData.addr}
                            </div>
                        </div>
                    ) : null}

                    <ProjectDetailContent data={detailData} t={t} />

                    {detailData.people_count_public ? (
                        <div className="project-report">
                            <span>{t('已录用人数')}</span>
                            <div>
                                <span>{detailData.join_people_count}</span>/
                                <span>{detailData.people_count}</span>
                            </div>
                        </div>
                    ) : null}
                    {!detailData.people_count_public ? (
                        <div
                            style={{ width: "100%", height: "5px", background: "#f8f8f8" }}
                        />
                    ) : null}
                    <div className="project-description">
                        <div>{t('项目介绍')}</div>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: content
                                    ? content.replace(/(\n+)/g, "<br/>")
                                    : t('暂无介绍')
                            }}
                        />
                    </div>
                    <div className="project-description-backhome">
                        <Link to="/" />
                    </div>
                    <div className="project-description-takeup" />
                </div>
                <div className="foot">
                    <div className="line1px" />
                    <Link
                        to=""
                        onClick={this.handleFavoriteClick}
                        className="project-action project-action-favorite"
                    >
                        <span
                            className={classnames({
                                selected: detailData.collection_status
                            })}
                        />
                        <span>{t('收藏')}</span>
                    </Link>
                    <Link
                        to=""
                        onClick={e =>
                            this.setState({
                                visible: true
                            })
                        }
                        className="project-action project-action-share"
                    >
                        <span />
                        <span>{t('分享')}</span>
                    </Link>

                    {action === "two" ? (
                        this.renderTwoBtn()
                    ) : (
                            <Link
                                to=""
                                onClick={this.handleActionClick(action)}
                                className={`project-action-main ${actionClassName}`}
                            >
                                {actionLabel}
                            </Link>
                        )}
                </div>
            </div>
        );
    }
    onPublish() {
        const {
            user: { isLogin }
        } = this.props;
        if (isLogin) {
            window.location.replace(`/my/circlepublish/2/${this.projectId}`);
        } else {
            this.setState({ ...this.state, dialogType: false, showDialog: true });
        }
    }
    delete(id) {
        this.props.deleteFeelingAction(id);
    }
    onParse(id) {
        this.props.observeAction(id);
    }
    unOnParse(id) {
        this.props.unObserveAction(id);
    }
    renderCommunity() {
      const {t} = this.props;
        return (
            <div>
                {this.props.feeling.data &&
                    this.props.feeling.data.list &&
                    this.props.feeling.data.list.length > 0 &&
                    this.props.feeling.type == "project" ? (
                        this.props.feeling.data.list.map(listData => (
                            <CommunityItem
                                data={listData}
                                isDetailEntry={false}
                                key={listData.id}
                                routeData={this.props.route}
                                isDescTrigger={false}
                                onDeleteClick={this.delete}
                                onParseClick={this.onParse}
                                onUnParseClick={this.unOnParse}
                            />
                        ))
                    ) : (
                        <div className="page-circle-rendercommunity-container">
                            <img
                                src="/images/my/information.png"
                                className="page-circle-rendercommunity-img"
                            />
                            <div className="page-circle-rendercommunity-info">
                              {t('还没有动态信息')}
                        </div>
                        </div>
                    )}

                <div
                    className="page-project-detail-community-link"
                    onClick={this.onPublish}
                />
            </div>
        );
    }
    render() {
        const {
            detail: { data: detailData, tabIndex },
          t
        } = this.props;

        const currentProjectId = parseInt(this.projectId, 10);
        const dataProjectId = detailData ? detailData.id : "";

        if (currentProjectId !== dataProjectId) {
            return null;
        }

        return (
            <div className="page-project-detail">
                <Tab
                    tabs={[
                        { label: t('项目详情'), component: this.renderBasic() },
                        { label: t('项目社区'), component: this.renderCommunity() }
                    ]}
                    onChange={this.onTabChange}
                    selectedIndex={tabIndex}
                />
                {this.state.showShareTip ? (
                    <ShareTip onClick={this.hideShareTip} />
                ) : null}
                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={this.state.actionSheet}
                    type="ios"
                    onRequestClose={e => this.setState({ actionSheet: false })}
                />
                <Dialog
                    type="ios"
                    title={this.dialog.title}
                    buttons={this.dialog.buttons}
                    show={this.state.showDialog}
                >
                    {this.state.dialogType
                        ? t('确定要退出项目吗') + '？'
                        : t('只有登录的用户才能点赞和评论哦～')}
                </Dialog>
                {this.renderModal()}
            </div>
        );
    }
}

ProjectDetailPage.propTypes = {
    requestProjectDetail: PropTypes.func,
    feelingAction: PropTypes.func,
    collectProject: PropTypes.func,
    unCollectProject: PropTypes.func,
    joinProject: PropTypes.func,
    saveProjectTabIndex: PropTypes.func,
    requestUserInfo: PropTypes.func,
    quitProject: PropTypes.func,
    detail: PropTypes.shape({
        fetchingId: PropTypes.string,
        data: PropTypes.shape({}),
        tabIndex: PropTypes.number
    }),
    user: PropTypes.shape({
        isLogin: PropTypes.bool
    }),
    route: PropTypes.shape({
        params: PropTypes.shape({
            projectId: PropTypes.string
        })
    })
};

ProjectDetailPage.title = i18next.t("项目详情");

export default connect(
    state => ({
        detail: state.project.detail,
        user: state.user,
        feeling: state.circle.feeling,
        observe: state.circle.observe,
        unObserve: state.circle.unObserve,
        deleteFeeling: state.circle.deleteFeeling
    }),
    dispatch =>
        bindActionCreators(
            {
                requestProjectDetail,
                collectProject,
                unCollectProject,
                joinProject,
                quitProject,
                saveProjectTabIndex,
                feelingAction,
                observeAction,
                unObserveAction,
                userCenterAction,
                deleteFeelingAction,
                requestUserInfo,
                storeLoginSource
            },
            dispatch
        )
)(translate('translations')(ProjectDetailPage));