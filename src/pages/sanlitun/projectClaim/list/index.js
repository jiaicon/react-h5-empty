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

import { requestClaimProjectList } from '../../starModel/starModel.store';

class projectClaim extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.requestList(false, false);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}
  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.requestList(true);
      console.log('加载');
    }
  }
  requestList(more, recommend) {
    const { claimList: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.requestClaimProjectList({
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }
  render() {
    const { claimList: { data: listData } } = this.props;
    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);
    return (
      <div className="page-projectclaim">
        <div className="page-projectclaim-header">
          <div className="search-bar-container">
            <Link className="component-search-bar" to="/sanlitun/projectClaim/search">
              <input className="input" placeholder="搜索项目" />
            </Link>
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


projectClaim.title = '项目认领';

projectClaim.propTypes = {
  requestClaimProjectList: PropTypes.func,
  claimList: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number,
      }),
    }),
  }),

};

export default connect(
  state => ({
    claimList: state.sanlitun.claimList,
  }),
  dispatch => bindActionCreators({ requestClaimProjectList },
    dispatch),
)(projectClaim);
