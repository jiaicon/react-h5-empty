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
import { imporvePersonInfo } from './profile.store';
import './checkbox.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      
      goodAt: localStorage.getItem("goodAt")?JSON.parse(localStorage.getItem("goodAt")):[],
      limitArr: [],
      limitNum: 3,
    });
  }


  componentWillMount() {
    const { goodAt } = this.state;
    const { t } = this.props;
    const GoodAt = window.goodAt == null ? [t('社区服务'),t('国际服务'),  t('应急救援'), t('赛事服务'), t('医疗卫生'), t('绿色环保'), t('文化倡导'), t('教育'), t('助残'), t('助老'), t('其他')] : window.goodAt;
    const data = [];
    for (let i = 0; i < GoodAt.length; i += 1) {
      const obj = {};
      obj.name = GoodAt[i];
      obj.num = i + 1;
      obj.toggle = false;
      Object.assign({}, obj);
      data.push(obj);
     
    }
    var arr = [];
  
    if (goodAt.length>0) {
      for (var attr in goodAt) {
        arr.push(goodAt[attr].good_at_name);
        
      }
      for (let i = 0; i < GoodAt.length; i += 1){
        console.log(data[i])
        for (var attr in goodAt) {
          if (goodAt[attr].good_at_name == data[i].name) {
            data[i].toggle = true;
          }
        }
        
      }
    }
    this.setState({ ...this.state, data, limitArr: arr, });
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { person: Cperson } = this.props;
    const { person: Nperson } = nextProps;
    if (Cperson.fetching && !Nperson.fetching && !Nperson.failed) {
      window.location.replace('/my/profile/detail/user');
      // history.replace('/my/profile/detail/user');
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
    console.log(limitArr);
    console.log(limitNum);
  }

  render() {
    const data = this.state.data;
    const {t} = this.props;
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
        <div className="page-profile-checkbox-btn" onClick={this.onSubmit}>{t('提交')}</div>
      </div>
    );
  }
}


Checkbox.title = i18next.t('个人擅长');
Checkbox.propTypes = {
  imporvePersonInfo: PropTypes.func,
  person: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
  }),
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

    }))

  }),
};

export default connect(
  state => ({
    user: state.user,
    person: state.info.person
  }),
  dispatch => bindActionCreators({ imporvePersonInfo }, dispatch)
)(translate('translations')(Checkbox));
