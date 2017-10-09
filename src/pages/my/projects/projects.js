/**
 * @file 志愿项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import cx from 'classnames';
import Link from '../../../components/link/link';
import { projectAction } from '../my.store';
import ProjectItem from './component/projectItem';
import TabItem from './component/tabItem';

import './projects.css';

class Projects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      title: ['全部', '待录用', '已录用', '已结束'],
      current: 0,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  handleClick(index) {
    this.setState({
      ...this.state,
      current: index,
    });
  }
  currentClass(index) {
    return this.state.current === index ? 'page-projects-tab-current-li' : '';
  }
  render() {
    // const data=this.props.project;
    // 全部
    const data = [{
      id: 123,
      name: '程序员慰问团0000000',
      photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506754373480&di=df84f02861307ec683a817427a8f9601&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0b7b02087bf40ad15c132f235e2c11dfa8ecce7f.jpg',
      content: '富文本',
      identifier: '',
      province_id: 1,
      province_name: '河北',
      city_id: 11,
      city_name: '保定',
      county_id: 11,
      county_name: '望都',
      addr: 'ssss',
      lng: 123.123433,
      lat: 40.984,
      join_begin: '2017-09-09',
      join_end: '2017-10-10',
      begin: '2013-03-03 12:12:12',
      end: '2013-03-03 12:12:12',
      people_count: 133,
      join_people_count: 13,
      reward_time: 13.5,
      activity_status: 1,
      category: '@服务类别',
      service_object: '@服务对象',
      team:
      {
        id: 123,
        name: '服务远征1号队',
        slogan: '服务为名',
        logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506754373480&di=df84f02861307ec683a817427a8f9601&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0b7b02087bf40ad15c132f235e2c11dfa8ecce7f.jpg',
        type: '企事业单位',
        team_size: 111,
        identifier: 'aaa',
        contact_name: '张三',
        contact_phone: '18866666666',
        contact_addr: '某某省某某市',
        province_id: 12,
        province_name: '河北',
        city_id: 1212,
        city_name: '保定',
        county_id: 121212,
        county_name: '望都县',
        addr: 'xx区',
        reward_time: 12.5,
        abstract: '团队市很棒的',
        created_at: '2017-03-03',
        parent: '@团队信息',
        category: ' @服务类别',
        service_object: ' @服务对象',
        join_status: 1,
        collection_status: 1,
      },
      join_status: 0,
      my_reward_time: 10,
    },
    {
      id: 123,
      name: '程序员慰问团111111',
      photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506754373480&di=df84f02861307ec683a817427a8f9601&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0b7b02087bf40ad15c132f235e2c11dfa8ecce7f.jpg',
      content: '富文本',
      identifier: '',
      province_id: 1,
      province_name: '河北',
      city_id: 11,
      city_name: '保定',
      county_id: 11,
      county_name: '望都',
      addr: 'ssss',
      lng: 123.123433,
      lat: 40.984,
      join_begin: '2017-09-09',
      join_end: '2017-10-10',
      begin: '2013-03-03 12:12:12',
      end: '2013-03-03 12:12:12',
      people_count: 133,
      join_people_count: 13,
      reward_time: 13.5,
      activity_status: 1,
      category: '@服务类别',
      service_object: '@服务对象',
      team:
      {
        id: 123,
        name: '服务远征1号队',
        slogan: '服务为名',
        logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506754373480&di=df84f02861307ec683a817427a8f9601&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0b7b02087bf40ad15c132f235e2c11dfa8ecce7f.jpg',
        type: '企事业单位',
        team_size: 111,
        identifier: 'aaa',
        contact_name: '张三',
        contact_phone: '18866666666',
        contact_addr: '某某省某某市',
        province_id: 12,
        province_name: '河北',
        city_id: 1212,
        city_name: '保定',
        county_id: 121212,
        county_name: '望都县',
        addr: 'xx区',
        reward_time: 12.5,
        abstract: '团队市很棒的',
        created_at: '2017-03-03',
        parent: '@团队信息',
        category: ' @服务类别',
        service_object: ' @服务对象',
        join_status: 1,
        collection_status: 1,
      },
      join_status: 1,
      my_reward_time: 10,
    },
    {
      id: 123,
      name: '程序员慰问团222222',
      photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506754373480&di=df84f02861307ec683a817427a8f9601&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0b7b02087bf40ad15c132f235e2c11dfa8ecce7f.jpg',
      content: '富文本',
      identifier: '',
      province_id: 1,
      province_name: '河北',
      city_id: 11,
      city_name: '保定',
      county_id: 11,
      county_name: '望都',
      addr: 'ssss',
      lng: 123.123433,
      lat: 40.984,
      join_begin: '2017-09-09',
      join_end: '2017-10-10',
      begin: '2013-03-03 12:12:12',
      end: '2013-03-03 12:12:12',
      people_count: 133,
      join_people_count: 13,
      reward_time: 13.5,
      activity_status: 1,
      category: '@服务类别',
      service_object: '@服务对象',
      team:
      {
        id: 123,
        name: '服务远征1号队',
        slogan: '服务为名',
        logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506754373480&di=df84f02861307ec683a817427a8f9601&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0b7b02087bf40ad15c132f235e2c11dfa8ecce7f.jpg',
        type: '企事业单位',
        team_size: 111,
        identifier: 'aaa',
        contact_name: '张三',
        contact_phone: '18866666666',
        contact_addr: '某某省某某市',
        province_id: 12,
        province_name: '河北',
        city_id: 1212,
        city_name: '保定',
        county_id: 121212,
        county_name: '望都县',
        addr: 'xx区',
        reward_time: 12.5,
        abstract: '团队市很棒的',
        created_at: '2017-03-03',
        parent: '@团队信息',
        category: ' @服务类别',
        service_object: ' @服务对象',
        join_status: 1,
        collection_status: 1,
      },
      join_status: 2,
      my_reward_time: 10,
    }];
    // join_status:0
    return (
      <div className="page-projects">
        <ul className="page-projects-tab-container">
          { this.state.title.map((val, index) => (<TabItem currentClass={this.currentClass} handleClick={this.handleClick} val={val} index={index} />)) }
        </ul>
        <div className="line1px" />
        <div>
          {data.map((item, index) => (<ProjectItem data={item} index={index} />)) }
        </div>

      </div>
    );
  }
}


Projects.title = '志愿项目';

Projects.propTypes = {
  project: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
    content: PropTypes.string,
    identifier: PropTypes.string,
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    lng: PropTypes.number,
    lat: PropTypes.number,
    join_begin: PropTypes.string,
    join_end: PropTypes.string,
    begin: PropTypes.string,
    end: PropTypes.string,
    people_count: PropTypes.number,
    join_people_count: PropTypes.number,
    reward_time: PropTypes.number,
    activity_status: PropTypes.number,
    category: PropTypes.string,
    service_object: PropTypes.string,
    team: PropTypes.string,
    join_status: PropTypes.number,
    my_reward_time: PropTypes.number,
  })),
};

export default connect(
  state => ({
    project: state.projectReducer,
  }),
  dispatch => bindActionCreators({
    projectAction,
  }, dispatch),
)(Projects);
