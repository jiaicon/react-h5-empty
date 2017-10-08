import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import './list.css';
import Link from '../../../components/link/link';
import Filter from '../../../components/filter/filter';
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

    this.selectedOption = {
      service_object: '',
      service_category: '',
      sort: '最新发布',
    };
  }

  componentWillMount() {
    this.requestList();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onFilterChange(selectedOption) {
    this.selectedOption = {
      service_object: selectedOption.objects,
      service_category: selectedOption.categories,
      sort: selectedOption.types,
    };

    this.requestList();
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

  requestList(more) {
    const { list: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.requestProjectList({
      ...this.selectedOption,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }

  render() {
    const { list: { data: listData } } = this.props;
    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);

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
            />
          </div>
          <div className="project-list">
            <Projects projects={listData ? listData.list : null} />
          </div>
          {
            showLoadingMore
            ?
              <div className="loading-more">
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
