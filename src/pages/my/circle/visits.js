/**
 * @file 我的志愿圈
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CommunityItem from '../../../components/community_item/index';

import { isWindowReachBottom } from '../../../utils/funcs';

import './visits.css';
import Link from '../../../components/link/link';
import { moreFeelingAction,
        deleteFeelingAction,
        unObserveAction,
        observeAction,
         } from './circle.store';
import { userCenterAction, userAchieve } from '../my.store';


import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

import { translate } from 'react-i18next';
import i18next from 'i18next';
import { requestUserInfo } from '../../../stores/common';

class CircleVists extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      showDialogA: false,
    });
    const { t } = props;
    this.dialogA = {
      title: t('登录提示'),
      buttons: [
        {
          type: 'default',
          label: t('取消'),
          onClick: () => this.setState({ ...this.state, showDialogA: false }),
        },
        {
          type: 'primary',
          label: t('确认'),
          onClick: () => {
            this.setState({ ...this.state, showDialogA: false });
            this.props.userCenterAction();
          },
        },
      ],
    };
  }

  componentWillMount() {
    this.requestList(false);
    this.props.requestUserInfo();
    this.props.userAchieve()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { deleteFeeling: LdeleteFeeling } = this.props;
    const { deleteFeeling: NdeleteFeeling } = nextProps;
    if (LdeleteFeeling.fetching && !NdeleteFeeling.fetching && !NdeleteFeeling.failed) {
      this.requestList(false);
      this.props.requestUserInfo();
    }
    const { observe: Lobserve, unObserve: LunObserve } = this.props;
    const { observe: Nobserve, unObserve: NunObserve } = nextProps;
    if (Lobserve.fetching && !Nobserve.fetching && !Nobserve.failed) {
      this.requestList(false);
      this.props.requestUserInfo();
    }
    if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
      this.requestList(false);
      this.props.requestUserInfo();
    }
  }
  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.requestList(true);
    }
  }
  requestList(more) {
    const { moreFeeling: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.moreFeelingAction({
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }
  onParse(id) {
    this.props.observeAction(id);
  }
  unOnParse(id) {
    this.props.unObserveAction(id);
  }
  renderCommunity() {
    const { moreFeeling: { data: listData }, t } = this.props;
    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);
    const {
      userAchieveList: { data: udata },
    } = this.props;
    if (window.orgInfo.st_rank_op == 1) {
      if(!udata || !udata.data) {
        return <div></div>;
      }
      const { data: { growth_level } } = udata;
      let userAchieveListLocal = [];
      growth_level.forEach(item => {
        if (item.name) {
          userAchieveListLocal.push(item);
        }
      });
      let model = null;
      listData.list.map(item => {
        if(item.type == 1) {
          if(!item.user_info.growth) {
            item.user_info.growth = 0;
          }
          if(item.user_info.growth >= userAchieveListLocal[userAchieveListLocal.length-1].growth) {
            model = userAchieveListLocal[userAchieveListLocal.length-1];
          } else if(item.user_info.growth < userAchieveListLocal[0].growth) {
            model = {
              name: ''
            }
          } else {
            for(let i = 0; i < userAchieveListLocal.length;i++) {
              if(item.user_info.growth >= userAchieveListLocal[i].growth && item.user_info.growth < userAchieveListLocal[i+1].growth) {
                model = userAchieveListLocal[i];
                break;
              }
            }
          }
          item.model = model;
        }
        return item;
      })
    }
    return (
      <div>
        {
          this.props.moreFeeling.data && this.props.moreFeeling.data.list && this.props.moreFeeling.data.list.length >0 ?
            <div>{
              listData.list.map(itm => (
            <CommunityItem
              data={itm} isDetailEntry key={itm.id} onDeleteClick={this.delete} routeData={this.props.route}
              onParseClick={this.onParse} onUnParseClick={this.unOnParse}
            />


          ))
        }
              {
          showLoadingMore
          ?
            <div className="component-loading-more">
              <img src="/images/icon_loading.png" alt="loading" />
              {t('正在加载')}
          </div> : null
        }
            </div> : 
            <div className="page-circle-rendercommunity-container">
            <img src="/images/my/information.png" className="page-circle-rendercommunity-img" />
            <div className="page-circle-rendercommunity-info">{t('还没有动态信息')}</div>
          </div>

        }
      </div>
    );
  }
  onPublish() {
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      // history.replace('/my/circlepublish/1');
      window.location.replace('/my/circlepublish/1');
    } else {
      this.setState({ ...this.state, showDialogA: true });
    }
  }
  delete(id) {
    this.props.deleteFeelingAction(id);
  }
  render() {
    const { t , moreFeeling} = this.props
    if (!moreFeeling.data) {
      return null;
    }
    return (
      <div className="page-circlevisits-container">
        {this.renderCommunity()}
        <div className="page-circlevisits-team-detail-community-link" onClick={this.onPublish} />
        <Dialog type="ios" title={this.dialogA.title} buttons={this.dialogA.buttons} show={this.state.showDialogA}>
          {t('只有登录的用户才能点赞和评论哦～')}
        </Dialog>

      </div>
    );
  }
}


CircleVists.title = i18next.t('社区互动');

CircleVists.propTypes = {

};
// team: state.my.team,

export default connect(
  state => ({
    user: state.user,
    deleteFeeling: state.circle.deleteFeeling,
    observe: state.circle.observe,
    unObserve: state.circle.unObserve,
    moreFeeling: state.circle.moreFeeling,
    userAchieveList: state.my.userAchieve,
  }),
  dispatch => bindActionCreators({
      userAchieve,
    userCenterAction,
    requestUserInfo,
    deleteFeelingAction,
    unObserveAction,
    observeAction,
    moreFeelingAction },
    dispatch),
)(translate('translations')(CircleVists));

