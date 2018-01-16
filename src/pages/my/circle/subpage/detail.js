/**
 * @file 我的志愿圈-消息列表
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import './detail.css';
import Link from '../../../../components/link/link';
import CommunityItem from '../../../../components/community_item/index';
import { feelingDetailAction } from '../circle.store';
import AVATAR from '../../../../components/avatar/avatar';

class CircleDetail extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = props.route.params.Id;
  }

  componentWillMount() {
    this.props.feelingDetailAction(this.Id);
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }
  renderRemark() {
    const likelist = [{ avatars: 'http://alpha.api.volunteer.tmallwo.com:8000/image/2018-01-16/IvtdVQcl79wsRdwYcm0fXKykp3G-_0tw17vSXn3AuDvJDOggab6XX8A7Vsdhexkz.jpg', username: '梦里花落知多少' },
    { avatars: 'http://alpha.api.volunteer.tmallwo.com:8000/image/2018-01-16/IvtdVQcl79wsRdwYcm0fXKykp3G-_0tw17vSXn3AuDvJDOggab6XX8A7Vsdhexkz.jpg', username: '梦里花落知多少' }];
    const commentlist = [
      {
        id: 1,
        comment: '公益活动是现代社会条件下的产物，是公民参与精神的表征。',
        created_at: '2017-12-15 17:04:50',
        feeling_id: 11,
        is_display: 1,
        feeling_is_display: 1,
        user_info: { avatars: 'http://alpha.api.volunteer.tmallwo.com:8000/image/2018-01-16/IvtdVQcl79wsRdwYcm0fXKykp3G-_0tw17vSXn3AuDvJDOggab6XX8A7Vsdhexkz.jpg', username: '梦里花落知多少' },
        comment_to: { },
      },
      {
        id: 1,
        comment: '公益活动是现代社会条件下的产物，是公民参与精神的表征。',
        created_at: '2017-12-15 17:04:50',
        feeling_id: 11,
        is_display: 1,
        feeling_is_display: 1,
        user_info: { avatars: 'http://alpha.api.volunteer.tmallwo.com:8000/image/2018-01-16/m9nvUgNC0b6A2DUADnYqerqFrAymFJUJy57Uxvg3CBVu_w0KuUzwTRJ1AQ6W-N_m.jpg', username: '梦里花落知多少' },
        comment_to: { avatars: 'http://alpha.api.volunteer.tmallwo.com:8000/image/2018-01-16/m9nvUgNC0b6A2DUADnYqerqFrAymFJUJy57Uxvg3CBVu_w0KuUzwTRJ1AQ6W-N_m.jpg', username: '马云' },
      },

    ];
    return (
      <div className="page-circleDetail-remark-container">
        <div className="page-circleDetail-remark-main">
          <span className="page-circleDetail-remark-main-tri" />
          <div className="page-circleDetail-remark-main-like-container">
            <div className="page-circleDetail-remark-main-like-icon" />
            <div className="page-circleDetail-remark-main-like-people" >
              {
                  likelist.length >= 1 ? likelist.map((item, index) => (<AVATAR className="page-circleDetail-remark-main-like-people-item" src={item.avatars} size={{ width: 35, height: 35, radius: 1 }} />)) : null
                }
            </div>
          </div>
          <div className="line1px" />
          <div className="page-circleDetail-remark-main-like-container">
            <div className="page-circleDetail-remark-main-comment-icon" />
            <div className="page-circleDetail-remark-main-comment" >
              <div style={{ paddingRight: '10px' }}>
                <div className="page-circleDetail-remark-components-container">
                  <AVATAR className="page-circleDetail-remark-components-avatar" src={11} size={{ width: 35, height: 35, radius: 1 }} />
                  <div className="page-circleDetail-remark-components-right">
                    <div className="page-circleDetail-remark-components-name-container">
                      <div className="page-circleDetail-remark-components-name">罗永浩</div>
                      <div className="page-circleDetail-remark-components-time">2017-11-16</div>
                    </div>
                    <div className="page-circleDetail-remark-components-comment">公益活动是现代社会条件下的产物，是公民参与精神的表征。</div>
                  </div>
                </div>
                <div className="line1px" />
              </div>

            </div>
          </div>


        </div>
        <div className="page-circleDetail-remark-send-message-container">
          <div className="line1px" />
          发送
        </div>
      </div>
    );
  }
  render() {
    console.log(this.props.feelingDetail);
    return (
      <div className="page-circleDetail-container">
        {
          this.props.feelingDetail && this.props.feelingDetail.data ?
            <div>
              <CommunityItem data={this.props.feelingDetail.data} isDetailEntry isDescTrigger isDisplayLine />
              {this.renderRemark()}
            </div>
          : null
        }
      </div>
    );
  }
}


CircleDetail.title = '互动社区';

CircleDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
};
// team: state.my.team,

export default connect(
  state => ({
    feelingDetail: state.circle.feelingDetail,
  }),
  dispatch => bindActionCreators({ feelingDetailAction },
    dispatch),
)(CircleDetail);

