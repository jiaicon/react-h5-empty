/**
 * @file 我的消息
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { imporvePersonInfo } from './profile.store.js';
import './edit.css';
import history from '../../history';

class Edit extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      slogan: '',
    });
  }

  componentWillMount() {


  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { info: cInfo } = this.props;
    const { info: nInfo } = nextProps;
    if (cInfo.fetching && !cInfo.failed && !nInfo.fetching && !nInfo.failed) {
      window.location.replace('/my/profile/detail/user');
      // history.replace('/my/profile/detail/user');
    }
  }

  componentWillUnmount() {}
  onTextChanged(evt) {
    evt.preventDefault();
    const slogan = this.editslogan.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      slogan,
    });
  }
  onSubmit() {
    const slogan = this.state.slogan;
    if (slogan) {
      const data = {
        slogan,
      };
      this.props.imporvePersonInfo(data);
    } else {
      window.location.replace('/my/profile/detail/user');
      // history.replace('/my/profile/detail/user');
    }
  }
  render() {
    return (
      <div className="page-my-profile-edit-container">
        <textarea placeholder={this.props.user.slogan} className="page-my-profile-edit-text" maxLength="20" ref={(c) => { this.editslogan = c; }} onBlur={this.onTextChanged} />
        <div className="page-mu-profile-edit-btn" onClick={this.onSubmit}>保存</div>

      </div>
    );
  }
}


Edit.title = '志愿口号';
Edit.propTypes = {
  imporvePersonInfo: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    id_number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
  info: PropTypes.shape({}),
};

export default connect(
  state => ({
    user: state.user,
    info: state.info.person,
    address: state.info.address,
  }),
  dispatch => bindActionCreators({ imporvePersonInfo }, dispatch),
)(Edit);
