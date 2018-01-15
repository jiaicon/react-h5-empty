/**
 * @file 我的志愿圈-发布
 */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */


import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { teamAction } from '../my.store';

import './publish.css';
import Link from '../../../../components/link/link';

import Avatar from '../../../../components/avatar/avatar';
import uploadToWX from '../../../../utils/wxupload';

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

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }
  onAvatarClick() {
    const imagesArr = this.state.imagesArr;
    uploadToWX({
      success: (urls) => {
        imagesArr.push(urls[0]);
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
      editsthink,
    });
  }
  render() {
    return (
      <div className="page-circlepublish-container">
        <textarea placeholder="这一刻的想法…（最多200字）"className="page-circlepublish-edit-text" maxLength="200" ref={(c) => { this.editsthink = c; }} onKeyUp={this.onTextChanged} />
        <div className="page-circlepublish-images-container">
          <div className="page-circlepublish-images-container-view"><div className="page-circlepublish-images-container-view-x" /><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-view"><Avatar size={{ width: 80, height: 80, radius: 1 }} src={'http://inews.gtimg.com/newsapp_match/0/2709490253/0'} /></div>
          <div className="page-circlepublish-images-container-up-images" onClick={this.onAvatarClick} />

        </div>
        <div className="page-circlepublish-btn">发表</div>
      </div>
    );
  }
}


CirclePublish.title = '动态发布';

CirclePublish.propTypes = {
  teamAction: PropTypes.func,
  team: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        slogan: PropTypes.string,
        logo: PropTypes.string,
        type: PropTypes.string,
        team_size: PropTypes.number,
        identifier: PropTypes.string,
        contact_name: PropTypes.string,
        contact_phone: PropTypes.string,
        contact_addr: PropTypes.string,
        parent_id: PropTypes.number,
        province_id: PropTypes.number,
        province_name: PropTypes.string,
        city_id: PropTypes.number,
        city_name: PropTypes.string,
        county_id: PropTypes.number,
        county_name: PropTypes.string,
        time_long: PropTypes.number,
        abstract: PropTypes.string,
        created_at: PropTypes.string,
        category: PropTypes.string,
        join_status: PropTypes.number,
      })),
    }),
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }),
  }),
};

export default connect(
  state => ({


  }),
  dispatch => bindActionCreators({ },
    dispatch),
)(CirclePublish);

