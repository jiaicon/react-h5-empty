/**
 * @file 我的志愿圈-发布
 */
/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';

import './publish.css';
import Link from '../../../../components/link/link';

import Avatar from '../../../../components/avatar/avatar';
import uploadToWX from '../../../../utils/wxupload';
import { upFeelingAction } from '../circle.store';
import history from '../../../history';

function upload(localIds, success, fail, index = 0, serverUrls = []) {
  if (!localIds.length) {
    return;
  }

  if (index < localIds.length) {
    wx.uploadImage({
      localId: localIds[index], // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: (res) => {
        fetch('/weixin/media', { method: 'GET', data: { media_id: res.serverId } })
        .then((json) => {
          if (json.error_code === 0) {
            serverUrls[index] = json.data.url;
            index += 1;
            upload(localIds, success, fail, index, serverUrls);
          }
        });
      },
      fail: (error) => {
        Alert.error(`上传失败：${error && error.errMsg}`);
        if (fail) {
          fail(error);
        }
      },
    });
  } else if (success) {
    success(serverUrls);
  }
}
class CirclePublish extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.typeId = props.route.params.typeId;
    this.relationId = props.route.params.relationId;
    this.state = ({
      imagesArr: [],
    });
  }

  componentWillMount() {

  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { upFeeling: LupFeeling } = this.props;
    const { upFeeling: NupFeeling } = nextProps;

    if (LupFeeling.fetching && !NupFeeling.fetching && !NupFeeling.failed) {
      if (this.typeId == 1) {
        history.replace('/my/circlevisits');
      } else if (this.typeId == 2) {
        history.replace(`/project/detail/${this.relationId}`);
      } else if (this.typeId == 3) {
        history.replace(`/team/detail/${this.relationId}`);
      } else if (this.typeId == 4) {
        history.replace('/my/circle');
      }
    }
  }

  componentWillUnmount() {

  }

  onAvatarClick() {
    const imagesArr = this.state.imagesArr;
    const num = 9 - imagesArr.length;
    uploadToWX({
      count: `${num}`,
      success: (urls) => {
        // imagesArr = urls;
        if (urls.length === 1) {
          imagesArr.push(urls[0]);
        } else {
          for (let i = 0; i < urls.length; i++) {
            imagesArr.push(urls[i]);
          }
        }

        this.setState({
          ...this.state,
          imagesArr,
        });
      },
    });
  }
  onTextChanged() {
    const editsthink = this.editsthink.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      ...this.state,
      editsthink,
    });
  }
  onDelete(e) {
    const index = e.target.getAttribute('data-index');
    const imagesArr = this.state.imagesArr;

    imagesArr.splice(index, 1);
    this.setState({
      ...this.state,
      imagesArr,
    });
  }
  onPreview(e) {
    const index = e.target.getAttribute('data-index');
    const imagesArr = this.state.imagesArr;
    wx.ready(() => {
      wx.previewImage({
        current: imagesArr[index], // 当前显示图片的http链接
        urls: imagesArr, // 需要预览的图片http链接列表
      });
    });
  }
  onPublish() {
    const editsthink = this.state.editsthink;
    const imagesArr = this.state.imagesArr;
    const data = {};

    if (this.typeId == 4 || this.typeId == 1) {
      data.type = 1;
      if (editsthink) {
        data.content = editsthink;
      }
      if (imagesArr.length >= 1) {
        data.photo = imagesArr;
      }
      this.props.upFeelingAction(data);
    } else {
      data.type = this.typeId;
      data.relation_id = this.relationId;
      if (editsthink) {
        data.content = editsthink;
      }
      if (imagesArr.length >= 1) {
        data.photo = imagesArr;
      }
      this.props.upFeelingAction(data);
    }
  }
  render() {
    return (
      <div className="page-circlepublish-container">
        <textarea placeholder="这一刻的想法…（最多200字）"className="page-circlepublish-edit-text" maxLength="200" ref={(c) => { this.editsthink = c; }} onKeyUp={this.onTextChanged} />
        <div className="page-circlepublish-images-container">
          {
          this.state.imagesArr.map((item, index) => (
            <div className="page-circlepublish-images-container-view" >
              <div className="page-circlepublish-images-container-view-x" data-index={index} onClick={this.onDelete} />
              <Avatar size={{ width: 80, height: 80, radius: 1 }} src={item} data-index={index} onClick={this.onPreview} />
            </div>
            ))
          }
          {
            this.state.imagesArr.length >= 9 ? null : <div className="page-circlepublish-images-container-up-images" onClick={this.onAvatarClick} />
          }


        </div>
        <div className="page-circlepublish-btn" onClick={this.onPublish}>发表</div>
      </div>
    );
  }
}


CirclePublish.title = '动态发布';

CirclePublish.propTypes = {

  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
};

export default connect(
  state => ({
    upFeeling: state.circle.upFeeling,
  }),
  dispatch => bindActionCreators({ upFeelingAction },
    dispatch),
)(CirclePublish);

