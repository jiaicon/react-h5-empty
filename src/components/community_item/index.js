/**
 * @file 社区项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import Link from '../link/link';
import AVATAR from '../avatar/avatar';
import IMAGE from '../image/image';
import './index.css';

class COMMUNITYITEM extends React.Component {
  static propTypes = {
    data: PropTypes.shape({ }),

    isDetailEntry: PropTypes.bool,
    isDescTrigger: PropTypes.bool,
    isDisplayLine: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      descHeight: null,
      descTrigger: false,
    });
  }

  componentWillMount() {
    this.setState({
      descHeight: null,
      descTrigger: false,
    });
  }
  componentDidMount() {
    if(this.props.isDescTrigger)return;
    const content = this.contentDom;
    if (content && content.offsetHeight !== this.state.descHeight && content.offsetHeight >= 120) {
      this.setState({
        ...this.state,
        descHeight: content.offsetHeight,
        descTrigger: true,
      });
    }
  }
  componentDidUpdate() {
    if(this.props.isDescTrigger)return;
    const content = this.contentDom;
    if (content && content.offsetHeight !== this.state.descHeight && content.offsetHeight >= 120) {
      this.setState({
        ...this.state,
        descHeight: content.offsetHeight,
        descTrigger: true,
      });
    }
  }
  onPreview(e) {
    const index = e.target.getAttribute('data-index');
    const imagesArr = this.props.data.photo;
    wx.ready(() => {
      wx.previewImage({
        current: imagesArr[index], // 当前显示图片的http链接
        urls: imagesArr, // 需要预览的图片http链接列表
      });
    });
  }
  render() {
    const data = this.props.data;
    return (

      <div className="components-community-item-container">

        <div className="components-community-item-main">
          <div className="components-community-item">
            <AVATAR size={{ width: 40, height: 40, radius: 4 }} className="components-community-item-avatar" src={data.user_info.avatars} />
            <div className="components-community-item-main-right">
              <p className="components-community-item-name">{data.user_info.real_name||data.user_info.username}</p>
              <Link to={`/my/circledetail/${data.id}`}>
                <div
                  ref={(dom) => { this.contentDom = dom; }}
                  className={classnames({
                    ' components-community-item-content-style': true,
                    'components-community-item-content-style-off': this.state.descTrigger,
                  })}
                >{data.content}</div>

                {this.state.descTrigger ? <div className="components-community-item-content-btn">查看全文</div> : null}
              </Link>
              <ul className="components-community-item-photo-area">
                {
              data.photo.length && data.photo.length >= 1 ?
              data.photo.length === 1 ?
                <li className="components-community-item-photo-area-li-single" data-index={0} onClick={this.onPreview}>
                  <IMAGE src={data.photo[0]} className="components-community-item-photo-area-single" />
                </li> :
                data.photo.map((itm, index) => (

                  <li className="components-community-item-photo-area-li-several" data-index={index} onClick={this.onPreview}>
                    <IMAGE src={itm} className="components-community-item-photo-area-several" />
                  </li>
                ))
            : null
              }
              </ul>
              {
                this.props.isDetailEntry && data.team_info && data.team_info.name ? <Link to={`/team/detail/${data.team_info.id}`}><div className="components-community-item-business-container"># {data.team_info.name }</div></Link> : null
              }


              {
                this.props.isDetailEntry && data.project_info && data.project_info.name ? <Link to={`/project/detail/${data.project_info.id}`}><div className="components-community-item-business-container"># {data.project_info.name }</div>                                                                                                                </Link> : null
              }


              <div className="components-community-item-footer">
                <div className="components-community-item-footer-container">
                  <div className="components-community-item-footer-time">{data.created_at}</div>
                  <div className="components-community-item-footer-del">删除</div>
                </div>
                <div className="components-community-item-footer-container">
                  <Link to="" className={'components-community-item-footer-like-n'}>{data.like_count}</Link>
                  <Link to="" className={'components-community-item-footer-comment'}>{data.comment_count}</Link>
                </div>
              </div>
            </div>
          </div>
          {this.props.isDisplayLine ? null : <div className="line1px" />}

        </div>
      </div >
    );
  }
}


export default COMMUNITYITEM;
