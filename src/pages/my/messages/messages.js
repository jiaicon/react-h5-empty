/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './messages.css';
import MessagesItem from './component/messagesItem';
import { messagesAction } from '../my.store';

class Messages extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.messagesAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-messages">
        {this.props.messages.data && this.props.messages.data.list && this.props.messages.data.list.length ?
          this.props.messages.data.list && this.props.messages.data.list.map((item, keys) => <MessagesItem index={keys} data={item} />) :
          <div className="page-messages-no-info">还没有消息哟</div>}

      </div>
    );
  }
}


Messages.title = '站内邮箱';

Messages.propTypes = {
  messagesAction: PropTypes.func,
  messages: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          type: PropTypes.number,
          content: PropTypes.string,
          publish_time: PropTypes.string,
          from_user: PropTypes.shape({
            token: PropTypes.string,
            id: PropTypes.number,
            username: PropTypes.string,
            phone: PropTypes.string,
            avatars: PropTypes.string,
            real_name: PropTypes.string,
            nation: PropTypes.string,
            sex: PropTypes.number,
            birthday: PropTypes.string,
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
        })),
    }),
  }),
};

export default connect(
  state => ({
    messages: state.my.messages,
  }),
  dispatch => bindActionCreators({ messagesAction }, dispatch),
)(Messages);
