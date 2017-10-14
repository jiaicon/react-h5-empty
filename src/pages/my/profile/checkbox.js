/**
 * @file 我的消息
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserInfo } from '../../../stores/common';
import { imporvePersonInfo } from './profile.store';
import './checkbox.css';


class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      limitArr: [],
      data: [
        {
          num: 1,
          name: '关爱服务',
          toggle: false,
        },
        {
          num: 2,
          name: '国际服务',
          toggle: false,
        },
        {
          num: 3,
          name: '社区服务',
          toggle: false,
        },
        {
          num: 4,
          name: '应急救援',
          toggle: false,
        },
        {
          num: 5,
          name: '赛事服务',
          toggle: false,
        },
        {
          num: 6,
          name: '医疗卫生',
          toggle: false,
        },
        {
          num: 7,
          name: '绿色环保',
          toggle: false,
        },
        {
          num: 8,
          name: '文化倡导',
          toggle: false,
        },
        {
          num: 9,
          name: '教育',
          toggle: false,
        },
        {
          num: 10,
          name: '助残',
          toggle: false,
        },
        {
          num: 11,
          name: '助老',
          toggle: false,
        },
        {
          num: 12,
          name: '其他',
          toggle: false,
        },
      ],
    });
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  onSubmit=() => {

  }
  checkNumCLick(e) {
    const limitArr = this.state.limitArr;
    const data = this.state.data;
    const len = limitArr.length;
    if (!data[e.target.id - 1].toggle && len < 3) {
      data[e.target.id - 1].toggle = true;
      limitArr.push(e.target.id - 1);
      this.setState({
        data,
        limitArr,
      });
    } else if (data[e.target.id - 1].toggle && len <= 3) {
      data[e.target.id - 1].toggle = false;
      const index = limitArr.indexOf(e.target.id);
      limitArr.splice(index, 1);
      this.setState({
        limitArr,
        data,
      });
    }
  }

  render() {
    const data = this.state.data;
    return (
      <div className="page-profile-checkbox-container">
        <ul className="page-profile-checkbox-ground">
          {data.map((item, keys) =>
            <li>
              <label htmlFor="check">
                <input id="check" checked={item.toggle} type="checkbox" ref={c => this.checkbox = c} index={keys} onChange={this.checkNumCLick} id={item.num} /><i>✓</i>{item.name}
              </label>
            </li>,
          )}
        </ul>
        <div className="page-profile-checkbox-btn" onClick={this.onSubmit}>提交</div>
      </div>
    );
  }
}


Checkbox.title = '多选列表';
Checkbox.propTypes = {
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
    good_at: PropTypes.arrayOf(),
  }),
};

export default connect(
  state => ({
    user: state.user,
    person: state.info.person,
  }),
  dispatch => bindActionCreators({ requestUserInfo, imporvePersonInfo }, dispatch),
)(Checkbox);
