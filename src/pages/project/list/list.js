import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import './list.css';
import Link from '../../../components/link/link';
import Filter from '../../../components/filter/filter';
// import {
//   requestProjectDetail,
//   collectProject,
//   unCollectProject,
//   joinProject,
//   quitProject,
// } from './detail.store';

class ProjectListPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    // this.props.requestProjectDetail(this.projectId);
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  onFilterChange(selectedOption) {
    console.log(selectedOption);
  }

  render() {
    return (
      <div className="page-project-list">
        <div className="header">
          <div className="search-bar-container">
            <Link className="component-search-bar" to="">
              <input className="input" placeholder="搜索项目" />
            </Link>
          </div>
        </div>
        <div className="body">
          <div className="project-filter-container">
            <Filter onFilterChange={this.onFilterChange} />
          </div>
          <div className="project-list">
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
            <p>project-list</p>
          </div>
        </div>
      </div>
    );
  }
}

ProjectListPage.propTypes = {
};

ProjectListPage.title = '志愿项目';

export default connect(
  state => ({
    list: state.project.list,
    user: state.user,
  }),
  dispatch => bindActionCreators({

  }, dispatch),
)(ProjectListPage);
