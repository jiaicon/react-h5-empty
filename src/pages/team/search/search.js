import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './search.css';
import Teams from '../../../components/teams/teams';
import { isWindowReachBottom } from '../../../utils/funcs';
import history from '../../history';
import { translate } from 'react-i18next';
import i18next from 'i18next';

import {
  requestSearch,
} from './search.store';

class TeamSearchPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.keyword = '';
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.searchInput.focus();

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.search(true);
    }
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

  handleSearch(evt) {
    evt.preventDefault();
    const newKeyword = this.searchInput.value;

    if (!newKeyword || newKeyword === this.keyword) {
      return;
    }

    this.keyword = newKeyword;

    this.search();
  }

  /* eslint-disable */
  handleCancelSearch() {
    history.goBack();
  }
  /* eslint-enable */

  render() {
    const { list: { data: listData, keyword }, t } = this.props;
    const showLoadingMore = listData && (keyword === this.keyword) &&
    listData.page && (listData.page.current_page < listData.page.total_page);

    return (
      <div className="page-team-search">
        <div className="header"  onClick={this.handleSearch}>
          <div className="search-bar-container">
            <form onSubmit={this.handleSearch} className="component-search-bar">
              <input ref={(el) => { this.searchInput = el; }} onBlur={this.handleSearch} className="input" placeholder={t('搜索团队')} autofocus="autofocus" />
            </form>
            <button onClick={this.handleCancelSearch}>{t('取消')}</button>
          </div>
        </div>
        <div className="line1px" />
        <div className="body">
          <div className="team-list">
            <Teams teams={listData && keyword === this.keyword ? listData.list : null} />
          </div>
          {
          showLoadingMore
          ?
            <div className="component-loading-more">
              <img src="/images/icon_loading.png" alt="loading" />
              {t('正在加载')}
          </div>
          : null
        }
        </div>
      </div>
    );
  }
}

TeamSearchPage.propTypes = {
  requestSearch: PropTypes.func,
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

TeamSearchPage.title = i18next.t('搜索志愿团队');

export default connect(
  state => ({
    list: state.team.search,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestSearch,
  }, dispatch),
)(translate('translations')(TeamSearchPage));
