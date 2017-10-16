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
import history from '../../history';
import { imporvePersonInfo } from './profile.store';
import './checkbox.css';


class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      limitArr: [],
      limitNum: 3,
    });
  }


  componentWillMount() {
    const GoodAt = (window.goodAt == null ?
      ['关爱服务', '国际服务', '社区服务', '应急救援', '赛事服务', '医疗卫生', '绿色环保', '文化倡导', '教育', '助残', '助老', '其他'] :
       window.goodAt);
    const data = [];
    for (let i = 0; i < GoodAt.length; i += 1) {
      const obj = {};
      obj.name = GoodAt[i];
      obj.num = i + 1;
      obj.toggle = false;
      Object.assign({}, obj);
      data.push(obj);
      this.setState({
        ...this.state,
        data,
      });
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { person: Cperson } = this.props;
    const { person: Nperson } = nextProps;
    if (Cperson.fetching && !Nperson.fetching && !Nperson.failed) {
      history.replace('/my/profile/detail/user');
    }
  }

  componentWillUnmount() {}

  onSubmit() {
    const limitArr = this.state.limitArr;
    const data = {
      good_at: limitArr,
    };
    this.props.imporvePersonInfo(data);
  }
  checkNumCLick(e) {
    const limitArr = this.state.limitArr;
    const limitNum = this.state.limitNum;
    const data = this.state.data;
    const len = limitArr.length;
    if (!data[e.target.id - 1].toggle && len < limitNum) {
      data[e.target.id - 1].toggle = true;
      limitArr.push(data[e.target.id - 1].name);
      this.setState({
        data,
        limitArr,
      });
    } else if (data[e.target.id - 1].toggle && len <= limitNum) {
      data[e.target.id - 1].toggle = false;
      const index = limitArr.indexOf(data[e.target.id - 1].name);
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
          {data.map(item =>
            <li>
              <label htmlFor={item.num}>
                <input id={item.num} checked={item.toggle} type="checkbox" key={item.name} ref={c => this.checkbox = c} onChange={this.checkNumCLick} /><i>✓</i>{item.name}
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
  imporvePersonInfo: PropTypes.func,
  person: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
  }),
};

export default connect(
  state => ({
    person: state.info.person,
  }),
  dispatch => bindActionCreators({ imporvePersonInfo }, dispatch),
)(Checkbox);
