/**
 * @file 志愿团队
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import Link from '../../../components/link/link';
import { teamAction, searchAction } from '../my.store';
import './teams.css';
import Item from './component/item';

class Teams extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      toggle: true,
    };
  }

  componentWillMount() {
    console.log('渲染前');
    this.props.teamAction();
  }

  componentDidMount() {
    console.log('渲染完成');
  }

  componentWillReceiveProps(nextProps) {
    console.log('接收数据');
    // const { search: csearch } = this.props;
    // const { search: nsearch } = nextProps;
    // if (nsearch && csearch && csear.fetching && !nsearch.fetching && !nsearch.failed) {
    //   this.setState({
    //     ...this.state,
    //     toggle: false,
    //   });
    // }
  }

  componentWillUnmount() {
    this.setState({
      ...this.state,
      toggle: true,
    });
  }
  onTextChanged=() => {
    const searchname = this.searchname.value.replace(/(^\s+)|(\s+$)/g, '');
    this.setState({
      ...this.state,
      searchname,
    });
  }
  onSearch=() => {
    const searchname = this.state.searchname;
    if (!searchname) {
      Alert.warning('请正确输入团队名称');
      return;
    }
    this.props.searchAction(searchname);
  }
  onCancel=() => {
    this.setState({
      ...this.state,
      toggle: true,
    });
  }
  renderTeamTemplate=() => {
    // const data = this.props.team.data;
    // console.log(this.props.team.data);
    const data = this.props.team.data;
    if (!data || !data.list) {
      return <div />;
    }
    return (
      <div>
        {data.list.map((item, key) => <Item data={item} key={key} />)}
      </div>
    );
  }
  renderSearchTemplate=() => {
    // const ndata = this.props.search;
    const ndata = [
      {
        id: 123,
        name: 'cccc远征1号队',
        slogan: '服务为名',
        logo: '',
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
    ];
    return (
      <div>
        {ndata.map((item, key) => <Item data={item} key={key} />)}
      </div>
    );
  }

  render() {
    const toggle = this.state;
    return (
      <div className="page-teams-container">
        <div className="page-teams-search-container">
          <div className="page-teams-search-box">
            <div className="page-teams-search-btn" onClick={this.onSearch} />
            <input type="text" className="page-teams-search" placeholder="搜索志愿项目" ref={(c) => { this.searchname = c; }} onChange={this.onTextChanged} />
            <div
              className={cx({
                'page-teams-search-cancel': true,
                'page-teams-search-cancel-hidden': toggle,
              })}
              onClick={this.onCancel}
            >X</div>
          </div>
        </div>
        <div className="line1px" />
        <div className="page-teams-main">
          {toggle ? this.renderTeamTemplate() : this.searchTeamTemplate()}


        </div>

      </div>
    );
  }
}


Teams.title = '志愿团队';

Teams.propTypes = {
  teamAction: PropTypes.func,
  searchAction: PropTypes.func,
  team: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({
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
    }),
  }),
  search: PropTypes.arrayOf(PropTypes.shape({
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
    team: state.my.team,
    search: state.my.search,

  }),
  dispatch => bindActionCreators({
    teamAction, searchAction },
    dispatch),
)(Teams);

