/* eslint  "no-nested-ternary":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import './list.css';
import history from '../../history';
import Link from '../../../components/link/link';
import Filter, { TYPES_VALUE } from '../../../components/filter/filter';
import Projects from '../../../components/projects/projects';
import { isWindowReachBottom } from '../../../utils/funcs';

import {
  requestProjectList,
} from './list.store';

class ProjectListPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isFilterShow: false,
    };

    const params = queryString.parse(location.search);

    this.selectedOption = {
      service_object: '',
      service_category: '',
      sort: params.types || 'time',
    };
  }

  componentWillMount() {
    let { type, category, target } = this.props.route.params;
    type = parseInt(type, 10);
    category = parseInt(category, 10);
    target = parseInt(target, 10);

    const isRecommend = /recommend/i.test(this.props.route.path);
    this.selectedOption = {
      sort: TYPES_VALUE[type],
      service_object: window.serviceTarget[target],
      service_category: window.serviceCategory[category],
    };
    this.requestList(false, !!isRecommend);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    let { type, category, target } = this.props.route.params;
    const { type: ntype, category: ncategory, target: ntarget } = nextProps.route.params;

    if ((type === ntype) &&
        (category === ncategory) &&
        (target === ntarget)) {
      return;
    }

    type = parseInt(ntype, 10);
    category = parseInt(ncategory, 10);
    target = parseInt(ntarget, 10);
    this.selectedOption = {
      sort: TYPES_VALUE[type],
      service_object: window.serviceTarget[target],
      service_category: window.serviceCategory[category],
    };
    this.requestList(false, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onFilterChange(selectedOption) {
    // this.selectedOption = {
    //   service_object: selectedOption.objects,
    //   service_category: selectedOption.categories,
    //   sort: selectedOption.types === '距离最近' ? 'distance' : 'time',
    // };

    // this.requestList();
    const { type, category, target } = selectedOption;

    history.push(`/project/list/type/${type}/category/${category}/target/${target}`);
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
    if (isWindowReachBottom(50)) {
      this.requestList(true);
    }
  }

  requestList(more, recommend) {
    const { list: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.requestProjectList({
      ...this.selectedOption,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
      recommend: recommend ? 1 : 0,
    });
  }

  render() {
    const { list: { data: listData } } = this.props;
    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);

    let { type, category, target } = this.props.route.params;
    type = parseInt(type, 10);
    category = parseInt(category, 10);
    target = parseInt(target, 10);

    return (
      <div className="page-project-list">
        <div className="header">
          <div className="search-bar-container">
            <Link className="component-search-bar" to="/project/search">
              <input className="input" placeholder="搜索项目" />
            </Link>
          </div>
        </div>
        <div className="body">
          <div className="project-filter-container" style={{ height: this.state.isFilterShow ? '100%' : 'auto' }}>
            <Filter
              onFilterChange={this.onFilterChange}
              onFilterShow={this.onFilterShow}
              onFilterHide={this.onFilterHide}
              type={type}
              category={category}
              target={target}
            />
          </div>
          <div className="project-list">
            <Projects projects={listData ? listData.list : null} />
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
        </div>
      </div>
    );
  }
}

ProjectListPage.propTypes = {
  requestProjectList: PropTypes.func,
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

ProjectListPage.title = '志愿项目';

export default connect(
  state => ({
    list: state.project.list,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestProjectList,
  }, dispatch),
)(ProjectListPage);
