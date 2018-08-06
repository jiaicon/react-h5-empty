/**
 * @file 我的消息
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import '../messages.css';
import Link from '../../../components/link/link';

import Images from '../../../components/image/image';

Date.prototype.Format = function (fmt) { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
  return fmt;
};
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
    const { data } = this.props;
    if (!data) {
      return null;
    } else if (data && !data.length) {
      return <div className="page-announceitem-empty-tip">目前还没有公告消息</div>;
    }

    return (
      <div>
        {
        data.map((item,i) => (
          <Link to={`/announcee/detail/${item.id}`} key={i}>
            <div className="page-announceitem" >
              <div className="main">
                <div>
                  <div className="page-announceitem-title">{item.title}</div>
                  <div className="page-announceitem-date">
                    {new Date(Date.parse(item.publish_time.replace(/-/g, '/'))).Format('yyyy年MM月dd日')}
                  </div>
                </div>
                <Images className="page-announceitem-img" resize={{ width: 109, height: 73 }} src={item.photo} defaultSrc="/images/doctor/hospital_default@2x.png" />
                {/* <img className="page-announceitem-img" src={item.photo} /> */}
              </div>
              <div className="line1px" />

            </div>

          </Link>
          ))
      }
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
