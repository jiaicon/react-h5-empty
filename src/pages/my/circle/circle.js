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

import './circle.css';
import Link from '../../../components/link/link';
import { moreFeelingAction } from './circle.store'
class Circle extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.requestList(false);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }
  handleScroll() {
    console.log(111)
    if (isWindowReachBottom(50)) {
      this.requestList(true);
    }
  }
  requestList(more) {
    const { moreFeeling : { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.moreFeelingAction({
      type: 1,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }
  renderCommunity() {
    console.log(this.props.moreFeeling)
    const data = {
      list: [
        {
          id: 1,
          type: 2,
          content: '公公公公公公公公公公公公公公公公公公公公公公公公公公公公益活动是现代社会条件下的产物，是公民参与精神的表征。公益活动要生产出有利于提升公共安全、有利于增加社会福利的公共产品。在组织公益活动时，要遵循公德、符合公意，努力形成参与者多赢共益的良好氛围。因而，公益活动至少应该公益活动是现代社会条件下的产物，是公民参与精神的表征。公益活动要生产出有利于提升公共安全、有利于增加社会福利的公共产品。在组织公益活动时，要遵循公德、符合公意，努力形成参与者多赢共益的良好氛围。因而，公益活动至少应该',
          photo: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515572149241&di=31b69e9b3ef12edc0d43505164b7f809&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018d4e554967920000019ae9df1533.jpg%40900w_1l_2o_100sh.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515572149240&di=d74e0d98db641f5b47365973f2383c77&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b52855dc4b6932f875a13252f0e4.jpg%401280w_1l_2o_100sh.jpg',
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg',
          ],
          like_count: 2,
          comment_count: 999,
          created_at: '5分钟前',
          user_info: {
            id: 111,
            username: 'zzy9528',
            avatars: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg',
            real_name: '郑',
          },
          team_info: {
            id: 123,
            name: '服务远征1号队',

          },
          comment_list: {
            id: 1,
            comment: '挺好的',
            created_at: '2017-12-15 17:04:50',
            feeling_id: 11,
            is_display: 1,
            feeling_is_display: 1,
            user_info: { avatar: '评论的用户信息（仅有头像和昵称', username: '11' },
            comment_to: { avatar: '评论的用户信息（仅有头像和昵称', username: '11' },

          },
        },
        {
          id: 2,
          type: 2,
          content: '这次志愿者活动',
          photo: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg',
          ],
          like_count: 2,
          comment_count: 999,
          created_at: '5分钟前',
          user_info: {
            id: 123,
            username: '梦里花落知多少',
            avatars: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg',
          },
          team_info: {
            id: 123,
            name: '服务远征1号队',

          },
          comment_list: {
            id: 1,
            comment: '挺好的',
            created_at: '2017-12-15 17:04:50',
            feeling_id: 11,
            is_display: 1,
            feeling_is_display: 1,
            user_info: { avatar: '评论的用户信息（仅有头像和昵称', username: '11' },
            comment_to: { avatar: '评论的用户信息（仅有头像和昵称', username: '11' },

          },
        },

      ],
    };
    return (
      <div>
        {
          this.props.moreFeeling.data && this.props.moreFeeling.data.list?  this.props.moreFeeling.data.list.map(listData => (
          <CommunityItem data={listData} isDetailEntry key={listData.id} />
          )) : null

        }
      </div>
    );
  }
  render() {
    return (
      <div className="page-circle-container">
        <div className="page-circle-header-container">
          <div className="page-circle-header-top">
            <Link className="page-circle-header-top-link-container" to="/my/circlelist">
              <div className="page-circle-header-top-link-icon page-circle-header-top-link-icon-ld" ><span className="page-circle-header-top-link-icon-ld-ponit">16</span></div>
              消息列表
            </Link>
            <div className="line1px-v page-circle-header-top-line" />
            <Link className="page-circle-header-top-link-container" to="/my/circlepublish/1">
              <div className="page-circle-header-top-link-icon page-circle-header-top-link-icon-publish" />
              发布动态
            </Link>
          </div>
          <div className="line1px" />
        </div>
        {this.renderCommunity()}

      </div>
    );
  }
}


Circle.title = '我的志愿圈';

Circle.propTypes = {

};
// team: state.my.team,

export default connect(
  state => ({
    moreFeeling:state.circle.moreFeeling,

  }),
  dispatch => bindActionCreators({ moreFeelingAction },
    dispatch),
)(Circle);

