import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import Alert from 'react-s-alert';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalNew from './../../../components/ModalNew/ModalNew';
import "./achievemet.css";
import {getAchievement, getAchievementHas, getAchieveInfo} from './achievement.store';
import {requestUserInfo} from '../../../stores/common';
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import {ImageToBase64, getQueryString} from "../../../utils/funcs";
import Link from '../../../components/link/link';


class Achievement extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            visible: false,
            shareVisible: false,
            qrcodeURL: '',
            dataUrl: ''
        };
    }

    componentWillMount() {
        this.props.getAchievement();
        this.props.getAchievementHas();
        this.props.requestUserInfo();
    }

    createQrcode = (callback) => {
        const that = this;
        let canvas = document.createElement("canvas");
        QRCode.toCanvas(
            canvas,
            `${window.location.protocol}//${window.location.host}/my`,
            function (err) {
                if (!err) {
                    // 证明生成了二维码（canvas） 然后把二维码转为图片
                    let qrcodeURL = canvas.toDataURL("image/png");
                    that.setState({qrcodeURL});
                    callback && callback(qrcodeURL);
                }
            }
        );
    };

    componentDidMount() {
        this.createQrcode();
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        let that = this;
        const {failed: failed, fetching: fetching} = this.props.achieveInfo;
        const {failed: nextFailed, fetching: nextFetching} = nextProps.achieveInfo;
        const {user, achievementHasList: {data: achievementHasListData,}} = nextProps;
        if (!failed && fetching && !nextFailed && !nextFetching) {
            if (nextProps.achieveInfo.data && nextProps.achieveInfo.data.list) {
                let imgArr = ['/images/modal_this_big_img.png',nextProps.achieveInfo.data.list.icon];
                let defaultImgArr = ["/images/default_banner.png","/images/my/register.png"];
                ImageToBase64(imgArr, defaultImgArr, base64Array => {
                    console.log(base64Array.slice(0)[0]);
                    that.setState({
                        thisAchieveInfoImg: base64Array.slice(0),
                    }, () => {
                        that.htm2Click();
                    });
                }, 0);
                this.setState({
                    thisAchieveInfo: nextProps.achieveInfo.data.list
                });
                this.openModalAchievement(nextProps.achieveInfo.data.list);
            }else {
                Alert.error('生成图片失败，请重试');
            }
        }
        if(user) {
            let imgArr = [user.avatars];
            let defaultImgArr = ["/images/my/register.png"];
            ImageToBase64(imgArr, defaultImgArr, base64Array => {
                that.setState({
                    avatar: base64Array.slice(0),
                }, () => {
                    that.htm2Click();
                });

            }, 0);
        }
        if (user && achievementHasListData && achievementHasListData.list && achievementHasListData.list.length) {
            let imgArr = [user.avatars];
            let defaultImgArr = ["/images/my/register.png"];
            achievementHasListData.list.map(item=>{
                imgArr.push(item.icon);
                defaultImgArr.push("/images/default_banner.png");
            });
            ImageToBase64(imgArr, defaultImgArr, base64Array => {
                that.setState({
                    base64Array: base64Array.slice(0),
                }, () => {
                    that.htm2Click();
                });

            }, 0);
        }
    }

    openModalAchievement(data) {
        console.log(`${window.location.protocol}//${window.location.host}`)
        const {user} = this.props;
        let reward_time = user.reward_time && Number(user.reward_time).toFixed(0);
        let modalMod = data ? <div className="achievement-modal-box">
            <div className={classnames({
                'achievement-modal-box-all': true,
                'achievement-modal-box-all-gold': data.level === 3,
                'achievement-modal-box-all-silver': data.level === 2,
                'achievement-modal-box-all-iron': data.level === 1,
            })}>
                <div className="achievement-modal-box-all-box">
                    <div
                        style={{backgroundImage: `url(${data.icon})`}}></div>
                    <p>{data.name}</p>
                </div>
            </div>
            {
                data.achieve_info && data.achieve_info.length && data.achieve_info[0].settings ?
                    <div>
                        <div className="achievement-modal-box-level achievement-modal-box-level-gold"></div>
                        <div className="achievement-modal-box-level-box">
                            <div>
                                <p>达到{data.achieve_info[0].settings.achieve1}小时</p>
                                <p>服务时长</p>
                            </div>
                            <div>
                                <p>达到{data.achieve_info[0].settings.achieve2}小时</p>
                                <p>服务时长</p>
                            </div>
                            <div>
                                <p>达到{data.achieve_info[0].settings.achieve3}小时</p>
                                <p>服务时长</p>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            <div className="achievement-modal-box-tips">服务时长达到{reward_time}小时，快去晒成就吧！</div>
            <div className="achievement-modal-box-btn">
                <div className={classnames({
                    'achievement-modal-box-btn-default': true,
                    'achievement-modal-box-btn-left': true,
                    'achievement-modal-box-btn-left-flex1': data.level === 3,
                })} onClick={this.modalThis2Img}>告诉大家</div>
                <Link to="/project/list" className={classnames({
                    'achievement-modal-box-btn-default': true,
                    'achievement-modal-box-btn-right': true,
                    'hidden': data.level === 3
                })}>继续做志愿</Link>
            </div>
        </div> : <div></div>;
        this.setState({
            visible: true,
            modalChildren: modalMod
        });
    }

    shareAchieveClick() {
        this.setState({
            visible: true,
            modalChildren: <img style={{width: '310px'}} src={this.state.dataUrl} alt=""/>
        });
    }
    showDefaultImg() {
        this.setState({
            visible: true,
            modalChildren: <img style={{width: '310px'}} src={this.state.defaultImg} alt=""/>
        });
    }
    htm2Click = () => {
        var that = this;
        var shareContent = this.refs["LaunchContent"];
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement("canvas");
        var scale = 4;
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext("2d").scale(scale, scale);
        var opts = {
            scale: scale,
            canvas: canvas,
            width: width,
            height: height,
            useCORS: true
        };
        html2canvas(shareContent, opts).then(function (canvas) {
            var dataUrl = canvas.toDataURL("image/jpeg", 4);
            that.setState({defaultImg: dataUrl});
        });
    };

    getAchieveInfo(e) {
        this.props.getAchieveInfo(e.currentTarget.dataset.index);
    }
    modalThis2Img = () => {
        var that = this;
        var shareContent = this.refs["modalThis"];
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement("canvas");
        var scale = 4;
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext("2d").scale(scale, scale);
        var opts = {
            scale: scale,
            canvas: canvas,
            width: width,
            height: height,
            useCORS: true
        };
        html2canvas(shareContent, opts).then(function (canvas) {
            var dataUrl = canvas.toDataURL("image/jpeg", 4);
            that.setState({
                visible: true,
                modalChildren: <img style={{width: '310px'}} src={dataUrl} alt=""/>
            });
        });
    };

    render() {
        const {achievementList, achievementHasList, user} = this.props;
        let has = 0;
        let all = 0;
        if (achievementList.data && achievementList.data.list && achievementHasList.data && achievementHasList.data.list) {
            has = achievementHasList.data.list.length;
            all = achievementHasList.data.list.length + achievementList.data.list.length;
        }
        const thisAchieveInfo = this.state.thisAchieveInfo;
        return (<div className="achievement">
            <div className="achievement-box">
                <div className="achievement-box-title">
                    <div>志愿成就</div>
                    <div>{`${has}/${all}`}</div>
                </div>
                <div className="achievement-array">
                    {
                        achievementHasList.data && achievementHasList.data.list && achievementHasList.data.list.length > 0 && achievementHasList.data.list.map((item, index) => (
                            <div className="achievement-array-item"
                                 data-index={item.achieve_key}
                                 onClick={this.getAchieveInfo}>
                                <div style={{backgroundImage: `url(${item.icon})`}}></div>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                    {
                        achievementList.data && achievementList.data.list && achievementList.data.list.length > 0 && achievementList.data.list.map((item, index) => (
                            <div className="achievement-array-item"
                                 data-index={item.achieve_key}>
                                <div style={{backgroundImage: `url(${item.icon})`}}></div>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="share-my-achievement" onClick={this.showDefaultImg}>分享我的成就</div>
            {/*蒙版层，分享使用，放在-99999处,需要提前加载*/}
            {/*position: 'absolute', top: '-99999px'*/}
            <div className="achieve-share"
                 style={{width: '310px', 'margin': '0 auto', position: 'absolute', top: '-99999px'}}
                 ref="LaunchContent">
                <div className="achieve-share-bigimg"></div>
                <div className="achieve-share-avatar">
                    <img className="achieve-share-avatar-image" src={this.state.avatar&&this.state.avatar[0]} alt=""/>
                </div>
                {
                    window.orgInfo.st_rank_op == 1 ? <div className="achieve-name">
                            {decodeURIComponent(getQueryString("querys"))}
                    </div> : null
                }
                <div className="achieve-share-num">
                    <div>
                        <p>支持志愿项目</p>
                        <p className="achieve-share-num-p"><span className="achieve-share-num-word">{this.props.route&&this.props.route.params&&this.props.route.params.projectNum}</span><span
                            className="achieve-share-num-p-span">个</span></p>
                    </div>
                    <div>
                        <p>达成志愿成就</p>
                        <p className="achieve-share-num-p"><span className="achieve-share-num-word">{achievementHasList&&achievementHasList.data&&achievementHasList.data.list&&achievementHasList.data.list.length}</span><span
                            className="achieve-share-num-p-span">个</span></p>
                    </div>
                </div>
                <div className="achieve-share-all" style={{justifyContent: `${this.state.base64Array&&this.state.base64Array.length>2 ? 'space-between' : 'center'}`}}>
                    {
                        this.state.base64Array&&this.state.base64Array.length>0&&this.state.base64Array.map((item, index)=>{
                            if(index > 0) {
                                return <div key={index} className="achieve-share-all-item">
                                    <div style={{backgroundImage: `url(${item})`}} className="achieve-share-all-item-img"></div>
                                    <p>{achievementHasList.data.list[index-1].name}</p>
                                </div>
                            }
                        })
                    }
                </div>
                <div className="achieve-share-word-img">
                    <img className="achieve-share-word-img-img" src="/images/my/achieve-share-word.png" alt=""/>
                </div>
                <div className="achieve-share-qrcode">
                    <img className="achieve-share-qrcode-img" src={this.state.qrcodeURL} alt=""/>
                    <div style={{position: 'relative', bottom: '2px'}}>
                        <p>长按或扫码二维码</p>
                        <p>查看我的志愿成就</p>
                    </div>
                </div>
            </div>

            <div className="modal-this" ref="modalThis">
                <div>
                    <div className="modal-this-avatar">
                        <img className="achieve-share-avatar-image" src={this.state.avatar&&this.state.avatar[0]} alt=""/>
                    </div>
                    <p className="modal-this-name">{user&&(user.real_name||user.username)}</p>
                    <p className="modal-this-time">志愿时长超过<span style={{color: 'rgb(183, 18, 33)'}}>{user&&user.reward_time&&Number(user.reward_time).toFixed(0)}</span>小时</p>
                    <p className="modal-this-time">超过了志多星<span style={{color: 'rgb(183, 18, 33)'}}>97%</span>的志愿者</p>
                    <div className="modal-this-line">
                        <div className="modal-this-two-line"></div>
                        <div style={{flex: 1}}>解锁成就</div>
                        <div className="modal-this-two-line"></div>
                    </div>
                    <div className="modal-this-big-img" style={{backgroundImage: `url('${this.state.thisAchieveInfoImg&&this.state.thisAchieveInfoImg[0]}')`}}>
                        <p className="modal-this-achieve-name">{thisAchieveInfo&&thisAchieveInfo.name}</p>
                        <img className="modal-this-achieve-img" src={this.state.thisAchieveInfoImg&&this.state.thisAchieveInfoImg[1] || this.state.base64Array&&this.state.base64Array[0]} alt=""/>
                    </div>
                    <div className="achieve-share-qrcode modal-this-share-qrcode">
                        <img className="achieve-share-qrcode-img modal-this-qrcode-size" src={this.state.qrcodeURL} alt=""/>
                        <div style={{position: 'relative', bottom: '2px'}}>
                            <p>长按或扫码二维码</p>
                            <p>查看我的志愿成就</p>
                        </div>
                    </div>
                    <p className="modal-this-footer">长沙仁与公益组织发展与研究中心</p>
                </div>
            </div>
            <ModalNew
                maskCloseable={()=>{this.setState({visible: false})}}
                visible={this.state.visible}
                platform="ios"
                transparent={true}
                animationType="slide"
                children={this.state.modalChildren}
            >
            </ModalNew>
        </div>)
    }
}


Achievement.propTypes = {
    getAchievement: PropTypes.func,
    requestUserInfo: PropTypes.func,
    getAchieveInfo: PropTypes.func,
    getAchievementHas: PropTypes.func
};

export default connect(
    state => ({
        user: state.user,
        achievementList: state.my.achievement.achievementList,
        achievementHasList: state.my.achievement.achievementHasList,
        achieveInfo: state.my.achievement.getAchieveInfo,
    }),
    dispatch => bindActionCreators({getAchievement, getAchievementHas, requestUserInfo, getAchieveInfo}, dispatch),
)(Achievement);
