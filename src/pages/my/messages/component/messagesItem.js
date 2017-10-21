/**
 * @file 我的消息
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import '../messages.css';

import Avatar from '../../../../components/avatar/avatar';


class MessagesItem extends React.Component {

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

  render() {
    const data = this.props.data;
    if (!data) {
      return <div />;
    }
    const time = data.publish_time;
    const timeArr = time.split('-');
    const year = timeArr[0];
    const month = timeArr[1];
    const day = timeArr[2].split(' ')[0];
    return (
      <div className="page-messagesitem">
        <div className="page-messagesitem-header">
          <Avatar src={data.avatars} size={{ width: 30, height: 30, radius: 4 }} />

          <div className="page-messagesitem-header-title-container">
            <div className="page-messagesitem-header-title-container-bussiness">{data.username}</div>
            <div className="page-messagesitem-header-title-container-date">{year}.{month}.{day}</div>
          </div>
        </div>
        <div className="page-messagesitem-messagestitle">{data.title}</div>
        <div className="page-messagesitem-content">{data.content}</div>
        <div className="line1px" />


      </div>
    );
  }
}


MessagesItem.title = '站内邮箱';

MessagesItem.propTypes = {
  data: PropTypes.shape({
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
  }),
};

export default MessagesItem;
