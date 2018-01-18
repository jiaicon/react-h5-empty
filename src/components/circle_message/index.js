/**
 * @file 社区项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classnames from 'classnames';
import history from '../../pages/history';
import Link from '../link/link';
import AVATAR from '../avatar/avatar';
import IMAGE from '../image/image';
import './index.css';
import { requestUserInfo } from '../../stores/common';


class CircleMessage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({}),
  }
  constructor(props) {
    super(props);
    autoBind(this);
  }
  entry(e) {
    const info = JSON.parse(e.currentTarget.getAttribute('data-info'));
    const feelingId = info.feeling_id;
    const feelingIsDisplay = info.feeling_is_display;
    if (feelingIsDisplay) {
      history.push(`/my/circledetail/${feelingId}`);
    }
  }

  render() {
    const data = this.props.data;
    return (
      <div>
        {data && data.list.length >= 1 ?
          data.list.map(item => (
            <div className="components-circle-message-item-container" data-info={JSON.stringify(item)} onClick={this.entry}>
              <div className="components-circle-message-item">
                <div className="components-circle-message-item-main">
                  <AVATAR className="components-circle-message-item-avatar" src={item.user_info.avatars} size={{ width: 40, height: 40, border: 4 }} />
                  <div className="components-circle-message-item-content">
                    <div className="components-circle-message-item-content-name">{item.user_info.real_name || item.user_info.username}</div>
                    {
                      item.is_display && item.feeling_is_display ?
                        <div className="components-circle-message-item-content-comment">{item.comment}</div> :
                      !item.feeling_is_display ? <div className="components-circle-message-item-content-comment">
                        <div className="components-circle-message-item-content-comment-delete">该话题已删除</div>
                      </div> : !item.is_display ? <div className="components-circle-message-item-content-comment">
                        <div className="components-circle-message-item-content-comment-delete">该评论已删除</div>
                      </div> : null
                    }

                    <div className="components-circle-message-item-content-date">{item.created_at}</div>
                  </div>
                  <div className="components-circle-message-item-info">
                    {
                      item.feeling.photo.length >= 1 ?
                        <IMAGE src={item.feeling.photo[0]} resize={{ width: 60, height: 60 }} className="components-circle-message-item-info-img" />
                      : item.comment
                    }
                  </div>
                </div>
                <div className="line1px" />
              </div>
            </div >
            ))

          : null}
      </div>

    );
  }
}

export default CircleMessage;
