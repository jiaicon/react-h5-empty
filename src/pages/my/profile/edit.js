/**
 * @file 我的消息
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserInfo } from '../../../stores/common';
import './edit.css';

class Edit extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  onTextChanged=() => {
    const sologan = this.editslogogan.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      sologan,
    });
  }
  onSubmit=() => {
    const sologan = this.state.sologan;
  }
  render() {
    const data = this.props.user;
    return (
      <div className="page-my-profile-edit-container">
        <textarea placeholder="请介绍自己..." className="page-my-profile-edit-text" maxLength="20" ref={(c) => { this.editslogogan = c; }} onKeyUp={this.onTextChanged} />
        <div className="page-mu-profile-edit-btn" onClick={this.onSubmit}>保存</div>

      </div>
    );
  }
}


Edit.title = '志愿口号';
Edit.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    birthday: PropTypes.number,
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.number,
    id_number: PropTypes.number,
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    family_id: PropTypes.number,
    join_family_time: PropTypes.string,
    good_at: PropTypes.arrayOf(PropTypes.shape({

    })),
  }),
};

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({ requestUserInfo }, dispatch),
)(Edit);
