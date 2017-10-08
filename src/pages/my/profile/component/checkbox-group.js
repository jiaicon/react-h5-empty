/**
 * @file 我的消息
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './style.css';

class CheckboxGroup extends React.Component {

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
    return (
      <div>
      个人擅长暂无字段
      </div>
    );
  }
}


CheckboxGroup.title = '站内邮箱';
CheckboxGroup.propTypes = {
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

export default CheckboxGroup;
