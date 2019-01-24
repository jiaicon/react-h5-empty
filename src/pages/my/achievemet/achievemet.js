import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalNew from './../../../components/ModalNew/ModalNew';
import "./achievemet.css";
import {getAchievement, getAchievementHas, getAchieveInfo} from './achievement.store';
import {requestUserInfo} from '../../../stores/common';
import Avatar from '../../../components/avatar/avatar';




class Achievement extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            visible: false,
        };
    }

    componentWillMount() {
        this.props.getAchievement();
        this.props.getAchievementHas();
        this.props.requestUserInfo();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        const {failed: failed, fetching: fetching} = this.props.achieveInfo;
        const {failed: nextFailed, fetching: nextFetching} = nextProps.achieveInfo;
        if(!failed&& fetching && !nextFailed && !nextFetching) {
            if(nextProps.achieveInfo.data && nextProps.achieveInfo.data.list)this.openModalAchievement(nextProps.achieveInfo.data.list);
        }
    }

    openModalAchievement(data) {
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
                data.achieve_info&&data.achieve_info.length&&data.achieve_info[0].settings ?
                    <div>
                        <div className="achievement-modal-box-level achievement-modal-box-level-gold"></div>
                        <div className="achievement-modal-box-level-box">
                            <div>
                                <p>达到{data.achieve_info[0].settings.achieve1}小时</p>
                                <p>志愿时长</p>
                            </div>
                            <div>
                                <p>达到{data.achieve_info[0].settings.achieve2}小时</p>
                                <p>志愿时长</p>
                            </div>
                            <div>
                                <p>达到{data.achieve_info[0].settings.achieve3}小时</p>
                                <p>志愿时长</p>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            <div className="achievement-modal-box-tips">志愿时长达到{reward_time}小时，快去晒成就吧！</div>
            <div className="achievement-modal-box-btn" onClick={this.shareAchieve}>告诉大家</div>
        </div> : <div></div>;
        this.setState({
            visible: true,
            modalChildren: modalMod
        });
    }
    shareAchieve() {
        let shareDom = null;
        const {user} = this.props;
        console.log(user);
        shareDom = <div className="achieve-share">
            <div className="achieve-share-bigimg"></div>
            <div className="achieve-share-avatar">
                <Avatar src={user.avatars}
                        size={{width: 80, radius: 100}}
                        defaultSrc="/images/my/register.png"
                />
            </div>
            <div className="achieve-share-num">
                <div>
                    <p>支持志愿项目</p>
                    <p className="achieve-share-num-p"><span className="achieve-share-num-word">5</span><span className="achieve-share-num-p-span">个</span></p>
                </div>
                <div>
                    <p>达成志愿成就</p>
                    <p className="achieve-share-num-p"><span className="achieve-share-num-word">5</span><span className="achieve-share-num-p-span">个</span></p>
                </div>
            </div>
            <div className="achieve-share-all">
                <div className="achieve-share-all-item">
                    {/*style={{backgroundImage: `url(${})`}}*/}
                    <div className="achieve-share-all-item-img"></div>
                    <p>爱心大使</p>
                </div>
                <div className="achieve-share-all-item">
                    <div className="achieve-share-all-item-img"></div>
                    <p>爱心大使</p>
                </div>
                <div className="achieve-share-all-item">
                    <div className="achieve-share-all-item-img"></div>
                    <p>爱心大使</p>
                </div>
                <div className="achieve-share-all-item">
                    <div className="achieve-share-all-item-img"></div>
                    <p>爱心大使</p>
                </div>
            </div>
            <div className="achieve-share-word-img">
                <img className="achieve-share-word-img-img" src="/images/my/achieve-share-word.png" alt=""/>
            </div>
        </div>;
        this.setState({
            visible: true,
            modalChildren: shareDom
        });
    }
    getAchieveInfo(e) {
        this.props.getAchieveInfo(e.currentTarget.dataset.index);
    }
    render() {
        const {achievementList, achievementHasList} = this.props;
        let has = 0;
        let all = 0;
        if (achievementList.data && achievementList.data.list && achievementHasList.data && achievementHasList.data.list) {
            has = achievementHasList.data.list.length;
            all = achievementHasList.data.list.length + achievementList.data.list.length;
        }
        return (<div className="achievement">
            <div className="achievement-box">
                <div className="achievement-box-title">
                    <div>志愿成就</div>
                    <div>{`${has}/${all}`}</div>
                </div>
                <div className="achievement-array">
                    {
                        achievementHasList.data && achievementHasList.data.list && achievementHasList.data.list.length > 0 && achievementHasList.data.list.map((item, index) => (
                            <div className="achievement-array-item" data-index={item.achieve_key}
                                 onClick={this.getAchieveInfo}>
                                <div style={{backgroundImage: `url(${item.icon})`}}></div>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                    {
                        achievementList.data && achievementList.data.list && achievementList.data.list.length > 0 && achievementList.data.list.map((item, index) => (
                            <div className="achievement-array-item" data-index={item.id}>
                                <div style={{backgroundImage: `url(${item.icon})`}}></div>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <ModalNew
                maskCloseable={true}
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
