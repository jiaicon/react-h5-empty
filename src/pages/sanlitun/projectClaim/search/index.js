/**
 * @file 项目认领列表页
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../../history';

import Link from '../../../../components/link/link';
import './index.css';
import IMAGE from '../../../../components/image/image';
import Projects from '../../component/projects/projects';
import { isWindowReachBottom } from '../../../../utils/funcs';

import { requestSearch } from '../../starModel/starModel.store';

class projectClaimSearch extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {}

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.search(true);
    }
  }
  handleSearch(evt) {
    evt.preventDefault();
    const newKeyword = this.searchInput.value;

    if (!newKeyword || newKeyword === this.keyword) {
      return;
    }

    this.keyword = newKeyword;

    this.search();
  }
  search(more) {
    const { list: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.requestSearch({
      name: this.keyword,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }
  handleCancelSearch() {
    history.goBack();
  }
  render() {
    const { list: { data: listData, keyword } } = this.props;
    const showLoadingMore = listData && (keyword === this.keyword) &&
    listData.page && (listData.page.current_page < listData.page.total_page);
    return (
      <div className="page-projectclaimsearch">
        <div className="header">
          <div className="search-bar-container">
            <form onSubmit={this.handleSearch} className="component-search-bar">
              <input ref={(el) => { this.searchInput = el; }} onBlur={this.handleSearch} className="input" placeholder="搜索项目" />
            </form>
            <button onClick={this.handleCancelSearch}>取消</button>
          </div>
        </div>
        <div className="line1px" />
        <div className="body">
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


projectClaimSearch.propTypes = {


};

projectClaimSearch.title = '搜索认领项目';

export default connect(
  state => ({
    list: state.sanlitun.search,
  }),
  dispatch => bindActionCreators({
    requestSearch,
  }, dispatch),
)(projectClaimSearch);
