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
    const content = this.contentDom;
    if (content && content.offsetHeight !== this.state.descHeight && content.offsetHeight >= 120) {
      this.setState({
        ...this.state,
        descHeight: content.offsetHeight,
        descTrigger: true,
      });
    }
  }
  render() {
    const data = this.props.data;
    return (

      <ul className="components-community-item-container">

        <li className="components-community-item-main">
          <div className="components-community-item">
            <AVATAR size={{ width: 40, height: 40, radius: 4 }} className="components-community-item-avatar" src={data.user_info.avatars} />
            <div className="components-community-item-main-right">
              <p className="components-community-item-name">{data.user_info.username}</p>
              <Link to={'/my/circledetail'}>
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
                <li className="components-community-item-photo-area-li-single">
                  <IMAGE src={data.photo} className="components-community-item-photo-area-single" />
                </li> :
                data.photo.map((itm, index) => (

                  <li className="components-community-item-photo-area-li-several" key={index}>
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
                this.props.isDetailEntry && data.project_info && data.project_info.name ? <Link to={`/project/detail/${data.project_info.id}`}><div className="components-community-item-business-container"># {data.project_info.name }</div>                                                                                   </Link> : null
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
          <div className="line1px" />

        </li>
      </ul >
    );
  }
}


export default COMMUNITYITEM;
