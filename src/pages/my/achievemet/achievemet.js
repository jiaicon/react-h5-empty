import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalNew from './../../../components/ModalNew/ModalNew';
import "./achievemet.css";
import {getAchievement,getAchievementHas} from './achievement.store';

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
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {

    }

    openModalAchievement(e) {
        console.log(e.currentTarget.dataset.index);
        let modalMod = <div className="achievement-modal-box">
            <div className="achievement-modal-box-all achievement-modal-box-all-gold">
                <div className="achievement-modal-box-all-box">
                    <div></div>
                    <p>爱心巨匠</p>
                </div>
            </div>
            <div className="achievement-modal-box-level achievement-modal-box-level-gold"></div>
            <div className="achievement-modal-box-level-box">
                <div>
                    <p>达到10小时</p>
                    <p>志愿时长</p>
                </div>
                <div>
                    <p>达到10小时</p>
                    <p>志愿时长</p>
                </div>
                <div>
                    <p>达到10小时</p>
                    <p>志愿时长</p>
                </div>
            </div>
            <div className="achievement-modal-box-tips">志愿时长达到101小时，快去晒成就吧！</div>
            <div className="achievement-modal-box-btn">告诉大家</div>
        </div>;
        this.setState({
            visible: true,
            modalChildren: modalMod
        });
    }

    render() {
        console.log(this.props)
        const {achievementList, achievementHasList} = this.props;
        let has = 0;
        let all = 0;
        if(achievementList.data && achievementList.data.list  && achievementHasList.data && achievementHasList.data.list) {
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
                        achievementList.data && achievementList.data.list && achievementList.data.list.length > 0 && achievementList.data.list.map((item, index) => (
                            <div className="achievement-array-item" data-index={item.id} onClick={this.openModalAchievement} style={{backgroundImage: `url(${item.icons})`}}>
                                <div ></div>
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
    getAchievementHas: PropTypes.func
};

export default connect(
    state => ({
        achievementList: state.my.achievement.achievementList,
        achievementHasList: state.my.achievement.achievementHasList,
    }),
    dispatch => bindActionCreators({getAchievement,getAchievementHas}, dispatch),
)(Achievement);
