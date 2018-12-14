/* eslint  "no-nested-ternary":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import queryString from 'query-string';
import './list.css';
import history from '../../history';
import Link from '../../../components/link/link';
import Filter from '../component/filter/filter';
import Teams from '../../../components/teams/teams';
import { isWindowReachBottom } from '../../../utils/funcs';
import { getAreaCity } from '../../home/home.store';
import { getCity } from "../../../utils/funcs";
import {
  requestTeamList,
} from './list.store';

class TeamListPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isFilterShow: false,
      countyNames: [],
    };

    const params = queryString.parse(location.search);

    this.selectedOption = {
      county_id: '',
      service_object: '',
      team_type: '',
    };
  }

  componentWillMount() {
    let { type, category, target } = this.props.route.params;
    type = parseInt(type, 10);
    category = parseInt(category, 10);
    target = parseInt(target, 10);

    this.selectedOption = {
      team_type: window.teamCategory[type],
      county_id: '',
      service_object: window.serviceTarget[category],
    };
    this.requestList(false);
    getCity(
      (city, str) => {
        this.props.getAreaCity(city);
      },
      () => {
        Alert.error("定位失败，请确认同意微信定位授权");
      }
    );
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextprops) {
    const { area: Larea } = this.props;
    const { area: Narea } = nextprops;
    const countyNames = [];
    const countyId = [];
    if (Narea.data) {
      for (const i in Narea.data.list) {
        countyNames.push(Narea.data.list[i].name);
        countyId.push(Narea.data.list[i].id);
      }
      this.setState({
        countyNames,
        countyId,
      });
    }

    let { type, category, target } = this.props.route.params;
    const { type: ntype, category: ncategory, target: ntarget } = nextprops.route.params;

    if ((type === ntype) &&
        (category === ncategory) &&
        (target === ntarget)) {
      return;
    }

    type = parseInt(ntype, 10);
    category = parseInt(ncategory, 10);
    target = parseInt(ntarget, 10);
    const countyIdArr = this.state.countyId;
    this.selectedOption = {
      team_type: window.teamCategory[type],
      service_object: window.serviceTarget[category],
      county_id: countyIdArr[target],

    };
    this.requestList(false);
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  onFilterChange(selectedOption) {
    const { type, category, target } = selectedOption;
    // history.push(`/team/list/type/${type}/category/${category}/target/${target}`);
    window.location.href = `/team/list/type/${type}/category/${category}/target/${target}`;
  }

  onFilterShow() {
    this.setState({
      ...this.state,
      isFilterShow: true,
    });
  }

  onFilterHide() {
    this.setState({
      ...this.state,
      isFilterShow: false,
    });
  }
  handleScroll() {
    if (isWindowReachBottom(80)) {
      this.requestList(true);
    }
  }

  requestList(more) {
    const { list: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.requestTeamList({
      ...this.selectedOption,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }

  render() {
    const { list: { data: listData } } = this.props;
    const { area: { data: areaData } } = this.props;

    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);
    let { type, category, target } = this.props.route.params;


    type = parseInt(type, 10);
    category = parseInt(category, 10);
    target = parseInt(target, 10);
    return (
      <div className="page-team-list">
        <div className="header">
          <div className="search-bar-container">
            <Link className="component-search-bar" to="/team/search">
              <input className="input" placeholder="搜索团队"  disabled="disabled" />
            </Link>
          </div>
        </div>
        <div className="project-filter-container" style={{ height: this.state.isFilterShow ? '100%' : 'auto' }}>
          <Filter
            onFilterChange={this.onFilterChange}
            onFilterShow={this.onFilterShow}
            onFilterHide={this.onFilterHide}
            type={type}
            category={category}
            target={target}
            countyNames={this.state.countyNames}
            data={areaData}
          />
        </div>
        <div className="body">

          <div className="team-list">
            <Teams teams={listData ? listData.list : null} />
          </div>
          {
            showLoadingMore
            ?
              <div className="component-loading-more">
                <img src="/images/icon_loading.png" alt="loading" />
              正在加载
            </div>
            : null
          }
          <div className="takeup" />
        </div>

        <div className="tabs-container">
          <div className="line1px" />
          <ul className="tabs">
            <li>
              <Link to="/">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-home': true,
                  })}
                />
                <span>首页</span>
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-signin': true,
                  })}
                />
                <span>签到打卡</span>
              </Link>
            </li>
            <li>
              <Link to="/my">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-me': true,
                  })}
                />
                <span>个人中心</span>
              </Link>
            </li>
          </ul>
        </div>


      </div>
    );
  }
}

TeamListPage.propTypes = {
  requestTeamList: PropTypes.func,
  list: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number,
      }),
    }),
  }),
  route: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      type: PropTypes.string,
      category: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
};

TeamListPage.title = '志愿团队';

export default connect(
  state => ({
    list: state.team.list,
    user: state.user,
    getAreaCity: PropTypes.func,
    area: state.home.getAreaCity,
  }),
  dispatch => bindActionCreators({
    requestTeamList, getAreaCity,
  }, dispatch),
)(TeamListPage);
