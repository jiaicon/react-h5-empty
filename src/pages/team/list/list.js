import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import './list.css';
import Link from '../../../components/link/link';
import Teams from '../../../components/teams/teams';
import { isWindowReachBottom } from '../../../utils/funcs';

import {
  requestTeamList,
} from './list.store';

class TeamListPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
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

    this.props.requestTeamList({
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }

  render() {
    const { list: { data: listData } } = this.props;

    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);

    return (
      <div className="page-team-list">
        <div className="header">
          <div className="search-bar-container">
            <Link className="component-search-bar" to="/team/search">
              <input className="input" placeholder="搜索团队" />
            </Link>
          </div>
        </div>
        <div className="line1px" />
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
};

TeamListPage.title = '志愿团队';

export default connect(
  state => ({
    list: state.team.list,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestTeamList,
  }, dispatch),
)(TeamListPage);
