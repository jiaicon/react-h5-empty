import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./detail.css";
import CommunityItem from "../../../components/community_item/index";

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

class CommunityDetailPage extends React.Component {
    static propTypes = {
        data: PropTypes.shape({})
    };
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillMount() {
        console.info(this)
        if (this.props.route.params.projectId) {
            this.props.feelingAction({
                type: 2,
                relation_id: this.props.route.params.projectId,
                page_size: 1000
            });
        }
    }

    onPublish() {
        const {
            user: { isLogin }
        } = this.props;
        if (isLogin) {
            window.location.replace(`/my/circlepublish/2/${this.props.route.params.projectId}`);
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
    render() {
        const { t } = this.props;
        return (
            <div className="page-project-detail">
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
}

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
)(translate('translations')(CommunityDetailPage));