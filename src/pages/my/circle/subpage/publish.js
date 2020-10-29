/**
 * @file 我的志愿圈-发布
 */
/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import './publish.css';
import { upFeelingAction } from '../circle.store';
import { saveProjectTabIndex } from '../../../project/detail/detail.store';
import { saveTeamTabIndex } from '../../../team/detail/detail.store';
import UploadPhoto from '../../../../components/uploadPhoto/uploadPhoto';

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
        // history.replace('/my/circlevisits');
        window.location.replace('/my/circlevisits');
      } else if (this.typeId == 2) {
        // history.replace(`/project/detail/${this.relationId}`);
        window.location.replace(`/project/detail/${this.relationId}`);
      } else if (this.typeId == 3) {
        // history.replace(`/team/detail/${this.relationId}`);
        window.location.replace(`/team/detail/${this.relationId}`);
      } else if (this.typeId == 4) {
        // history.replace('/my/circle');
        window.location.replace('/my/circle');
      }
    }
  }

  componentWillUnmount() {

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
  onPublish() {
      const { upFeeling: LupFeeling } = this.props;
      if(LupFeeling.fetching)return;
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
  onPhotoChange(images) {
       console.log(images)
        this.setState({
            imagesArr: images.map(item=>item.url)
        })
    }
  render() {
    const { t } = this.props;
    return (
      <div className="page-circlepublish-container">
        <textarea
          placeholder={t('这一刻的想法')}
          className="page-circlepublish-edit-text" maxLength="200"
          ref={(c) => { this.editsthink = c; }} onBlur={this.onTextChanged}
        />
        <div className="page-circlepublish-images-container">
            <UploadPhoto onChange={this.onPhotoChange} multiple={false} length={3} totle={9} />
        </div>
        <div className="page-circlepublish-btn" onClick={this.onPublish}>{t('发表')}</div>

      </div>
    );
  }
}


CirclePublish.title = i18next.t('发布动态');

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
)(translate('translations')(CirclePublish));

