/**
 * @file 志愿团队
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import { teamAction } from '../my.store';
import './teams.css';
import Item from './component/item';

class Teams extends React.Component {

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
    const searchname = this.searchname.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      searchname,
    });
  }
  onSearch=() => {
    const searchname = this.state.searchname;
  }

  render() {
    const data = [
      {
        id: 123,
        name: '服务远征1号队',
        slogan: '服务为名',
        logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506748088074&di=cc5df76d62ad75cec9d48b44ad95e83d&imgtype=0&src=http%3A%2F%2Fimg4.tbcdn.cn%2Ftfscom%2Fi8%2FTB1aFcWSFXXXXb.XVXXYXGcGpXX_M2.SS2',
        type: '企事业单位',
        team_size: 111,
        identifier: 'aaa',
        contact_name: '张三',
        contact_phone: '18866666666',
        contact_addr: '某某省某某市',
        parent_id: 13,
        province_id: 12,
        province_name: '河北',
        city_id: 1212,
        city_name: '保定',
        county_id: 121212,
        county_name: '望都县',
        time_long: 12.5,
        abstract: '团队市很棒的',
        created_at: '2017-03-03',
        join_status: 0,
        category: {
          service_category_name: '赛事服务',
        },
      },
      {
        id: 123,
        name: '服务远征1号队',
        slogan: '服务为名',
        logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506748088074&di=cc5df76d62ad75cec9d48b44ad95e83d&imgtype=0&src=http%3A%2F%2Fimg4.tbcdn.cn%2Ftfscom%2Fi8%2FTB1aFcWSFXXXXb.XVXXYXGcGpXX_M2.SS2',
        type: '企事业单位',
        team_size: 111,
        identifier: 'aaa',
        contact_name: '张三',
        contact_phone: '18866666666',
        contact_addr: '某某省某某市',
        parent_id: 13,
        province_id: 12,
        province_name: '河北',
        city_id: 1212,
        city_name: '保定',
        county_id: 121212,
        county_name: '望都县',
        time_long: 12.5,
        abstract: '团队市很棒的',
        created_at: '2017-03-03',
        join_status: 1,
        category: {
          service_category_name: '赛事服务',
        },
      },
    ];
    return (
      <div className="page-teams-container">
        <div className="page-teams-search-container">
          <div className="page-teams-search-box">
            <div className="page-teams-search-btn" onClick={this.onSearch} />
            <input type="text" className="page-teams-search" placeholder="搜索志愿项目" ref={(c) => { this.searchname = c; }} onChange={this.onTextChanged} />
          </div>
          {/** <div className="page-teams-search-cancel">取消</div>* */}
        </div>
        <div className="line1px" />
        <div className="page-teams-main">
          {data.map((item, index) => <Item key={index} data={item} />)}


        </div>

      </div>
    );
  }
}


Teams.title = '志愿团队';

Teams.propTypes = {
  teamAction: PropTypes.func,
  team: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    logo: PropTypes.string,
    type: PropTypes.string,
    team_size: PropTypes.number,
    identifier: PropTypes.string,
    contact_name: PropTypes.string,
    contact_phone: PropTypes.string,
    contact_addr: PropTypes.string,
    parent_id: PropTypes.number,
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    time_long: PropTypes.number,
    abstract: PropTypes.string,
    created_at: PropTypes.string,
    category: PropTypes.string,
    join_status: PropTypes.number,
  })),
};


export default connect(
  state => ({
    team: state.teamReducer,

  }),
  dispatch => bindActionCreators({
    teamAction },
    dispatch),
)(Teams);

