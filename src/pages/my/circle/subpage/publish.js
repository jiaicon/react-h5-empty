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
import { saveProjectTabIndex } from '../../../project/detail/detail.store';
import { saveTeamTabIndex } from '../../../team/detail/detail.store';
import history from '../../../history';


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
        window.location.replace('/my/circlevisits');
      } else if (this.typeId == 2) {
        // this.props.saveProjectTabIndex(2);
        window.location.replace(`/project/detail/${this.relationId}`);
      } else if (this.typeId == 3) {
        // this.props.saveTeamTabIndex(3);
        window.location.replace(`/team/detail/${this.relationId}`);
      } else if (this.typeId == 4) {
        window.location.replace('/my/circle');
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
    } else if(this.typeId == 2 || this.typeId == 3){
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
        <textarea
          placeholder="这一刻的想法…（最多200字）"
          className="page-circlepublish-edit-text" maxLength="200"
          ref={(c) => { this.editsthink = c; }} onBlur={this.onTextChanged}
        />
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
  dispatch => bindActionCreators({ upFeelingAction, saveTeamTabIndex, saveProjectTabIndex },
    dispatch),
)(CirclePublish);

