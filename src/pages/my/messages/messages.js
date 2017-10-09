/**
 * @file 我的消息
 */

/* global wx:false */
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
    // const data =this.props.messages;
    const data = [
      {
        id: 123,
        type: 1,
        content: '文字描述1111111111111111111111111111111',
        publish_time: '2019-08-03',
        from_user: {
          id: 123,
          username: '梦里花落知多少',
          phone: '15500000000',
          avatars: 'http://www.wangmingdaquan.cc/tx57/154.jpg',
          real_name: '',
          nation: '汉族',
          sex: 0,
          birthday: 2007,
          identifier: '111',
          slogan: '明天更美丽',
          reward_time: 12.5,
          id_number: 110101198803031330,
          province_id: 12,
          province_name: '河北',
          city_id: 1212,
          city_name: '保定',
          county_id: 121212,
          county_name: '望都县',
          addr: 'xx路xx小区',
          family_id: 0,
          join_family_time: '2017-09-09 13:13:13',
          good_at: [{}],
          token: 'aaaaaaa',
        },
      },
      {
        id: 123,
        type: 1,
        content: '文字描述111122342342342342341111111111111111',
        publish_time: '2019-08-03',
        from_user: {
          id: 123,
          username: '梦里花落知多少',
          phone: '15500000000',
          avatars: 'http://www.wangmingdaquan.cc/tx57/154.jpg',
          real_name: '',
          nation: '汉族',
          sex: 0,
          birthday: 2007,
          identifier: '111',
          slogan: '明天更美丽',
          reward_time: 12.5,
          id_number: 110101198803031330,
          province_id: 12,
          province_name: '河北',
          city_id: 1212,
          city_name: '保定',
          county_id: 121212,
          county_name: '望都县',
          addr: 'xx路xx小区',
          family_id: 0,
          join_family_time: '2017-09-09 13:13:13',
          good_at: [{}],
          token: 'aaaaaaa',
        },
      },
    ];
    return (
      <div className="page-messages">
        {
        data.map((item, index) => <MessagesItem index={index} data={item} />)
      }


      </div>
    );
  }
}


Messages.title = '站内邮箱';

Messages.propTypes = {
  messagesAction: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.shape({
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
  })),
};

export default connect(
  state => ({
    messages: state.messagesReducer,
  }),
  dispatch => bindActionCreators({ messagesAction }, dispatch),
)(Messages);
