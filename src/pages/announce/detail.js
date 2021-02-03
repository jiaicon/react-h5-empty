/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './detail.css';
import MessagesItem from './component/messagesItem';
import { announceDetailAction } from './announce.store';
import WXShare from "../../components/share";

class MessagesDetail extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = props.route.params.Id;
  }

  componentWillMount() {
    this.props.announceDetailAction(this.Id);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const detailData = nextProps.announceDetail.data;
    if (
      detailData &&
      detailData.id === parseInt(this.Id, 10)
    ) {
      document.title = detailData && detailData.title || '公告详情';
      if (window.userAgent) {
        wx.ready(() => {
          WXShare({
            title: detailData.title,
            desc: detailData.content ?
              detailData.content.replace(/(\n+)/g, '<br/>') : '',
            image: detailData.photo,
            success: () => { }
          });
        });
      }
    }
  }

  componentWillUnmount() { }

  render() {
    const { announceDetail: { data: detailData } } = this.props;
    const currentId = parseInt(this.Id, 10);
    const dataId = detailData ? detailData.id : '';

    if (currentId !== dataId) {
      return null;
    }
    return (
      <div className="page-announce-detail">
        <div className="title">{detailData.title}</div>
        <div className="date">{detailData.publish_time}</div>
        {/* <img src={detailData.photo} /> */}
        <div
          className="page-center-style"
          dangerouslySetInnerHTML={{
            __html: detailData.content ?
              detailData.content.replace(/(\n+)/g, '<br/>') : ''
          }}
        />
      </div>
    );
  }
}


MessagesDetail.title = '公告详情';

MessagesDetail.propTypes = {
  announceDetail: PropTypes.arrayOf(PropTypes.shape({

  })),
  announceDetailAction: PropTypes.func,
};

export default connect(
  state => ({
    announceDetail: state.announce.announceDetail,

  }),
  dispatch => bindActionCreators({ announceDetailAction }, dispatch),
)(MessagesDetail);
